const mongoose = require("mongoose");
// const Double = require('@mongoosejs/double');
// const validator = require("validator");

const hospitalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String,},
    rating: {type: Number,},
    openingHours: {type: Number},
    availableDoc: {type: Number,},
    about: {type: String,},
    departments:{type: Array, items: String},
    helpline: {type: String, required: true},
    location: {type: Object, items:{
        latitude: {type: mongoose.Schema.Types.Decimal128,},
        longitude: {type: mongoose.Schema.Types.Decimal128,}
    },
     unique: true},
    city: {type: String, required: true},
    area:{type: String, required: true},
    image: {
        type: String,
        validate: {
            validator: function(value) {
                const urlPattern = /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%#!\-/]))?/;
                const urlRegExp = new RegExp(urlPattern);
                return value.match(urlRegExp);
            },
            message: props => `${props.value} is not a valid image URL`
        },
        unique: true
    },
})

const Hospital = new mongoose.model('Hospitals', hospitalSchema);
module.exports = Hospital;