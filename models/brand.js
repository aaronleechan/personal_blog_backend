'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {type: String},
    location: {type: String},
});

module.exports = mongoose.model('Brand_collections',brandSchema);