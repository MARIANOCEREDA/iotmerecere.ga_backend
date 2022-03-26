/**
*@description : Module that create the instance and logic from the auth strategy.
*@requires passport-local -> contiene el objeto para la estrategia de comprobacion
*@requires boom -> error HANDLER
*@requires UserService -> servicios de usurio.
*/
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const { UserService }  = require('../../../services/user.service');
const service = new UserService();

const LocalStrategy =  new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email,password,done)=>{
  try{
    const user = await service.findByEmail(email);
    if(!user){
      done(boom.unauthorized(),false);
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      done(boom.unauthorized(),false);
    }
    delete user.dataValues.password;
    done( null,user);//Si todo es autorizado, esta linea se ejecuta
  }catch(error){
    done(error,false);
  }
});

module.exports =  LocalStrategy;
