"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.sequelize.query(`
    UPDATE players
    SET score = 0
    WHERE score IS NULL;
  `);

    await queryInterface.changeColumn("players", "score", {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('players', 'score', {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    });
  },
};
