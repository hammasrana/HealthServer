const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');

const DoctorSchema = new mongoose.Schema({
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
    speciality: {type: String ,},
    work: {type: Array, items: String},
    hospital: {
        type: Array, 
        items: {
            name: {type: String,},
            address: {type: String,},
            wDays: {type: String, },
            timing:{type: String, },
            price: {type: Number, },
            btn: {type: String, }
        },
    },
});
// DoctorSchema.index({tags:'text'});
const Doctors = new mongoose.model('Doctors', DoctorSchema);
module.exports = Doctors;