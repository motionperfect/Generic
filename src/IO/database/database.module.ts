import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { QueryExceptionFilter } from './filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryExceptionFilter,
    },
  ],
})
export class DatabaseModule {}
