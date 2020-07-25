import * as Joi from "@hapi/joi";

import AppSchema from "./app/app.schema";
import JWTSchema from "./jwt/jwt.schema";
import ApiSchema from "./api/api.schema";

export default Joi.object({
  ...AppSchema,
  ...JWTSchema,
  ...ApiSchema
});
