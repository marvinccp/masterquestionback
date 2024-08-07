const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(2).max(50);
const lastName = Joi.string().min(2).max(50);
const nickName = Joi.string().min(2).max(12);
const email = Joi.string();
const password = Joi.string().min(8);
const role = Joi.string().min(2).max(12);

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  nickName: nickName.required(),
  password: password.required(),
  role: role.required()
});
const updateUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  nickName: nickName.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

module.exports = {
  getUserSchema,
  updateUserSchema,
  createUserSchema,
  loginUserSchema,
};
