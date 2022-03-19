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
const router = express.Router();

const service = new GroupService();

router.post('/create',
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

module.exports = router;
