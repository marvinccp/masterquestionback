const Joi = require("joi");
const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;


const id = Joi.string().pattern(uuidRegex)
const nickName = Joi.string().min(2).max(12);
const email = Joi.string();
const password = Joi.string().min(8);
const role = Joi.string().min(2).max(12);

const getPlayerSchema = Joi.object({
  id: id.required(),
});

const createPlayerSchema = Joi.object({
  email: email.required(),
  nickName: nickName.required(),
  password: password.required(),
  role: role.required()
});
const updatePlayerSchema = Joi.object({
  nickName: nickName.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const loginPlayerSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

module.exports = {
  getPlayerSchema,
  updatePlayerSchema,
  createPlayerSchema,
  loginPlayerSchema,
};
