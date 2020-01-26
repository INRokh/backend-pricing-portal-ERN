const { Schema } = require("mongoose");

const ImageSchema = new Schema({
  s3key: {
    type: String,
    required: true
  },
  lot: {
    type: Number,
    required: false
  },
  unitNumber: {
    type: String,
    required: false
  },
  productDescription: {
    type: String,
    required: false
  }
});

module.exports = ImageSchema;
