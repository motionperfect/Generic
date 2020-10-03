import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtConfigService } from '../../../config/security/jwt';

import { InvalidTokenException } from '../exception';
import { JwkService } from '../../jwk';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwkService: JwkService,
    jwtConfigService: JwtConfigService,
    jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['ES256', 'ES384', 'ES512'],
      issuer: jwtConfigService.issuer,
      audience: jwtConfigService.audience,
      secretOrKeyProvider: (_, rawJwtToken, done) => {
        const token = jwtService.decode(rawJwtToken, { complete: true });

        if (token && typeof token === 'object') {
          return this.jwkService
            .getKeyById(token.header.kid)
            .then(key => done(null, key))
            .catch(err => done(err, false));
        }
        throw new InvalidTokenException();
      },
    });
  }

  validate = async (payload: any) => ({ userId: payload.sub });
}
