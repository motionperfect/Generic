import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { ConfigModule } from '../../config/config.module';
import { JwkModule } from '../jwk/jwk.module';

import { JwtStrategy } from './strategy';
import { HttpExceptionFilter } from './filter';
import { JwtAuthGuard } from './guard';

const Guards = [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
];

const Filters = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
];

@Module({
  imports: [PassportModule, JwtModule.register({}), ConfigModule, JwkModule],
  providers: [JwtStrategy, ...Guards, ...Filters],
})
export class AppModule {}
