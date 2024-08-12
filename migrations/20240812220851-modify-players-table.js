"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Players", "score");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('players', 'score', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
