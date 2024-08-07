const sequelize = require("../../database/database.js");
const { DataTypes } = require("sequelize");

const userSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nickName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "user",
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

const User = sequelize.define("users", userSchema);

module.exports = User;
