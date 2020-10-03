import { Module } from '@nestjs/common';

import { JwtConfigModule } from './jwt/jwt.module';
import { JwkConfigModule } from './jwk/jwk.module';

@Module({
  imports: [
    JwtConfigModule,
    JwkConfigModule
  ]
})
export class SecurityConfigModule {}
