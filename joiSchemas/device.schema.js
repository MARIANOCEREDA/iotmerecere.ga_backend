/**
 *@description validation Schema to create a device
 *@require joi - lib to apply validation schemas
 */

const Joi = require("joi");

const name = Joi.string().max(255);
const description = Joi.string().max(1000);
const mqttConected = Joi.bool();
const appConected = Joi.bool();
const userId = Joi.number().integer();
const groupId = Joi.number().integer();

const deviceSchema = Joi.object({
  name:name.required(),
  description:description,
  mqttConected:mqttConected,
  appConected:appConected,
  userId:userId.required(),
  groupId:groupId.required()
});

module.exports = {deviceSchema};
