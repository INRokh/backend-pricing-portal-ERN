const {Schema} = require('mongoose');

const TagSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    is_active: {
        type: Boolean,
        default: true,
        required: true
    }
})

module.exports = TagSchema;