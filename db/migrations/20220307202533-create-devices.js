'use strict';

const { DeviceSchema,DEVICE_TABLE,Device } = require('../models/device.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable(DEVICE_TABLE,DeviceSchema);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable(DEVICE_TABLE);
  }
};
