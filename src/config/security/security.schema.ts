import { schema as jwk } from './jwk';
import { schema as jwt } from './jwt';

export const schema = { ...jwk, ...jwt };
