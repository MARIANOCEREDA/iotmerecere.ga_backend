/**
 * @description: Set of middlewares for error handling.
 * @requires ValidationError - it is thrown when the sequelize validation has failed
 */

const { ValidationError } = require('sequelize');

/**
 * @name logErrors
 * @description middleware for logging errors
 *
 * @param {Object} err
 * @param {object} req
 * @param {Object} res
 * @param {functio} next
 *
 * @exports
 *
 */
function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

/**
 * @name errorHandler
 * @description middleware for error Handling
 * @exports
 */

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

/**
 * @name boomErrorHandler
 * @description middleware for handling error of boom type
 * @exportts
 */

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

/**
 * @name ormErrorHandler
 * @description middleware for handling errors of the sequelize ORM
 * @exportts
 */

function ormErrorHandler(err,req,res,next){
  if (err instanceof ValidationError){
    res.status(409).json({
      statusCode:409,
      message:err.message,
      correct:"ORM error"
    })
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler,ormErrorHandler }
