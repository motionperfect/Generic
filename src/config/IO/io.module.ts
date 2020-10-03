import { Module } from '@nestjs/common';

import { HttpConfigModule } from './http/http.module';

@Module({
  imports: [
    HttpConfigModule
  ]
})
export class IoConfigModule {}
