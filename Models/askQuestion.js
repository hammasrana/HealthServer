const mongoose = require('mongoose');
// const { stringify } = require('querystring');


const askQ = new mongoose.Schema({
    title: {type: String, required: true},
    patientAbout: {type: String,},
    question: {type: String, required: true},
    answers:{type: Array, items:{
        docName: {type: String, required: true},
        docDeg: {type: String, required: true},
        docSpec: {type: String, required: true},
        ans: {type: String, required: true}
    }}
});
const AskQuestion = new mongoose.model("AskQuestion", askQ);
module.exports = AskQuestion;
