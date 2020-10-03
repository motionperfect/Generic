import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtConfigModule } from '../../config/security/jwt/jwt.module';
import { JwkModule } from '../jwk/jwk.module';

import { JwtStrategy } from './strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    JwtConfigModule,
    JwkModule
  ],
  providers: [JwtStrategy]
})
export class AuthModule {}
