/**
 *@description validation Schema for signing in. So, there won't be missed data when the user fill the form.
 *@require joi - lib to apply validation schemas
 */

const Joi = require("joi");

const username = Joi.string().email();
const password = Joi.string();

const signinSchema = Joi.object({
    email:username.required(),
    password:password.required()
});

module.exports = {signinSchema}
