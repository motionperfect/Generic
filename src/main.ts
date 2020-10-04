import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { AppConfigService } from './config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get(AppConfigService);

  await app.listen(appConfigService.port);
}

bootstrap();
