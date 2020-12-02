const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(6).max(1024).required().label("Password"),
  });

  return schema.validate(data, { abortEarly: false });
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(data, { abortEarly: false });
};

const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().allow(null, "").min(6).max(1024).label("Password"),
    phone: Joi.string()
      .allow(null, "")
      .min(10)
      .max(30)
      .pattern(/^[0-9]+$/)
      .label("Phone Number"),
    bio: Joi.string().allow(null, "").max(1024).label("Bio"),
  });

  return schema.validate(data, { abortEarly: false });
};

const parseError = (error) => {
  return error.reduce((obj, { message, path }) => {
    return Object.assign(obj, { [path[0]]: message });
  }, {});
};

module.exports = {
  registerValidation,
  loginValidation,
  updateValidation,
  parseError,
};
