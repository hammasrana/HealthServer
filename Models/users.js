const mongoose = require("mongoose");
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, validate: [validator.isEmail, 'invalid email'], required: true},
    password: {type: String, default: ''},
    degree: {type: String, default: 'none'},
    speciality: {type: String, default: 'none'},
    type: {type: String, required: true},
    phone:{type: String, required: true}
});
const Users = new mongoose.model('Users', UserSchema);
module.exports = Users;
