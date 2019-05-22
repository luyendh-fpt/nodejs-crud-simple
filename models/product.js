var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: String,
    status: Number
});
var Product = mongoose.model('products', ProductSchema);
module.exports = Product;