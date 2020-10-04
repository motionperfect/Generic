import {
  ExecutionContext,
  HttpException,
  Injectable, Type,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { NO_AUTH_PROPERTY } from '../decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  constructor (private readonly reflector: Reflector) {
    super();
  }

  private isNoAuth (target: Type<any> | Function): boolean {
    return this.reflector.get<boolean>(
      NO_AUTH_PROPERTY,
      target
    );
  }

  canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    let noAuth: boolean = this.isNoAuth(context.getHandler());

    if (noAuth === undefined) {
      noAuth = this.isNoAuth(context.getClass());
    }
    return !noAuth ? super.canActivate(context) : true;
  }

  handleRequest (err, user, info /*, context */) {
    if (err) {
      throw err;
    } else if (!user) {
      if (info instanceof HttpException) {
        throw info;
      }
      throw new UnauthorizedException(info?.message);
    }
    return user;
  }
}
