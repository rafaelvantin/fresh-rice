const router = require("express").Router();
const User = require("../models/usuario.js");


router.get("/", async (req, res) => {
    // return all admin users from database 
    const {page = 1, limit = 10, name = ""} = req.query;
    const users = await User.find({ admin: true, name: { $regex: name, $options: "i" } }).limit(limit * 1).skip((page - 1) * limit);
    const count = await User.countDocuments({ admin: true });
    return res.json({
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        users
    });
});

// AS USER CREATION IS DONE THROUGH AUTHENTICATION, THIS ROUTE SHOULD NOT EXIST
/*router.post("/", async (req, res) => {
    // create a new admin user
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password, admin: true });
    return res.json(user);
});*/

router.put("/:id", async (req, res) => {
    // update an admin user
    const { name, email, birthdate, phone, cpf } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, birthdate, phone, cpf }, { new: true });
    return res.json(user);
});

router.delete("/:id", async (req, res) => {
    // delete an admin user
    await User.findByIdAndRemove(req.params.id);
    return res.send();
});

module.exports = router;