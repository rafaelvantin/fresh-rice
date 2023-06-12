const mongoose = require("../database/index.js");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        select: false,
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;