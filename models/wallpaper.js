'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wallpaperSchema = new Schema({
    name: {type: String},
    imageurl: {type: String},
});

module.exports = mongoose.model('Wallpaper_collections',wallpaperSchema);