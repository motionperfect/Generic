import * as Joi from 'joi';

export const schema = {
  TOKEN_AUDIENCE: Joi.string()
    .uri()
    .required(),

  TOKEN_ISSUER: Joi.string()
    .uri()
    .required(),
};
