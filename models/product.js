const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String},
    price: {type: String},
    imageurl: {type: String},
    brandId: {type: String},
});

module.exports = mongoose.model('Product_collections',productSchema);