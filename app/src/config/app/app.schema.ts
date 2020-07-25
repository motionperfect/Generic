import * as Joi from "@hapi/joi";

export default {

  APP_PORT: Joi.number().integer().min(80).max(65535).default(3000)
};
