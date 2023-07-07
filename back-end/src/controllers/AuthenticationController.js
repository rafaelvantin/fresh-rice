const router = require("express").Router();
const User = require("../models/usuario.js");
const bcrypt = require("bcrypt");

router.post('/login', async (request, response) => {
    if(!request.body.email || !request.body.password) {
        response.status(400).json({message: "Missing email or password"});
        return;
    }

    if(request.session.user) {
        response.status(400).json({message: "User already logged in"});
        return;
    }

    const candidateUser = await User.findOne({email: request.body.email});
    if(!candidateUser) { 
        response.status(401).json({message: "Invalid email or password"});
        return;
    }

    const validPassword = await bcrypt.compare(request.body.password, candidateUser.hash);
    if(!validPassword) {
        response.status(401).json({message: "Invalid email or password"});
        return;
    }

    request.session.user = {
        id: candidateUser._id,
        isAdmin: candidateUser.admin,
    }
    response.status(200).json({
        message: "User logged in successfully",
        user: {
            name: candidateUser.name,
            type: candidateUser.admin ? "admin" : "user",
        }
    });
});

router.post('/logout', async (request, response) => {
    if(!request.session.user) {
        response.status(401).json({message: "User not logged in"});
        return;
    }

    request.session.destroy();
    response.status(200).json({message: "User logged out successfully"});
});

router.post('/register', async (request, response) => {
    const { name, email, password, birthdate, cpf, address } = request.body;

    if(request.session.user) {
        response.status(400).json({message: "User already logged in"});
        return;
    }

    if(!password || password.length < 8) {
        response.status(400).json({message: "Missing or invalid fields"});
        return;
    }
    const hash = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        hash,
        birthdate,
        cpf,
        address,
        admin: false,
    });

    const validationError = await user.validate();
    if(validationError) {
        response.status(400).json({message: "Missing or invalid fields"});
        return;
    }

    try {
        await user.save();
    }
    catch(error) {
        // 11000 is the error code for duplicate key error
        if(error.code === 11000) {
            response.status(409).json({message: "Email or CPF already registered"});
            return;
        }

        response.status(500).json({message: "Error registering user"});
        return;
    }

    response.status(200).json({message: "User registered successfully"});
});

router.get('/me', async (request, response) => {
    if(!request.session.user) {
        response.status(401).json({message: "User not logged in"});
        return;
    }

    let user;
    try {
        user = await User.findById(request.session.user.id);
    }
    catch(error) {
        response.status(500).json({message: "Error retrieving user data"});
        return;
    }

    if(!user) {
        request.session.destroy();
        response.status(401).json({message: "User not logged in"});
        return;
    }

    const { details } = request.query;

    if(details === "full") {
        response.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                type: user.admin ? "admin" : "client",
                birthdate: user.birthdate,
                cpf: user.cpf,
                address: user.address,
            },
        });
    } else {
        response.status(200).json({
            user: {
                name: user.name,
                type: user.admin ? "admin" : "client",
            },
        });
    }
});

router.put('/me', async (request, response) => {
    if(!request.session.user) {
        response.status(400).json({message: "User not logged in"});
        return;
    }

    const user = await User.findById(request.session.user.id);
    if(!user) {
        response.status(500).json({message: "Could not find user data"});
        return;
    }

    if(request.body.name) {
        user.name = request.body.name;
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


module.exports = router;