import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import moment from 'moment';

import { AppConfigService, ENV } from '../../app';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService,
  ) {}

  createTypeOrmOptions(/* connectionName?: string */): TypeOrmModuleOptions {
    return {
      type: this.configService.get<any>('DB_PROVIDER'),
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_SCHEMA'),
      entities: ['dist/**/**.entity{.ts,.js}'],
      retryDelay: moment.duration(10, 'seconds').asMilliseconds(),
      synchronize: this.sync,
      logging:
        this.appConfigService.env === ENV.DEVELOPMENT
          ? ['query', 'error']
          : false,
      cache: {
        duration: moment.duration(15, 'minutes').asMilliseconds(),
      },
    };
  }

  get sync(): boolean {
    return this.configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true';
  }
}
