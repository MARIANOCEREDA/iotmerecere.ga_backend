'use strict';

const { GroupSchema,GROUP_TABLE }=require('../models/group.model.js');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(GROUP_TABLE,GroupSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(GROUP_TABLE);
  }
};
