import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppConfigModule } from './app/app.module';
import { JwtConfigModule } from './jwt/jwt.module';

import { schema as configSchema } from './schema';
import { HttpConfigModule } from './http/http.module';
import { JwkConfigModule } from './jwk/jwk.module';

const Modules = [
  AppConfigModule,
  JwtConfigModule,
  HttpConfigModule,
  JwkConfigModule,
];

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: configSchema,
      expandVariables: true,
    }),
    ...Modules,
  ],
  exports: [...Modules],
})
export class ConfigModule {}
