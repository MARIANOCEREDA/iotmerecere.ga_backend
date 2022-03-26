/**
 * @description - Set of CRUD queries for the signup route.
 * @exports object router - routing app.
 * @requires express
 * @requires signupSchema - Joi object containing the schema
 * @requires DeviceService - Object containing methods to interact with services and orm.
 * @instance service
 */

const express = require("express");
const { deviceSchema } = require("../joiSchemas/device.schema");
const { validatorHandler } = require("../middlewares/validator.handler");
const { DeviceService } = require("../services/device.service");
const passport = require('passport');
const router = express.Router();

const service = new DeviceService();

router.post('/create',
passport.authenticate('jwt',{session:false}),
validatorHandler(deviceSchema,'body'),
async (req,res,next)=>{
  try{
    const body = req.body
    const newDevice = await service.create(body);
    res.json(newDevice);
  }catch(error){
    next(error);
  }
});

router.get('/',
passport.authenticate('jwt',{session:false}),
async(req,res,next)=>{
  try{
    const devices = await service.findAll();
    res.json(devices);
  }catch(error){
    next(error);
  }
});

router.get('/:id',
passport.authenticate('jwt',{session:false}),
async (req,res,next)=>{
  try{
    const { id } = req.params;
    const device = await service.findOne(id);
    res.json(device);
  }catch(error){
    next(error);
  }
});

module.exports = router;
