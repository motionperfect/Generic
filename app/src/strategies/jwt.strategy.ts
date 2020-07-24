import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWK } from "node-jose";
import got from "got";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  private readonly inMemoryCache: Map<any, any> = new Map();

  private keyStore: JWK.KeyStore = JWK.createKeyStore();

  constructor (
    private readonly jwtService: JwtService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: "https://accounts.motionperfect.eu",
      audience: "https://api.motionperfect.eu",
      secretOrKeyProvider: async (request, rawJwtToken, done) => {
        const token = this.jwtService.decode(rawJwtToken, { complete: true });
        let error, key = null;

        await this.retrievePublicKeys();
        if (token && typeof token === "object") {
          const verifyingKey = this.keyStore.get(token.header.kid);

          if (verifyingKey) {
            key = (await JWK.asKey(verifyingKey)).toPEM();
          } else {
            error = new Error("Specified public key not found");
          }
        } else {
          error = new Error("Invalid JWT");
        }

        return done(error, key);
      }
    });
  }

  validate = async (payload: any) => ({ userId: payload.sub });

  private retrievePublicKeys = async (): Promise<void> => {
    const response = await got.get(
      "http://127.0.0.1:3000/accounts/v1/certs",
      { cache: this.inMemoryCache }
    );

    if (response.isFromCache === false) {
      this.keyStore = await JWK.asKeyStore(response.body);
    }
  };
}
