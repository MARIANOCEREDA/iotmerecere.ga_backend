const {User,UserSchema}=require('./user.model');
const {Device,DeviceSchema}=require('./device.model');

function setUpModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Device.init(DeviceSchema,Device.config(sequelize));
}

module.exports = {setUpModels}
