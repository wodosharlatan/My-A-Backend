const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    personalNumber: {
        type: String,
        required: true,
    },
    parentNumber: {
        type: String,
        required: true,
    },
    parentNumber2: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Users", userSchema);