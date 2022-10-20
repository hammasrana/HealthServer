const mongoose = require('mongoose');
// const { stringify } = require('querystring');

const health = new mongoose.Schema({
    name: {
        type: String,
        require: true,
      },
      timings: {
        type: String,
        require: true,
      },
      icon: {
        type: String,
        require: true,
      },
      city: {type: String},
      about: {
        type: String,
        require: true,
      },
      offers:{
     type:String,
     require: true,
      },
   
      quantity:{
        type:String,
        require: true,
      },
      test: {type: Array,
        items: {
          title: {type: String},
          rate: {type: String},
          discountrate: {type: String}
        },
        
        
      },
      testall: {type: Array,
        items: {
          title: {type: String},
          rate: {type: String},
          discountrate: {type: String},
        },

      },
        branches: {type: Array,
        items: {
     name:{type:String}
        }
      }  
});
const LabTests = new mongoose.model("Labtest", health);
module.exports = LabTests;
