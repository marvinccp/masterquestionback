const Joi = require("joi");
const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;


const id = Joi.string().pattern(uuidRegex)
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
