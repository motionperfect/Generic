import { HttpCacheAdapter } from './adapter';
import { AxiosResponse } from 'axios';

export const createHttpCache = (maxAge: number) =>
  new HttpCacheAdapter<AxiosResponse>(maxAge);

export { HttpService } from '@nestjs/common';
