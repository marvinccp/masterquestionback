const express = require("express");
const router = express.Router();
const QuestionService = require("./questionsService");
const service = new QuestionService();
const validate = require("../../middlewares/validate");
const { 
  getQuestionSchema, 
  createQuestionSchema, 
  updateQuestionSchema} = require("./questionSchema");

router.get("/", 
async (req, res, next) => {
  try {
    const questions = await service.find();
    res.json(questions);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", 
validate(getQuestionSchema,'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await service.findOne(id);
    res.json(question);
  } catch (error) {
    next(error)
  }
});

router.post("/", 
validate(createQuestionSchema,'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const newQuestion = await service.create(body);
    res.json(newQuestion);
  } catch (error) {
    next(error)
  }
});

router.patch("/:id", 
validate(getQuestionSchema,'params'),
validate(updateQuestionSchema, 'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const updatedQuestion = await service.update(id, body);
    res.json(updatedQuestion);
  } catch (error) {
    next(error)
  }
});

router.delete("/:id", 
validate(getQuestionSchema,'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await service.delete(id);
    res.json({ info: "deleted", deletedQuestion });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
