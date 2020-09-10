import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppConfigModule } from './app/app.module';
import { JWTConfigModule } from './jwt/jwt.module';

import schema from './schema';

const Modules = [AppConfigModule, JWTConfigModule];

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: schema,
    }),
    ...Modules,
  ],
  exports: Modules,
})
export class ConfigModule {}
