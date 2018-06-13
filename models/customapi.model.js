const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customapi = new Schema({
    airportname: String,
    runway: String,
    contaminents: [{
        contamcode: String,
        cleared: String
    }]
})


module.exports = mongoose.model('CustomAPI', customapi);