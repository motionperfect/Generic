import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";

import { ConfigModule } from "../../config/config.module";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";

import { JwtStrategy } from "./strategies";
import { JwtAuthGuard } from "./guards";

const Services = [
  AppService
];

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.register({})
  ],
  controllers: [
    AppController
  ],
  providers: [
    ...Services,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
