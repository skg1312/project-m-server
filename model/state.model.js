const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    statename: String,
    statecode: String,
});

const State = mongoose.model('State', stateSchema);

module.exports = State;
