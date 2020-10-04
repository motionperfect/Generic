import {
  CanActivate, ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { NO_AUTH_PROPERTY } from '../decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor (private readonly reflector: Reflector) {
    super();
  }

  canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const noAuth = this.reflector.get<boolean>(
      NO_AUTH_PROPERTY,
      context.getHandler()
    );

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
