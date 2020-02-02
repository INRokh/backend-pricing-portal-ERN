const { Schema } = require("mongoose");

const ImageSchema = new Schema({
  s3key: {
    type: String,
    required: true
  },
  lot: {
    type: Number,
    required: true
  },
  unitNumber: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  }
});

module.exports = ImageSchema;
