import { UnauthorizedException } from '@nestjs/common';

export class PublicKeyNotFoundException extends UnauthorizedException {
  constructor(message = 'Specified public key not found.') {
    super(message);
  }
}
