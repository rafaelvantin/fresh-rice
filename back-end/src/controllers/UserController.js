const router = require("express").Router();
const User = require("../models/usuario.js");

router.post('/', async (request, response)=> {
  const {name, email, password} = request.body;
  try{
      const user = await User.create({ name, email, password});
      return response.status(201).json(user)
  }catch(erro){
      return response.status(400).send({error: 'Error creating new user', msg: erro});
  }
});

module.exports = router;