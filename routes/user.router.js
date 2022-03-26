/**
 * @description - Set of CRUD queries for the signup route.
 * @exports object router - routing app.
 * @requires express
 * @requires signupSchema - Joi object containing the schema
 * @requires SignupService - Object containing methods to interact with services and orm.
 * @instance service
 */

const express = require("express");
const { signupSchema } = require("../joiSchemas/signup.schema");
const { validatorHandler,validatePassword } = require("../middlewares/validator.handler");
const { UserService } = require("../services/user.service");
const router = express.Router();

const service = new UserService();


router.get('/all',
async (req,res,next)=>{
  try{
    const users = await service.findAll();
    res.json(users);
  }catch(error){
    next(error);
  }
});

router.get('/:id',
async (req,res,next)=>{
  try{
    const {id} = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch(error){
    next(error);
  }
});

router.post('/signup',
    validatorHandler(signupSchema,'body'),
    validatePassword('body'),
    async (req,res,next)=>{
        try {
            const body = req.body
            const user = await service.createUser(body);
            res.json({"User created":user});
        } catch (error) {
            next(error);
        }
});

router.delete('/:id',
async (req,res,next)=>{
  try{
    const {id} = req.params;
    const username = await service.deleteOne(id);
    res.json(username);
  }catch(error){
    next(error);
  }
});

module.exports = router;
