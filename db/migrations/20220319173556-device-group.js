'use strict';

const { DEVICE_GROUP_TABLE,DeviceGroupSchema}=require('../models/device_group.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(DEVICE_GROUP_TABLE,DeviceGroupSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(DEVICE_GROUP_TABLE);
  }
};
