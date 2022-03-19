/**
 *@description validation Schema for signing up. So, there won't be missed data when the user fill a form
 *@require joi - lib to apply validation schemas
 */

const Joi = require("joi");

const username = Joi.string().max(50);
const firstName = Joi.string();
const lastName = Joi.string();
const email = Joi.string().email();
const password = Joi.string();
const age = Joi.number().integer();
const country = Joi.string();
const phoneNumber = Joi.number().integer();
const salt = Joi.string().max(40);

const signupSchema = Joi.object({
    username:username.required(),
    firstName: firstName.required(),
    lastName:lastName.required(),
    email:email.required(),
    password:password.required(),
    repeatedPassword:password.required(),
    age:age.required(),
    salt:salt.required(),
    country:country.required(),
    phoneNumber:phoneNumber.required()
});

module.exports = {signupSchema}
