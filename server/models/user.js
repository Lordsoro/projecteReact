const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Definición del esquema de nuestra colección
let userSchema = new schema({
    id: {
        type: schema.Types.ObjectId,
        required: false
    },
    name: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    }
});

// Asociación con el modelo (colección contactos)
let User = mongoose.model('user', userSchema);

module.exports = User;
