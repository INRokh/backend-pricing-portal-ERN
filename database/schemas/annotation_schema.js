const mongoose = require('mongoose') 
const Schema = mongoose.Schema
const MarkSchema = require('../schemas/mark_schema');

const AnnotationSchema = new Schema({
    marks: [MarkSchema],
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    status: {
        type: String,
        enum: ["NEW", "IN_PROGRESS", "IN_REVIEW", "DONE"],
        default: "NEW"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = AnnotationSchema; 