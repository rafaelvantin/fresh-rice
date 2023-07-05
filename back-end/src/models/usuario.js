const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        // unique: true,
        type: String,
        required: true,
    },
    password: {
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
    },
    phone: {
        type: String,
        required: true,
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