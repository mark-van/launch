const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.plugin(plm); //add on to our schema username and password which are required to be unique
//also gives us some methods
const User = mongoose.model('User', userSchema);

module.exports = User;