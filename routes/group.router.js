/**
 * @description - Set of CRUD queries for the group route.
 * @exports object router - routing app.
 * @requires express
 * @requires groupSchema - Joi object containing the schema
 * @requires GroupService - Object containing methods to interact with services and orm.
 * @instance service
 */

const express = require("express");
const { groupSchema } = require("../joiSchemas/group.schema");
const { validatorHandler } = require("../middlewares/validator.handler");
const { GroupService } = require("../services/group.service");
const passport = require('passport');
const router = express.Router();

const service = new GroupService();

router.post('/create',
passport.authenticate('jwt',{session:false}), //Al igual que con local, esta estrategia deja al "user" en el req.user
validatorHandler(groupSchema,'body'),
async (req,res,next)=>{
  try{
    const body = req.body
    const newGroup = await service.create(body);
    res.json(newGroup);
  }catch(error){
    next(error);
  }
});

router.get('/',
passport.authenticate('jwt',{session:false}),
async(req,res,next)=>{
  try{
    const groups = await service.findAll();
    res.json(groups);
  }catch(error){
    next(error);
  }
});

router.get('/:id',
passport.authenticate('jwt',{session:false}),
async (req,res,next)=>{
  try{
    const { id } = req.params;
    const group = await service.findOne(id);
    res.json(group);
  }catch(error){
    next(error);
  }
});

module.exports = router;
