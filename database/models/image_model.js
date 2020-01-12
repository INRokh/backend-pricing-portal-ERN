const mongoose = require('mongoose');
const ImageSchema = require('../schemas/image_schema');
const ImageModel = mongoose.model('Image', ImageSchema);

module.exports = ImageModel;