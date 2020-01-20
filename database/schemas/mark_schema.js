const {Schema} = require('mongoose');
const CoordinatesSchema = require('./coordinates_schema')

const MarkSchema = new Schema({
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    },
    coordinates: [CoordinatesSchema]
})

module.exports = MarkSchema;