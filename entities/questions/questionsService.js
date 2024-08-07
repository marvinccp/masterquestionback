const { models } = require("../../database/database");
console.log(models);
const boom = require("@hapi/boom");

class QuestionService {
  constructor() {
    // this.questions = [
    //   {
    //     id: "1",
    //     category: "Easy",
    //     question: "¿Cuanto es 2 + 4?",
    //     options: [
    //       { op: 1, answerText: 8, isCorrect: false },
    //       { op: 2, answerText: 4, isCorrect: false },
    //       { op: 3, answerText: 6, isCorrect: true },
    //     ],
    //   },
    //   {
    //     id: "2",
    //     category: "Easy",
    //     question: "¿Cuanto es 10 - 9?",
    //     options: [
    //       { op: 1, answerText: 0, isCorrect: false },
    //       { op: 2, answerText: 234, isCorrect: false },
    //       { op: 3, answerText: 1, isCorrect: true },
    //     ],
    //   },
    //   {
    //     id: "3",
    //     category: "Easy",
    //     question: "¿Cuanto es x + x?",
    //     options: [
    //       { op: 1, answerText: 0, isCorrect: false },
    //       { op: 2, answerText: "2x", isCorrect: true },
    //       { op: 3, answerText: 1, isCorrect: false },
    //     ],
    //   },
    //   {
    //     id: "4",
    //     category: "Medium",
    //     question: "¿Cuanto es 8 - 8?",
    //     options: [
    //       { op: 1, answerText: 0, isCorrect: true },
    //       { op: 2, answerText: 4, isCorrect: false },
    //       { op: 3, answerText: 50, isCorrect: false },
    //     ],
    //   },
    //   {
    //     id: "5",
    //     category: "Medium",
    //     question: "¿Cuanto es 1 + 1?",
    //     options: [
    //       { op: 1, answerText: 300, isCorrect: false },
    //       { op: 2, answerText: 2, isCorrect: true },
    //       { op: 3, answerText: 800, isCorrect: false },
    //     ],
    //   },
    //   {
    //     id: "6",
    //     category: "Hard",
    //     question: "¿Cuanto mide el rio nilo?",
    //     options: [
    //       { op: 1, answerText: "6650 Km", isCorrect: true },
    //       { op: 2, answerText: "879 Km", isCorrect: false },
    //       { op: 3, answerText: " Km", isCorrect: false },
    //     ],
    //   },
    //   {
    //     id: "7",
    //     category: "Hard",
    //     question: "¿Cuando nació Jesus?",
    //     options: [
    //       { op: 1, answerText: " 25 Diciembre", isCorrect: false },
    //       { op: 2, answerText: "No se sabe", isCorrect: true },
    //       { op: 3, answerText: " 25 Septiembre", isCorrect: false },
    //     ],
    //   },
    // ];
  }

  find = async () => {
    const questions = await models.questions.findAll();
    return questions;
  };

  findOne = async (id) => {
    const question = await models.questions.findByPk(id);
     if (!question) {
      return  boom.notFound(`The question with id ${id} not found`);
     }
    return question;
  };

  create = async (question) => {
    const newQuestion = await models.questions.create(question);
    return newQuestion;
  };

  update = async (id, changes) => {
    // const index = this.questions.findIndex((question) => question.id === id);
    // const questionUpdate = this.questions[index];
    // this.questions[index]  = { ...questionUpdate, ...changes };
    // return this.questions[index];
    const question = await models.questions.findByPk(id);
    if (!question) {
       boom.notFound(`The question with id ${id} not found`);
    }
    const questionUpdate = await question.update(changes);
    
    return questionUpdate;
  };

  delete = async (id) => {
    
    // const index = this.questions.findIndex((question) => question.id === id);
    const question = await models.questions.findByPk(id);
    // this.questions.splice(index, 1);
    if(!question){
      throw new Error(`The question with id ${id} not found`);
    }
    await question.destroy();
    return { message: ` The question with id ${id} has deleted` };
  };
}
module.exports = QuestionService;
