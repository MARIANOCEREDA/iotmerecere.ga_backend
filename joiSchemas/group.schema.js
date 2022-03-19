/**
 *@description validation Schema to create a group
 *@require joi - lib to apply validation schemas
 */

const Joi = require("joi");

const name = Joi.string().max(255);
const description = Joi.string().max(1000);

const deviceSchema = Joi.object({
  name:name.required(),
  description:description,
});

module.exports = {groupSchema};
