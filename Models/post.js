const mongoose = require("mongoose");
const { stringify } = require("querystring");

const health = new mongoose.Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  rate: {
    type: String,
  },
  discountrate: {
    type: String,
  },
  contactnumber: {
    type: String,
    require: true,
  },
  branche: { type: String },
  location: {
    type: String,
  },
  document: {
    data: Buffer,
    type: String,
  },
});

const Labpost = new mongoose.model("Bookingtest", health);

module.exports = Labpost;
