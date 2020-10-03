import * as Joi from '@hapi/joi';

import { schema as app } from './app';
import { schema as security } from './security';
import { schema as io } from './io';

export const schema = Joi.object({ ...app, ...io, ...security });
