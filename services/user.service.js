const {models} = require('../libs/sequelize');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

class UserService{
    async createUser(user){
      const existingUser = await models.User.findByPk(user.id);
      if(existingUser){
        throw boom.badRequest('There is another user with similar email');
      }
      const hashedPassword = await bcrypt.hash(user.password,10);
      const newUser = await models.User.create({
        ...user,
        password:hashedPassword
      });
      delete newUser.dataValues.password;
      return newUser;
    }

    async findOne(id){
      const user = await models.User.findByPk(id);
      if(!user){
        throw boom.badRequest('User not found');
      }
      delete user.dataValues.password;
      return user;
    }

    findByEmail(email){
      const user = await models.User.findOne({
        where:{email}
      });
      
      return user;
    }

    async findAll(){
      const users = await models.User.findAll();
      if(!users){
        throw boom.badRequest('Not users were found');
      }
      users.forEach((element,index,array) => {
        delete element.dataValues.password;
      });
      return users;
    }

    async deleteOne(id){
      const user = await this.findOne(id);
      await models.User.destroy({where:{
        id:id
      }});
      return {
        "Deleted user":{
          username:user.username,
          email:user.email
      }
    }
    }
}

module.exports = { UserService };
