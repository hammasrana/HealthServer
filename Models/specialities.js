const mongoose = require("mongoose");

const SpecSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    text: {type: String},
    noOfDoctors: {type: Number},
});
const Specialities = new mongoose.model('Specialities', SpecSchema);
module.exports = Specialities;