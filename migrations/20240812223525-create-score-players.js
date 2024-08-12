'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Players', 'score',{
      type:DataTypes.INTEGER,
      allowNull:true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Players', 'score')
  }
};
