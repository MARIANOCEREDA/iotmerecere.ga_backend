const express = require("express");
const { MqttService } = require("../services/mqtt.service");
const router = express.Router();

const service = new MqttService();

router.post('/',
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

module.exports = router;
