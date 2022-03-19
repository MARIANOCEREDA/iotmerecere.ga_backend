const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class DeviceService{
  async create(device){
    const newDevice = await models.Device.create(device);
    return newDevice;
  }
}

module.exports = { DeviceService }
