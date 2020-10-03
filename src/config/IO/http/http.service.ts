import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cacheAdapterEnhancer } from 'axios-extensions';
import axios from 'axios';
import Duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';

dayjs.extend(Duration);

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: dayjs
        .duration({
          seconds: this.configService.get<number>('HTTP_TIMEOUT'),
        })
        .asMilliseconds(),
      adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
        enabledByDefault: false,
      }),
    };
  }
}
