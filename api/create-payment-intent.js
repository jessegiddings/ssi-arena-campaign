// Vercel Serverless Function for Stripe Payment Intent
// This keeps your secret key secure on the backend

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, name, email } = req.body;

    // Validate amount
    if (!amount || amount < 50) { // Stripe minimum is $0.50 CAD = 50 cents
      return res.status(400).json({ error: 'Amount must be at least $0.50 CAD' });
    }

    // Validate name and email
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency: 'cad',
      description: 'Donation to Salt Spring Island Arena Project',
      receipt_email: email,
      metadata: {
        donor_name: name,
        donor_email: email,
        project: 'SSI Arena'
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
};
