const express = require("express");
const passport = require('passport');
const { validatorHandler } = require('../middlewares/validator.handler');
const { signinSchema } = require('../joiSchemas/signin.schema');

const router = express.Router();

router.post('/login',
  validatorHandler(signinSchema,'body'),
  passport.authenticate('local',{session:false}), //Si pasa la autenticacion, en el "request" encontraremos el uusario. Esto debido a que
  //con la funcion "done" de la local strategy, enviamos el usuario.
  async (req,res,next)=>{
    try{
      res.json(req.user);
    }catch(error){
      next(error);
    }
  }
);

module.exports = router;
