import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get audience(): string {
    return this.configService.get<string>('TOKEN_AUDIENCE');
  }

  public get issuer(): string {
    return this.configService.get<string>('TOKEN_ISSUER');
  }
}
