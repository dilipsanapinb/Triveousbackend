const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstaname: {
        type: String,
        required:true
    },
    lastname: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        default:'user'
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;