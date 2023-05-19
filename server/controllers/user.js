/* eslint-disable no-throw-literal */
const User = require('../models/user');
const { Pedido } = require('../models/pedido');
const bcrypt = require('bcrypt');

async function profile(req, res) {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            throw { msg: 'Usuario no encontrado' };
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).send(error);
    }
}
async function order(req, res) {
    try {
        const userId = req.params.userId;
        const pedidos = await Pedido.find({ userId: userId });

        res.json({ pedidos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los pedidos del usuario' });
    }
}
async function deleteAccount(req, res) {
    const userId = req.params.userId;

    try {
        await User.deleteOne({ _id: userId });

        res.json({ success: true, message: 'Cuenta eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al eliminar la cuenta' });
    }
}

async function register(req, res) {
    const { name, password, email, city, adress } = req.body;
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
            city,
            adress,
        });
        await newUser.save();
        const user = { id: newUser._id, name, email, city };
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).send(error);
    }

}
async function editUser(req, res) {
    const { userId } = req.params;
    const { name, password, email, city, address } = req.body;
    try {
        if (!name) {
            throw { msg: 'El nombre es obligatorio' };
        }
        if (!password) {
            throw { msg: 'La contraseña es obligatoria' };
        }

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            throw { msg: 'El usuario no existe' };
        }

        const foundUser = await User.findOne({ email });
        if (foundUser && foundUser._id.toString() !== userId) {
            throw { msg: 'El email ya está en uso' };
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        existingUser.name = name;
        existingUser.password = hash;
        if (email) {
            existingUser.email = email;
        }
        if (city) {
            existingUser.city = city;
        }
        if (address) {
            existingUser.address = address;
        }

        await existingUser.save();

        const updatedUser = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            city: existingUser.city,
            address: existingUser.address,
        };

        res.json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).send(error);
    }
}



async function login(req, res) {
    console.log('recieved in login: ')
    console.log(req.body)
    const { email, password } = req.body;
    try {
        let user = req.session.currentUser;
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

        console.log(req.session.currentUser);
        await user.save();
        res.json({
            success: true,
            user: isDemoUser ? 'Demo User' : user,
            id: user.id,
            name: user.name
        });

    } catch (error) {
        res.json({ success: false, error: 'Usuario o contraseña incorrectos' });
    }
}




const demoUser = {
    name: 'Demo User',
    email: 'demo@demo.com',
    city: 'Spain',
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
    profile,
    deleteAccount,
    editUser,
    order
};
