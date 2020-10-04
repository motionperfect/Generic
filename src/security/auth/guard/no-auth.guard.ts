import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class NoAuthGuard implements CanActivate {

  canActivate(/* context: ExecutionContext */): boolean {
    return true;
  }
}
