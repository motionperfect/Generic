import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenException extends UnauthorizedException {
  constructor(message = 'Missing or invalid bearer token.') {
    super(message);
  }
}
