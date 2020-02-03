const { Schema } = require("mongoose");

const ImageSchema = new Schema({
  is_active: {
    type: Boolean,
    default: true,
    required: true
  },
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
