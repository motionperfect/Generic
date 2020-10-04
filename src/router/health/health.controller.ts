import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { HealthService } from '.';

import { NoAuth } from '../../security/auth/decorator';

@NoAuth()
@Controller('/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/ping')
  @HttpCode(HttpStatus.OK)
  ping() {
    return this.healthService.ping();
  }
}
