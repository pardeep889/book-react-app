const mongoose = require('mongoose');
const config = require('../config/config').get(process.env.NODE_ENV);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        index: true,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    name:{
        type: String,
        maxlength: 50
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role:{
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
});


const User = mongoose.model('User', userSchema);
module.exports = { User };