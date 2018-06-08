const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var infororderSchema = new Schema({
    date: { type: Date },
    description: String,
    location: String,
});

module.exports = mongoose.model('InforOrder', infororderSchema);