import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { ConfigModule } from '../config/config.module';
import { AuthModule } from '../security/auth/auth.module';

import { HttpExceptionFilter } from './filter';
import { JwtAuthGuard } from '../security/auth/guard';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
