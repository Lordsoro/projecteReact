const Product = require('../models/product');


async function getProducts(req, res) {
    try {
        const products = await Product.find({}).exec();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    getProducts
}