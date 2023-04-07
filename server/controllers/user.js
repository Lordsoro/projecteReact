/* eslint-disable no-throw-literal */
const User = require('../models/user');
const bcrypt = require('bcrypt');

async function register(req, res) {
    const { name, password, email, country = 'spain' } = req.body;
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
            name,
            password: hash,
            email,
            country,
        });
        await newUser.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        let user;
        let isDemoUser = false;
        if (email === 'demo@demo.com' && password === '123') {
            user = await User.findOne({ email });
            isDemoUser = true;
        } else {
            user = await User.findOne({ email });
            if (!user) throw { msg: 'Error en nombre' };
            const passwordSucces = await bcrypt.compare(password, user.password);
            if (!passwordSucces) throw { msg: 'Error en contraseña' };
        }
        req.session.currentUser = email;
        res.json({
            success: true,
            user: isDemoUser ? 'Demo User' : user.name,
            id: isDemoUser ? user._id : user.id,
        });
    } catch (error) {
        res.json({ success: false, error: 'Usuario o contraseña incorrectos' });
    }
}

const demoUser = {
    name: 'Demo User',
    email: 'demo@demo.com',
    country: 'Spain',
};

async function init() {
    try {
        const user = await User.findOne({ email: demoUser.email });
        if (user) return;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash('123', salt);
        const newUser = new User({
            ...demoUser,
            password: hash,
        });
        await newUser.save();
    } catch (error) {
        console.error(error);
    }
}

init();

module.exports = {
    register,
    login,
};
