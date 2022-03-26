/**
 * @description - Set of CRUD queries for the signup route.
 * @exports object router - routing app.
 * @requires express
 * @requires signupSchema - Joi object containing the schema
 * @requires DeviceService - Object containing methods to interact with services and orm.
 * @instance service
 */

const express = require("express");
const { MqttService } = require("../services/mqtt.service");
const { mqttConnectSchema } = require('../joiSchemas/mqttConnect.schema');
const router = express.Router();

const service = new MqttService();

router.post('/connect',
validatorHandler(mqttConnectSchema,'body'),
async (req,res,next)=>{
  try{
    const body = req.body
    const mqttClient = await service.connect(body);
    res.json({"Client connected":mqttClient});
  }catch(error){
    next(error);
  }
});

module.exports = router;
