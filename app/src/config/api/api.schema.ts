import * as Joi from "@hapi/joi";

export default {

  API_PREFIX: Joi.string().
    uri({ allowRelative: true, relativeOnly: true }).
    default(""),

  API_VERSION: Joi.number().integer().positive().required()
};
