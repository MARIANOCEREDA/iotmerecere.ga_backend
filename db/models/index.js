const {User,UserSchema}=require('./user.model');
const {Device,DeviceSchema}=require('./device.model');
const {Group,GroupSchema}=require('./group.model');
const {DeviceGroup,DeviceGroupSchema}=require('./device_group.model');

function setUpModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Device.init(DeviceSchema,Device.config(sequelize));
  Group.init(GroupSchema,Group.config(sequelize));
  DeviceGroup.init(DeviceGroupSchema,config(sequelize));


  User.associate(sequelize.models);
  Device.associate(sequelize.models);
  Group.associate(sequelize.models)
  DeviceGroup.associate(sequelize.models);
}

module.exports = {setUpModels}
