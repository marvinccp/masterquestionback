const sequelize = require("../database/database");
require("../entities/questions/questionModel");
require("../entities/user/userModel");

const connect = async () => {
  try {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connect }