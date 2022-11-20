const mongoose = require("mongoose");

const AreasSchema = new mongoose.Schema({
    city: {type: String, required: true, unique: true},
    areas: {type: Array, items: String},
});
const Areas = new mongoose.model('Areas', AreasSchema);
module.exports = Areas;