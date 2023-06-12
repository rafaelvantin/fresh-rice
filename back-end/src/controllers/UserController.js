const router = require("express").Router();
const User = require("../models/usuario.js");

router.get("/:id", async (req, res) => {
  try {
    //Check if ID is in the specified format
    if(req.params.id.length != 24) return res.status(400).send({ valid: false, error: "ID inválido!"});

    console.log(req.params.id)

    // const user = new User({name: "Renato"});
    // await user.save();
    
    const user = await User.find();

    // const user = await User.findOne({
    //   // _id: req.params.id,
    //   name: 'Rafael'
    // });

    if(user == null) return res.status(400).send({ valid: false,error: "Usuário não existe no banco de dados!"});

    res.send(user);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

// router.get("/zoo/:id", async (req, res) => {
//   try {

//     if(req.params.id.length != 24) return res.status(400).send({ valid: false, error: "ID inválido!"});

//     const zoo = await Zoo.findOne({
//       _id: req.params.id,
//     });

//     if(zoo == null) return res.status(400).send({ valid: false,error: "Zoo não existe no banco de dados!"});

//     res.send(zoo);
//   } catch (erro) {
//     console.log(erro);
//     return res.status(400).send(erro);
//   }
// });

// router.get("/animal/:id", async (req, res) => {
//   try {

//     if(req.params.id.length != 24) return res.status(400).send({valid: false, error: "ID inválido!"});

//     const animal = await Animal.findOne({
//       _id: req.params.id,
//       zoo_id: req.headers.zoo_id,
//     });

//     if(animal == null) return res.status(400).send({ valid: false, error: "Animal não existe no banco de dados!"});

//     res.send(animal);
//   } catch (erro) {
//     console.log(erro);
//     return res.status(400).send(erro);
//   }
// });

// router.post("/animal/:id", async (req, res) => {
//   try {

//     const animal = await Animal.findOne({
//       _id: req.params.id,
//       zoo_id: req.headers.zoo_id,
//     });

//     if(animal == null) return res.status(400).send({ valid: false, error: "Animal não existe no banco de dados!"});

//     const newTimesCaptured = animal.timesCaptured + 1;

//     const animalUpdated = await Animal.updateOne(
//       { _id: req.params.id, zoo_id: req.headers.zoo_id },
//       { timesCaptured: newTimesCaptured }
//     );
    
//     res.send(animalUpdated);
//   } catch (erro) {
//     console.log(erro);
//     return res.status(400).send(erro);
//   }
// });


module.exports = (app) => app.use("/user", router);