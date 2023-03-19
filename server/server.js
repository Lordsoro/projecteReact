const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const app = express();
const port = 8000;


// set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

const mongoAtlas = 'mongodb+srv://salva:mongo1212@cluster0.0rp8shz.mongodb.net/?retryWrites=true&w=majority'


mongoose
    .connect(mongoAtlas, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('la conexion ha sido realizada con éxito');
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });



// set up routes
const userRoute = require('./routes/user')
const productRoute = require('./routes/products')
const pedidoRoute = require('./routes/pedido')

//cargar rutas
app.use('/api', userRoute);
app.use('/api', productRoute);
app.use('/api', pedidoRoute)

module.exports = app;


