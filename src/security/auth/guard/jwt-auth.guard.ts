import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
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
