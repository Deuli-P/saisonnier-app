const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    verificationToken: String,
    userDescription:{
        type: String,
        default: null,
    },
    userImage:{
        type: String,
        default: null,
    },
    connection:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    connectionRequest:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    sentConnectionRequest:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    createAt:{
        type: Date,
        default: Date.now,
    },

});

const User = mongoose.model('User', userSchema);

module.exports = User;