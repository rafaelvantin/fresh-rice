const router = require("express").Router();
const User = require("../models/usuario.js");

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
    
    // TODO: implement retrieval, pagination, sorting and filtering
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

    // TODO: implement update (already implemented in AuthenticationController.js)
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

    // TODO: implement deletion
});

module.exports = router;