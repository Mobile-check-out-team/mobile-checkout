const Stripe = require('stripe')
const {STRIPE_SECRET} = process.env;
const stripe = new Stripe(STRIPE_SECRET);
module.exports = {
    charge: async (req, res) => {
        const {id, amount} = req.body;

        try {
            const payment = await stripe.paymentIntents.create({
                amount,
                currency: 'USD',
                description: 'Scan&Go',
                payment_method: id,
                confirm:true
            });
            // console.log(payment);
            return res.status(200).json({
                confirm: 'abc123'
            });
        } catch(error){
            // console.log(error);
            return res.status(400).json({
                message: error.message
            })
        }
    }
}