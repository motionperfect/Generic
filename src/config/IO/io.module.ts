import { Module } from '@nestjs/common';

import { HttpConfigModule } from './http/http.module';
import { DatabaseConfigModule } from './database/database.module';

@Module({
  imports: [
    HttpConfigModule,
    DatabaseConfigModule
  ]
})
export class IoConfigModule {}
