import { Module } from '@nestjs/common';

import { HttpConfigModule } from '../../config/IO/http/http.module';

import { HttpService } from './index';

@Module({
  imports: [HttpConfigModule],
  exports: [HttpService],
})
export class HttpModule {}
