import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppConfigModule } from './app/app.module';
import { SecurityConfigModule } from './security/security.module';
import { IoConfigModule } from './IO/io.module';

import { schema as configSchema } from './schema';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: configSchema,
      expandVariables: true,
    }),
    AppConfigModule,
    SecurityConfigModule,
    IoConfigModule,
  ],
})
export class ConfigModule {}
