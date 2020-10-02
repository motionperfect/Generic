import { Module } from '@nestjs/common';

import { HttpConfigModule } from '../../config/http/http.module';

import { HttpService } from '.';

@Module({
  imports: [HttpConfigModule],
  exports: [HttpService],
})
export class HttpModule {}
