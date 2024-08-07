const express = require("express");


const routerApi = (app) => {

  const router = express.Router();
  app.use("/game/", router);
  router.use("/Questions/", require("../entities/questions/questionsRouter"))
  router.use("/users/", require('../entities/user/userRouter'))
  
};


module.exports = routerApi;
