const mongoose = require('mongoose');
const TagSchema = require('../schemas/tag_schema');
const TagModel = mongoose.model('Tag', TagSchema);

module.exports = TagModel;