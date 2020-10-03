import { Module } from '@nestjs/common';

import { HttpConfigModule } from '../../config/IO/http/http.module';
import { JwkConfigModule } from '../../config/security/jwk/jwk.module';

import { JwkService } from './index';

const Services = [JwkService];

@Module({
  imports: [HttpConfigModule, JwkConfigModule],
  providers: [...Services],
  exports: [...Services],
})
export class JwkModule {}
