'use strict';

const { GroupSchema,GROUP_TABLE} = require('../models/group.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable(GROUP_TABLE,GroupSchema);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable(GROUP_TABLE);
  }
};
