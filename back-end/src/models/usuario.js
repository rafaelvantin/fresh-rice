const mongoose = require("../database/index.js");

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