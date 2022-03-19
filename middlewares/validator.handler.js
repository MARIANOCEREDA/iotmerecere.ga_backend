const boom = require('@hapi/boom');
const sqlize = require('../libs/sequelize');

/**
 * @name validatorHandler
 * @type middleware
 * @description function to validate joi schemas
 * @param {Joi object} schema
 * @param {string} property
 * @exports
 */

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

/**
 * @name validatePassword
 * @type middleware
 * @description it verifies if both password and repeated password coincide
 * @param {string} params - it should be 'body'. Then , with body.password we can have access to passowrd.
 * @returns
 * @exports
 */

function validatePassword(params){
    return (req,res,next)=>{
        const body = req[params];
        let password = body.password;
        let repeatedPassword = body.repeatedPassword;
        if (!(password === repeatedPassword)){
            next(boom.badRequest('Passwords must coincide!'))
        }
        next();
    }
}


module.exports = { validatorHandler,validatePassword };
