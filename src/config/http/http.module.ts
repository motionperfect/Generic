import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { HttpConfigService } from '.';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [NestConfigModule],
      useClass: HttpConfigService,
    }),
  ],
  exports: [HttpModule],
})
export class HttpConfigModule {}
