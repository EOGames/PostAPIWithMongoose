const mongoose = require('mongoose');

const productSchema =  new mongoose.Schema(
    {
        model:String,
        price:Number,
        brand:String
    }
);

module.exports = mongoose.model('products',productSchema);