const {Schema} = require('mongoose');

const CoordinatesSchema = new Schema({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    }
})

module.exports = CoordinatesSchema;