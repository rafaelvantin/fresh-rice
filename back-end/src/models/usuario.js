const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: 1,
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        cep: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        complement: {
            type: String,
            required: false,
        },
        neighborhood: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        uf: {
            type: String,
            required: true,
        },
    },
    created_at: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    admin: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;