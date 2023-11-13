const mongoose  = require('mongoose');

const vechicleSchema = new mongoose.Schema({

    vechicleid: String,
    drivername: String,
    drivernumber: Number,
    driveraddress: String,
    driveridproof: String,
    driverlicenseno: String,
    vechiclenuumber: String,
    vechiclemodel: String,
    vechicleofficebranch: String,
});

const Vechicle = mongoose.model('Vechicle', vechicleSchema);

module.exports = Vechicle;