const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(4).lowercase().required(),
  password: Joi.string().min(3).required(),
});

module.exports = {
  userSchema,
};
