const mongoose = require('mongoose');
const AnnotationSchema = require('../schemas/annotation_schema');
const AnnotationModel = mongoose.model('Annotation', AnnotationSchema);

module.exports = AnnotationModel;