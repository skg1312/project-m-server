const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    staffname: String,
    staffemail:String,
    staffpassword: String,
    staffphone: Number,
    staffaccess: String,
    staffidproof: String,
    staffofficebranch: String,
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;