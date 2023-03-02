/* eslint-disable no-throw-literal */
const User = require('../models/user');
const bcrypt = require('bcrypt');

async function register(req, res) {
    const { name, password, email, country } = req.body;
    try {
        if (!name) {
            throw { msg: 'El nombre es obligatorio' };
        }
        if (!password) {
            throw { msg: 'La contraseña es obligatoria' };
        }
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            throw { msg: 'El email ya está en uso' };
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            name: name,
            password: hash,
            email: email,
            country: country
        });
        await newUser.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).send(error);
    }
}


async function login(req, res) {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) throw { msg: "Error en nombre " }
        const passwordSucces = await bcrypt.compare(password, user.password);
        if (!passwordSucces) throw { msg: "Error en contraseña" }

        req.session.currentUser = email;
        res.json({ success: true, user: user.name })

    } catch (error) {

        res.json({ success: false, error: "Usuario o contraseña incorrectos" })

    }

}



module.exports = {
    register,
    login,
}