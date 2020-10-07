import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE, Reflector } from '@nestjs/core';

import { ConfigModule } from '../config/config.module';
import { AppConfigModule } from '../config/app/app.module';
import { AuthModule } from '../security/auth/auth.module';
import { RouterModule } from '../router/router.module';
import { IoModule } from '../IO/io.module';

import { HttpExceptionFilter } from './filter';
import { JwtAuthGuard, NoAuthGuard } from '../security/auth/guard';
import { AppConfigService, ENV } from '../config/app';

@Module({
  imports: [
    ConfigModule,
    AppConfigModule,
    AuthModule,
    RouterModule,
    IoModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (
        appConfigService: AppConfigService,
        reflector: Reflector
      ) => {
        return appConfigService.env === ENV.PRODUCTION
          ? new JwtAuthGuard(reflector)
          : new NoAuthGuard();
      },
      inject: [AppConfigService, Reflector]
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
        whitelist: true
      })
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule {}

