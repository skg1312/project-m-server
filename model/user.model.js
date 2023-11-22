const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    useremail:String,
    userpassword: String,
    userphone: Number,
    useraccess: String,
    useridproof: String,
    useraddress: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;