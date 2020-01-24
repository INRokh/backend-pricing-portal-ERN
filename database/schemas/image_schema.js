const { Schema } = require("mongoose");

const ImageSchema = new Schema({
  // [change soon] to display keys & save keys to database
  s3Key: {
    type: String,
    required: true
  }
});

module.exports = ImageSchema;
