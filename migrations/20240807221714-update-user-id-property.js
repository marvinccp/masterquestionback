"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "id");

    await queryInterface.addColumn("users", "id", {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "id");
    await queryInterface.addColumn("users", "id", {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    });
  },
};
