import * as Joi from '@hapi/joi';

export const schema = {
  JWK_URL: Joi.string()
    .uri()
    .required(),
};
