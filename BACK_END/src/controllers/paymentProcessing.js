const stripe = require('../config/stripeConfig'); // Ensure you have the Stripe instance here
const UserModel = require("../Models/users.model");

exports.processPayment = async (req, res) => {
  const { userId, amount, currency } = req.body;

  try {
    // Fetch user from the database
    const user = await UserModel.findById(userId);

    // Ensure the user has Stripe customer and payment method IDs
    const stripeCustomerId = user.stripe_customer_id;  // Correct reference to the user's Stripe customer ID
    const paymentMethodId = user.stripe_payment_method_id; // Correct reference to the user's payment method ID

    if (!stripeCustomerId || !paymentMethodId) {
      return res.status(400).json({ success: false, message: "Payment method or customer not found" });
    }

    // Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // The amount in the smallest currency unit (e.g., cents for USD)
      currency: currency || 'usd', // Default to USD if no currency provided
      customer: stripeCustomerId,
      payment_method: paymentMethodId,
      confirm: true, // Immediately confirm and attempt to charge
      off_session: true, // Indicating the user is not interacting directly with the payment interface
    });

    // Payment processed successfully
    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
