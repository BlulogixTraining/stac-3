const mongoose = require('mongoose');

// Define the PaymentMethods schema
const paymentMethodSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  // References the user who owns this payment method
  },
  method_type: {
    type: String,
    required: true,
    enum: ['Credit Card', 'PayPal', 'Bank Transfer'],  // Allowed payment methods
  },
  card_details: {  // Used for credit card payment method
    card_number: {
      type: String,
      minlength: 16,
      maxlength: 16,
      required: function () {
        return this.method_type === 'Credit Card';
      },
    },
    cardholder_name: {
      type: String,
      required: function () {
        return this.method_type === 'Credit Card';
      },
    },
    expiry_date: {
      type: String, // MM/YY format
      required: function () {
        return this.method_type === 'Credit Card';
      },
    },
    cvv: {
      type: String,
      minlength: 3,
      maxlength: 3,
      required: function () {
        return this.method_type === 'Credit Card';
      },
    },
  },
  paypal_email: {  // Used for PayPal payment method
    type: String,
    required: function () {
      return this.method_type === 'PayPal';
    },
  },
  bank_details: {  // Used for bank transfer method
    account_number: {
      type: String,
      required: function () {
        return this.method_type === 'Bank Transfer';
      },
    },
    bank_name: {
      type: String,
      required: function () {
        return this.method_type === 'Bank Transfer';
      },
    },
    swift_code: {
      type: String,
      required: function () {
        return this.method_type === 'Bank Transfer';
      },
    },
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
