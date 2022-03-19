const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class GroupService{
  async create(group){
    const newGroup = await models.Group.create(group);
    return newGroup;
  }
}

module.exports = { GroupService }
