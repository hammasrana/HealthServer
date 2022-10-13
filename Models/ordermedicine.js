const mongoose = require("mongoose");
const { stringify } = require("querystring");


const health = new mongoose.Schema({
  name: {
    type: String,
  },

  contactnumber: {
    type: String,
    
  },

  location: {
    type: String,
  },
  medicine:{
    type:String
  }
   
});


const Labmedi = new mongoose.model("Medicines", health);

module.exports = Labmedi;
