const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
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
        enum:
            ['customer', 'admin', 'retailer'],
        default:'customer'
    }
}, {
    timestamps:true,
})

const User = mongoose.model('user', userSchema);

module.exports = User;