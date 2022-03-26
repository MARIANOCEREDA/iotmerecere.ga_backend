const express = require("express");
const passport = require('passport');
const { validatorHandler } = require('../middlewares/validator.handler');
const { signinSchema } = require('../joiSchemas/signin.schema');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const router = express.Router();

router.post('/login',
  validatorHandler(signinSchema,'body'),
  passport.authenticate('local',{session:false}), //Si pasa la autenticacion, en el "request" encontraremos el uusario. Esto debido a que
  //con la funcion "done" de la local strategy, enviamos el usuario.
  async (req,res,next)=>{
    try{
      const user = req.user;
      const payload = {
        sub:user.id,
        name:user.firstName
      }
      console.log(config.jwtSecret);
      const token = jwt.sign(payload,config.jwtSecret);
      res.json({
        user,
        token //Ahora con este token el usuario maneja sus sesiones
      });
    }catch(error){
      next(error);
    }
  }
);

module.exports = router;
