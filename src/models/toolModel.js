'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToolSchema = new Schema({
    id: {
        type: Number,
        required: "ID é obrigatório"
    },
    title: {
        type: String,
        required: "Titulo é obrigatório"
    },
    link: {
        type: String,
    },
    description: {
        type: String,
    },
    tags: {
        type: [String],
    }
});

module.exports = mongoose.model('Tool', ToolSchema);