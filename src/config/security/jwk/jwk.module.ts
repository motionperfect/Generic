import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { JwkConfigService } from './index';

const Services = [JwkConfigService];

@Module({
  imports: [NestConfigModule],
  providers: [...Services],
  exports: [...Services],
})
export class JwkConfigModule {}
