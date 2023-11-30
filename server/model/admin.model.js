const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminname: String,
    adminemail:String,
    adminpassword: String,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;