const Joi = require("joi");
const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;


const id = Joi.string().pattern(uuidRegex)
const nickname = Joi.string().min(2).max(12);
const email = Joi.string();
const password = Joi.string().min(6);
const role = Joi.string().min(2).max(12);

const getPlayerSchema = Joi.object({
  id: id.required(),
});

const createPlayerSchema = Joi.object({
  email: email.required(),
  nickName: nickname.required(),
  password: password.required(),
  role: role.required()
});
const updatePlayerSchema = Joi.object({
  nickName: nickname.required(),
  email: email.required(),
  password: password.required(),
  role: role
});

const loginPlayerSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

module.exports = {
  getPlayerSchema,
  updatePlayerSchema,
  createPlayerSchema,
  loginPlayerSchema,
};
