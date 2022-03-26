/**
 *@description validation Schema to create a group
 *@require joi - lib to apply validation schemas
 */

const Joi = require("joi");

const username = Joi.string();
const password = Joi.string();
const connect = Joi.boolean();

const mqttConnectSchema = Joi.object({
  username:username.required(),
  password:password.required(),
  connect:connect.required()
});

module.exports = {mqttConnectSchema};
