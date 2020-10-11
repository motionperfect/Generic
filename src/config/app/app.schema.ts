import Joi from 'joi';

export const schema = {
  APP_PORT: Joi.number()
    .integer()
    .min(80)
    .max(65535)
    .default(3000),

  NODE_ENV: Joi.string()
    .valid(...['development', 'production'])
    .default('development')
};
