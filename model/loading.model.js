const mongoose  = require('mongoose');

const loadingSchema = new mongoose.Schema({

    startpoint : String,
    endpoint : String,
    rate : Number,
});

const Loading = mongoose.model('Loading', loadingSchema);

module.exports = Loading;