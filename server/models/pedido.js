const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definición del esquema de nuestra colección
let pedidoSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,

    }],
    quantity: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
let Pedido = mongoose.model('pedido', pedidoSchema);

module.exports = { User, Pedido }