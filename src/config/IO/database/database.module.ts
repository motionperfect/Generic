import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppConfigModule } from '../../app/app.module';

import { DatabaseConfigService } from '.';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule, AppConfigModule],
      useClass: DatabaseConfigService,
    }),
  ],
})
export class DatabaseConfigModule {}
