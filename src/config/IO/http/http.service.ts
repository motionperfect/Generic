import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cacheAdapterEnhancer } from 'axios-extensions';
import axios from 'axios';
import moment from 'moment';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor (private readonly configService: ConfigService) {}

  createHttpOptions (): HttpModuleOptions {
    return {
      timeout: moment.duration(
        this.configService.get<number>('HTTP_TIMEOUT'),
        'seconds',
      ).asMilliseconds(),
      adapter: cacheAdapterEnhancer(
        axios.defaults.adapter,
        {
          enabledByDefault: false,
        }),
    };
  }
}
