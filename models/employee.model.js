const mongoose = require('mongoose');
const Department = require('./department.model');
const Schema = mongoose.Schema;

var employeeSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    doj : { type: Date, default: Date.now },
    dob: { type:Date },
    department: String
});

module.exports = mongoose.model('Employee', employeeSchema);

