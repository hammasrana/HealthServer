const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');

const NurseSchema = new mongoose.Schema({
    // _id: {type: Number,},
    name: { type: String, index: true, required: true, unique: true },
    degree: {type: String ,},
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
    desig: {type: String ,},
    review: {type: Number ,},
    city: {type: String},
    hospital: {
        type: Object, 
        items: {
            name: {type: String,},
            address: {type: String,},
            wDays: {type: String, },
            timing:{type: String, },
            price: {type: Number, },
        },
    },
    phone:{type: String, required: true},
});
// NurseSchema.index({tags:'text'});
const Nurses = new mongoose.model('Nurses', NurseSchema);
module.exports = Nurses;