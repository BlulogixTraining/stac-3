const mongoose = require('mongoose');
// Product Schema
const ProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128, // Using Decimal128 for high-precision decimal values
        required: true
    }
});
const ProductsModel = mongoose.model("products", ProductSchema);
module.exports = ProductsModel;