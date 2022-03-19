'use strict';

const {DEVICE_TABLE,DeviceSchema}=require('../models/device.model');

module.exports = {
  async (queryInterface, Sequelize) {
    await queryInterface.changeColumn(DEVICE_TABLE,'userId',{
      field:'userId',
      allowNull:false,
      type:DataTypes.INTEGER,
      unique:true,
    });
  },

  async down (queryInterface, Sequelize) {
    //await queryInterface.dropColumn();
  }
};
