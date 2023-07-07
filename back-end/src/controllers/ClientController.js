const router = require("express").Router();
const User = require("../models/usuario.js");
const bcrypt = require("bcrypt");

// SHOULD NOT HAVE POST ROUTE AS USER CREATION IS DONE THROUGH AUTHENTICATION

router.get('/', async (request, response) => {
    if(!request.session.user) {
        response.status(401).json({message: "User not logged in"});
        return;
    }
    
    if(!request.session.user.isAdmin) {
        response.status(403).json({message: "User not authorized"});
        return;
    }
    
    const { name, page, limit, count } = request.query;

    const queryObject = {
        name: { $regex: name || "", $options: "i" }, // i = case insensitive
        admin: false,
    }; 
    
    const users = await User.find(queryObject)
                            .skip((page - 1) * limit)
                            .limit(limit)
                            .sort({name: 1});

    let totalCount = count==="true" && await User.countDocuments(queryObject);

    if(!users) {
        response.status(500).json({message: "Could not find users"});
        return;
    }

    const formattedUsers = users.map(user => {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            cpf: user.cpf,
            address: user.address,
        };
    });

    response.status(200).json({
        clients: formattedUsers,
        currentPage: page,
        totalPages: (count==="true") ? Math.ceil(totalCount / limit) : undefined,
    });
});

router.get('/:id', async (request, response) => {
    if(!request.session.user) {
        response.status(401).json({message: "User not logged in"});
        return;
    }
    
    if(!request.session.user.isAdmin) {
        response.status(403).json({message: "User not authorized"});
        return;
    }

    const user = await User.findById(request.params.id);
    if(!user) {
        response.status(404).json({message: "User not found"});
        return;
    }

    response.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
        cpf: user.cpf,
        address: user.address,
    });
});

router.put('/:id', async (request, response) => {
    if(!request.session.user) {
        response.status(401).json({message: "User not logged in"});
        return;
    }
    
    if(!request.session.user.isAdmin) {
        response.status(403).json({message: "User not authorized"});
        return;
    }

    const user = await User.findById(request.params.id);
    if(!user) {
        response.status(500).json({message: "Could not find user data"});
        return;
    }

    if(request.body.name) {
        user.name = request.body.name;
    }
    if(request.body.email) {
        user.email = request.body.email;
    }
    if(request.body.cpf) {
        user.cpf = request.body.cpf;
    }
    if(request.body.birthdate) {
        user.birthdate = request.body.birthdate;
    }
    if(request.body.address?.cep) {
        user.address.cep = request.body.address.cep;
    }
    if(request.body.address?.street) {
        user.address.street = request.body.address.street;
    }
    if(request.body.address?.number) {
        user.address.number = request.body.address.number;
    }
    if(request.body.address?.complement !== undefined) {
        user.address.complement = request.body.address.complement;
    }
    if(request.body.address?.neighborhood) {
        user.address.neighborhood = request.body.address.neighborhood;
    }
    if(request.body.address?.city) {
        user.address.city = request.body.address.city;
    }
    if(request.body.address?.state) {
        user.address.state = request.body.address.state;
    }

    const validationError = await user.validate();
    if(validationError) {
        response.status(400).json({message: "Missing or invalid fields"});
        return;
    }

    try {
        await user.save();
    }
    catch(error) {
        response.status(500).json({message: "Error updating user data"});
        return;
    }

    response.status(200).json({
        message: "User data updated successfully",
        user: {
            type: user.admin ? "admin" : "client",
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            birthdate: user.birthdate,
            address: user.address,
        }
    });
});

router.delete('/:id', async (request, response) => {
    if(!request.session.user) {
        response.status(401).json({message: "User not logged in"});
        return;
    }
    
    if(!request.session.user.isAdmin) {
        response.status(403).json({message: "User not authorized"});
        return;
    }

    try {
        await User.findByIdAndDelete(request.params.id);
        response.status(204).end();
    }
    catch(error) {
        response.status(500).json({message: "Error deleting user"});
    }
});

router.post('/:id/promote', async (request, response) => {

    if(!request.session.user) {
        response.status(401).json({message: "User not logged in"});
        return;
    }

    if(!request.session.user.isAdmin) {
        response.status(403).json({message: "User not authorized"});
        return;
    }

    const { password } = request.body;
    if(!password) {
        response.status(400).json({message: "Missing password"});
        return;
    }

    const currentUser = await User.findById(request.session.user.id);
    if(!currentUser) {
        response.status(500).json({message: "Could not find admin data"});
        return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, currentUser.hash);
    if(!isPasswordCorrect) {
        response.status(401).json({message: "Incorrect password"});
        return;
    }

    const targetUser = await User.findById(request.params.id);
    if(!targetUser) {
        response.status(500).json({message: "Could not find target user data"});
        return;
    }

    targetUser.admin = true;

    try {
        await targetUser.save();
    }
    catch(error) {
        response.status(500).json({message: "Error promoting user"});
        return;
    }

    response.status(200).json({message: "User promoted successfully"});
});

module.exports = router;