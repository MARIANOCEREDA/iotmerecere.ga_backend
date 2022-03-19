'use strict';

const { DEVICE_TABLE,DeviceSchema } = require('../models/device.model');
const {DataTypes} = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(DEVICE_TABLE,'userId',{
      field:'userId',
      allowNull:false,
      type:DataTypes.INTEGER,
      unique:false
    });
  },

  async down (queryInterface, Sequelize) {

  }
};
