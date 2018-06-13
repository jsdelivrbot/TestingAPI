const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var hrsubmission = new Schema({
    name: String,
    position: String,
    profiledetails: String,
});

module.exports = mongoose.model('HRSubmission', hrsubmission);