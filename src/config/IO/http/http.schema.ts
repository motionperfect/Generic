import * as Joi from 'joi';

export const schema = {
  HTTP_TIMEOUT: Joi.number()
    .integer()
    .min(1)
    .default(5),
};
