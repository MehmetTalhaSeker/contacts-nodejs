const Joi = require("joi");

const createValidation = Joi.object({
  full_name: Joi.string().required().min(3),
  phone_number: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

const updateValidation = Joi.object({
  full_name: Joi.string().min(3),
  phone_number: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

module.exports = {
  createValidation,
  updateValidation,
};
