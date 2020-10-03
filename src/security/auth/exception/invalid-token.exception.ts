import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenException extends UnauthorizedException {
  constructor(message = 'Invalid bearer token.') {
    super(message);
  }
}
