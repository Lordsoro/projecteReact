const { Pedido } = require('../models/pedido');
const Product = require('../models/product');

async function register(req, res) {
    const { user, products, quantity, total, size = 's' } = req.body;
    try {
        const productDocs = await Product.find({ _id: { $in: products } })
        const newPedido = new Pedido({
            user,
            products: productDocs,
            quantity,
            size,
            total
        });

        await newPedido.save();
        //res.redirect('/payment');
        res.json({ success: true, newPedido });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = {
    register
}