const sequelize = require("../../database/database.js");
const {DataTypes } = require("sequelize");

const questionSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
  },
};

const Question = sequelize.define("questions", questionSchema);

module.exports = Question;