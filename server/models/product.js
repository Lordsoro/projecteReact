const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Definición del esquema de nuestra colección
let productSchema = new schema({
    name: {
        type: String,
        required: false,

    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    }
});

// Asociación con el modelo (colección contactos)
let Product = mongoose.model('product', productSchema);

module.exports = Product;