const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoordinatesSchema = require('./coordinates_schema')

const MarkSchema = new Schema({
    tag_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    },
    coordinates: [CoordinatesSchema]
})

module.exports = MarkSchema;