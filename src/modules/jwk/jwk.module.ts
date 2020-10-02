import { Module } from '@nestjs/common';

import { HttpConfigModule } from '../../config/http/http.module';
import { JwkConfigModule } from '../../config/jwk/jwk.module';

import { JwkService } from '.';

const Services = [JwkService];

@Module({
  imports: [HttpConfigModule, JwkConfigModule],
  providers: [...Services],
  exports: [...Services],
})
export class JwkModule {}
