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
const router = express.Router();

const service = new DeviceService();

router.post('/create',
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
async(req,res,next)=>{
  try{
    const devices = await service.findAll();
    res.json(devices);
  }catch(error){
    next(error);
  }
});

module.exports = router;
