const stripe = require('../config/stripeConfig');
const UserModel = require("../Models/users.model");
const sendEmail = require('../services/nodeMailer'); 
const { generateInvoicePDF } = require('../utils/PdfGenerator');

exports.processPayment = async (req, res) => {
  const { userId, amount, currency } = req.body;

  try {
    // Fetch user from the database
    const user = await UserModel.findById(userId);
    const stripeCustomerId = user.stripe_customer_id;

    // Check if user exists and if stripe_customer_id is present
    if (!user || !stripeCustomerId) {
      return res.status(400).json({ success: false, message: "Customer not found or user doesn't exist" });
    }

    // Check if user has payment methods saved
    if (!user.paymentMethods || user.paymentMethods.length === 0) {
      return res.status(400).json({ success: false, message: "No payment methods found for the user" });
    }

    // Retrieve the first payment method from the array (you can also loop through or set a default)
    const paymentMethodId = user.paymentMethods[0].paymentMethodId;

    // Step 1: Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,  // Amount in smallest currency unit (e.g., cents for USD)
      currency: currency || 'usd',  // Default to USD if no currency provided
      customer: stripeCustomerId,
      payment_method: paymentMethodId,
      confirm: true,
      off_session: true,
    });

    // Step 2: Generate PDF Invoice after successful payment
    const invoiceData = {
      customerName: user.fullName || user.email,
      amount: amount / 100,  // Convert amount back from smallest currency unit
      currency: currency || 'USD',
      date: new Date(),
      paymentId: paymentIntent.id,
    };

    const invoicePDF = await generateInvoicePDF(invoiceData);

    // Step 3: Send the invoice to the user via email
    const emailConfig = {
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: 'Invoice for your payment',
      text: 'Thank you for your payment. Please find your invoice attached.',
      html: '<p>Thank you for your payment. Please find your invoice attached.</p>',
      invoiceData: invoiceData,
    };

    await sendEmail(emailConfig);

    // Step 4: Return success response
    res.status(200).json({ success: true, paymentIntent });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

