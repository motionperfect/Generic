import * as Joi from "@hapi/joi";

export default {

  TOKEN_AUDIENCE: Joi.string().uri().required(),

  TOKEN_ISSUER: Joi.string().uri().required(),

  JWK_URL: Joi.string().uri().required()
};
