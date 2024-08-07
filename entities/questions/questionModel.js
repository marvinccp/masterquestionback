const sequelize = require("../../database/database.js");
const {DataTypes } = require("sequelize");

const questionSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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