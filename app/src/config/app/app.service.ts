import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import * as path from "path";

import { APIConfigService } from "../api/api.service";

@Injectable()
export class AppConfigService {
  constructor (
    private readonly configService: ConfigService,
    private readonly apiConfigService: APIConfigService
  ) {}

  get port (): number {
    return this.configService.get<number>("APP_PORT");
  }

  get globalPrefix (): string {
    const { prefix, version } = this.apiConfigService;

    return path.join(prefix, `v${version}`).replace("\\", "/");
  }
}
