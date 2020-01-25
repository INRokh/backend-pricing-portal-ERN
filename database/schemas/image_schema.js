const { Schema } = require("mongoose");

const ImageSchema = new Schema({
  s3Key: {
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
  projectDescription: {
    type: String,
    required: false
  }
});

module.exports = ImageSchema;
