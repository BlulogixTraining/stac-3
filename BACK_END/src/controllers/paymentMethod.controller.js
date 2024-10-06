const stripe = require('../config/stripeConfig');
const UserModel = require("../Models/users.model");

// Controller function to create a payment method for a user
const createPaymentMethod = async (req, res) => {
  const { payment_method_data, userId } = req.body; // Assuming payment_method_data is a valid Stripe token

  try {
    // Step 1: Fetch the user from your database
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    let customer;
    
    // Step 2: Check if the user has a Stripe customer ID
    if (!user.stripe_customer_id) {
      // Create a new customer on Stripe
      customer = await stripe.customers.create({
        email: user.email,  // Ensure that the user has an email field
      });

      // Save the Stripe customer ID to the user's record in your database
      user.stripe_customer_id = customer.id;
      await user.save();
    } else {
      // Fetch the existing customer from Stripe using the stored customer ID
      customer = await stripe.customers.retrieve(user.stripe_customer_id);
    }

    // Step 3: Create a payment method using the token from the request
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: { token: payment_method_data },  // Make sure payment_method_data is a valid token like 'tok_visa'
    });

    // Step 4: Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customer.id,
    });

    // Step 5: Set the payment method as the default payment method for the customer (optional)
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
    });

    // Step 6: Save the payment method ID to the user's record in the database
    if (!user.paymentMethods) user.paymentMethods = [];
      user.paymentMethods.push({
      paymentMethodId: paymentMethod.id,
      brand: paymentMethod.card.brand,
      last4: paymentMethod.card.last4,
      exp_month: paymentMethod.card.exp_month,
      exp_year: paymentMethod.card.exp_year,
  });
  
  await user.save();

    // Step 7: Return success response
    res.status(200).json({ success: true, customer, paymentMethod });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



const getAllPaymentMethods = async (req, res) => {
  const { userId } = req.params;

  try {
      const user = await UserModel.findById(userId);
      if (!user) {
          return res.status(404).json({ success: false, error: "User not found" });
      }

      const paymentMethods = user.paymentMethods;  // Now contains saved methods

      res.status(200).json({ success: true, paymentMethods });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};


// Get a specific payment method
const getPaymentMethod = async (req, res) => {
  const { userId, paymentMethodId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    if (!paymentMethod) {
      return res.status(404).json({ success: false, error: "Payment method not found" });
    }

    res.status(200).json({ success: true, paymentMethod });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a specific payment method
const updatePaymentMethod = async (req, res) => {
  const { userId, paymentMethodId } = req.params;
  const { payment_method_data } = req.body; // Assuming you send updated payment method data

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const updatedPaymentMethod = await stripe.paymentMethods.update(paymentMethodId, {
      billing_details: payment_method_data.billing_details, // Update accordingly
    });

    res.status(200).json({ success: true, updatedPaymentMethod });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a specific payment method
const deletePaymentMethod = async (req, res) => {
  const { userId, paymentMethodId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    await stripe.paymentMethods.detach(paymentMethodId);
    
    res.status(200).json({ success: true, message: "Payment method deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createPaymentMethod,
  getAllPaymentMethods,
  getPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
};