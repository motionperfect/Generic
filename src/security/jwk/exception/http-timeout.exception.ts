import { UnauthorizedException } from '@nestjs/common';

export class HttpTimeoutException extends UnauthorizedException {
  private static selectMessage(error: any): string {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return 'JWK server isn\'t available right now.';
    }
    return 'Unable to request the JWK server.';
  }

  constructor(err: object) {
    super({
      message: HttpTimeoutException.selectMessage(err),
    });
  }
}
