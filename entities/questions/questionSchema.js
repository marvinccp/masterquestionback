const Joi = require("joi");

const id = Joi.number().integer();
const category = Joi.string().min(3).max(50);
const question = Joi.string();
const options = Joi.array();

const getQuestionSchema = Joi.object({
  id: id.required(),
});

const createQuestionSchema = Joi.object({
  category: category.required(),
  question: question.required(),
  options: options.required(),
});
const updateQuestionSchema = Joi.object({
  category: category,
  question: question,
  options: options,
});

module.exports = {
  getQuestionSchema,
  createQuestionSchema,
  updateQuestionSchema,
};
