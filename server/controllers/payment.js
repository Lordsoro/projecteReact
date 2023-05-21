const stripe = require('stripe')('your_secret_api_key_here');
const { Pedido } = require('../models/pedido');
const Product = require('../models/product');

async function processPayment(req, res) {
    const { user_id, products, quantity, total, size = 's', token } = req.body;

    try {
        // Get the products from the database
        const productDocs = await Product.find({ _id: { $in: products } });

        // Create a new payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
            payment_method_types: ['card'],
            payment_method_data: {
                type: 'card',
                card: {
                    token,
                },
            },
            confirmation_method: 'manual',
            confirm: true,
        });

        // Save the order to the database
        const newPedido = new Pedido({
            user_id,
            products: productDocs,
            quantity,
            size,
            total,
            payment_intent_id: paymentIntent.id,
        });
        await newPedido.save();

        res.json({ success: true, newPedido });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = {
    processPayment,
};
