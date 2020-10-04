import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import { AppModule } from './app/app.module';

import { AppConfigService } from './config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get(AppConfigService);

  /**
   * This will cause class-validator to use the nestJS module resolution,
   * the fallback option is to spare our self from importing all the
   * class-validator modules to nestJS
   */
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
    }),
  );

  await app.listen(appConfigService.port);
}

bootstrap();
