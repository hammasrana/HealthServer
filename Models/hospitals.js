const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');

const hospitalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String,},
    rating: {type: Number,},
    availableDoc: {type: Number,},
    about: {type: String,},
    departments:{type: Array, items: String},
    helpline: {type: String, required: true},
    location: {type: Object, items:{
        latitude: {type: Double,},
        longitude: {type: Double,}
    }},
    city: {type: String, required: true},
    area:{type: String, required: true},

})

const Hospital = new mongoose.model('Hospitals', hospitalSchema);
module.exports = Hospital;