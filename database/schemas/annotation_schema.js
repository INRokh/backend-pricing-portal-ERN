const {Schema} = require('mongoose');
const MarkShema = require('./mark_schema');

const AnnotationSchema = new Schema({
    marks: {
        type: [MarkShema],
        required: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    is_active: {
        type: Boolean,
        default: true,
        required: true
    }
    //add user ref 
})

module.exports = AnnotationSchema;