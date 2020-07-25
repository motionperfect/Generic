import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { JWK } from "node-jose";
import got from "got";

@Injectable()
export class JWTConfigService {

  private _keyStore: JWK.KeyStore;
  private readonly inMemoryCache: Map<any, any> = new Map();

  constructor (
    private readonly configService: ConfigService
  ) {}

  public getKeyById = async (id: string): Promise<string> => {
    const keyStore = await this.getKeysFromProvider();
    const key = keyStore.get(id);

    if (!key) {
      throw new Error("Specified public key not found");
    }
    return (await JWK.asKey(key)).toPEM();
  };

  private getKeysFromProvider = async (): Promise<JWK.KeyStore> => {
    const response = await got.get(
      this.configService.get<string>("JWK_URL"),
      { cache: this.inMemoryCache }
    );

    if (response.isFromCache === false) {
      this._keyStore = await JWK.asKeyStore(response.body);
    }
    return this._keyStore;
  };
}
