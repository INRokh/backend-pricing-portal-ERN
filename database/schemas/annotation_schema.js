const mongoose = require('mongoose') 
const Schema = mongoose.Schema
const MarkSchema = require('../schemas/mark_schema');

const AnnotationSchema = new Schema({
    marks: [MarkSchema],
    image_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    status: {
        type: String,
        enum: ["NEW", "IN_PROGRESS", "REVIEW", "COMPLETED"],
        default: "NEW"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = AnnotationSchema; 