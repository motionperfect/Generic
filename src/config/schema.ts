import * as Joi from '@hapi/joi';

import { schema as app } from './app';
import { schema as http } from './http';
import { schema as jwt } from './jwt';
import { schema as jwk } from './jwk';

export const schema = Joi.object({ ...app, ...jwt, ...http, ...jwk });
