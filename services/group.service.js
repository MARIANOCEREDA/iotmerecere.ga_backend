const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class GroupService{
  async create(group){
    const newGroup = await models.Group.create(group);
    return newGroup;
  }

  async findAll(){
    const allGroups = await models.Group.findAll({
      include:['user']
    });
    if(!allGroups){
      throw boom.notFound("No devices were found");
    };
    allGroups.forEach((element,item, i) => {
      delete element.user.dataValues.password;
    });
    return allGroups;
  }

  async findOne(id){
    const group = await models.Group.findByPk(id,{
      include:'user'
    });
    delete group.user.dataValues.password;
    return group
  }

}

module.exports = { GroupService }
