const Pedido = require('../models/pedido');
const Product = require('../models/product');

async function register(req, res) {
    const { user_id, products, quantity, size = 's' } = req.body;
    try {
        const productDocs = await Product.find({ _id: { $in: products } })
        const total = productDocs.reduce((total, product) => total + (product.price * product.quantity), 0)
        const newPedido = new Pedido({
            user_id,
            products: productDocs,
            quantity,
            size,
            total

        });

        await newPedido.save();
        res.json({ success: true, newPedido });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = {
    register
}