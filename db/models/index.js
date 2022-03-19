const {User,UserSchema}=require('./user.model');
const {Device,DeviceSchema}=require('./device.model');
const {Group,GroupSchema}=require('./group.model');

function setUpModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Device.init(DeviceSchema,Device.config(sequelize));
}

module.exports = {setUpModels}
