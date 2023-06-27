const router = require("express").Router();
const User = require("../models/usuario.js");


router.get("/", async (req, res) => {
    // return all admin users from database 
    const users = await User.find({ admin: true });
    return res.json(users);
});

router.post("/", async (req, res) => {
    // create a new admin user
    const { name, email } = req.body;
    const user = await User.create({ name, email, admin: true });
    return res.json(user);
});

router.put("/:id", async (req, res) => {
    // update an admin user
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
    return res.json(user);
});

router.delete("/:id", async (req, res) => {
    // delete an admin user
    await User.findByIdAndRemove(req.params.id);
    return res.send();
});

module.exports = (app) => app.use("/admin", router);