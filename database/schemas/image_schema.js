const {Schema} = require('mongoose');

const ImageSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true,
        required: true
    }
})

module.exports = ImageSchema;