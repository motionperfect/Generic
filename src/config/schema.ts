import * as Joi from 'joi';

import { schema as app } from './app';
import { schema as security } from './security';
import { schema as io } from './IO';

export const schema = Joi.object({ ...app, ...io, ...security });
