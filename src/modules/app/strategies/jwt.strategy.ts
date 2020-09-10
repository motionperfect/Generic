import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JWTConfigService } from '../../../config/jwt/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtConfigService: JWTConfigService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['ES256', 'ES384', 'ES512'],
      secretOrKeyProvider: (_, rawJwtToken, done) => {
        const token = this.jwtService.decode(rawJwtToken, { complete: true });
        const invalidTokenException = new Error('Invalid JWT format');

        if (token && typeof token === 'object') {
          return this.jwtConfigService
            .getKeyById(token.header.kid)
            .then(key => done(null, key))
            .catch(err => done(err));
        }
        return done(invalidTokenException);
      },
    });
  }

  validate = async (payload: any) => ({ userId: payload.sub });
}
