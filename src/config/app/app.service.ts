import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  constructor (private readonly configService: ConfigService) {}

  public get port (): number {
    return this.configService.get<number>('APP_PORT');
  }

  public get env (): string {
    return this.configService.get<string>('NODE_ENV');
  }
}
