import * as Joi from 'joi';

export const schema = {
  JWK_URL: Joi.string()
    .uri()
    .required(),
};
