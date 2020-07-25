import { NestFactory } from "@nestjs/core";

import { AppModule } from "./modules/app/app.module";

import { AppConfigService } from "./config/app/app.service";

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get(AppConfigService);

  app.setGlobalPrefix(appConfigService.globalPrefix);
  app.enableCors();

  await app.listen(appConfigService.port);
}

bootstrap();
