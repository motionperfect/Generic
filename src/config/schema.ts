import * as Joi from '@hapi/joi';

import AppSchema from './app/app.schema';
import JWTSchema from './jwt/jwt.schema';

export default Joi.object({
  ...AppSchema,
  ...JWTSchema,
});
