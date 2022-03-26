const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class DeviceService{
  async create(device){
    const newDevice = await models.Device.create(device);
    return newDevice;
  }

  async findAll(){
    const allDevices = await models.Device.findAll({
      include:['user']
    });
    if(!allDevices){
      throw boom.notFound("No devices were found");
    };
    allDevices.forEach((element,item, i) => {
      delete element.user.dataValues.password;
    });
    return allDevices;
  }

  async findOne(id){
    const device = await models.Device.findByPk(id,{
      include:[
        'user',
        'group'
      ]
    })
    return device
  }
}

module.exports = { DeviceService }
