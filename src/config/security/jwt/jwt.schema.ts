import * as Joi from '@hapi/joi';

export const schema = {
  TOKEN_AUDIENCE: Joi.string()
    .uri()
    .required(),

  TOKEN_ISSUER: Joi.string()
    .uri()
    .required(),
};
