import { SetMetadata } from '@nestjs/common'

export const NO_AUTH_PROPERTY = 'no-auth';

export const NoAuth = () => SetMetadata(NO_AUTH_PROPERTY, true);
