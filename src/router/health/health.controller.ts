import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { HealthService } from '.';

import { NoAuth } from '../../security/auth/decorator';

@Controller('/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @NoAuth()
  @Get('/ping')
  @HttpCode(HttpStatus.OK)
  ping() {
    return this.healthService.ping();
  }
}
