const {User,UserSchema}=require('./user.model');
const {Device,DeviceSchema}=require('./device.model');
const {Group,GroupSchema}=require('./group.model');

function setUpModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Device.init(DeviceSchema,Device.config(sequelize));
  Group.init(GroupSchema,Group.config(sequelize));

  User.associate(sequelize.models);
  Device.associate(sequelize.models);
  Group.associate(sequelize.models);
}

module.exports = {setUpModels}
