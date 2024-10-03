const mongoose = require('mongoose');

// Define the PaymentMethods schema
const paymentMethodSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'user.model',
    required: true,  // References the user who owns this payment method
  },
  method_type: {
    type: String,
    required: true,
    enum: ['Credit Card', 'PayPal', 'Bank Transfer'],  // Allowed payment methods
  },
  stripe_payment_method_id: {  // Store the Stripe payment method ID (for Credit Card, PayPal, Bank Transfer)
    type: String,
    required: true,
  },

  is_default: {
    type: Boolean,
    default: false,  // Indicates if this is the default payment method
  },
  created_at: {
    type: Date,
    default: Date.now,  // Automatically set when the payment method is created
  },
  updated_at: {
    type: Date,
    default: Date.now,  // Automatically updated when the payment method is modified
  },
});

// Middleware to update `updated_at` before saving
paymentMethodSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Create the model from the schema
const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

module.exports = PaymentMethod;
