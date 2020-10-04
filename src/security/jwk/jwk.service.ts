import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JWK } from 'node-jose';

import { HttpService, createHttpCache } from '../../IO/http';
import { JwkConfigService } from '../../config/security/jwk';

import { HttpTimeoutException, PublicKeyNotFoundException } from './exception';

@Injectable()
export class JwkService implements OnModuleInit {
  private readonly logger = new Logger(JwkService.name);
  private readonly inMemoryCache = createHttpCache(15);
  private keyStore = null;

  constructor(
    private readonly jwkConfigService: JwkConfigService,
    private readonly httpService: HttpService,
  ) {}

  public async getKeyById(keyId: string): Promise<string> {
    const keyStore = await this.downloadKeysFromNetwork();
    const publicKey = keyStore.get(keyId);

    if (!publicKey) {
      throw new PublicKeyNotFoundException();
    }
    return (await JWK.asKey(publicKey)).toPEM();
  }

  private async downloadKeysFromNetwork(): Promise<JWK.KeyStore> {
    try {
      const isFromCache = this.inMemoryCache.length > 0;
      const response = await this.httpService
        .get(this.jwkConfigService.url, {
          cache: this.inMemoryCache,
        })
        .toPromise();

      if (isFromCache === false) {
        this.keyStore = await JWK.asKeyStore(response.data);
        this.logger.log('Successfully updated keystore');
      }
      return this.keyStore;
    } catch (err) {
      throw new HttpTimeoutException(err);
    }
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.downloadKeysFromNetwork();
    } catch (err) {
      this.logger.error(err.message);
    }
  }
}
