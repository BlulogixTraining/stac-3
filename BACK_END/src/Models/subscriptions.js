const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  subscriptionId: {
    type: String, 
    required: true,
    unique: true
  },
  user_id: { 
    type: String,
    ref: 'Users', 
    required: true
  },
  products: [{ 
    type: String,
    ref: 'Products' 
  }],
  start_date: {
    type: Date, 
    required: true
  },
  end_date: {
    type: Date,
    default: null 
  },
  status: {
    type: String, 
    enum: ['active', 'inactive'], 
    required: true
  },
  payment_method: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  }
});

const SubscriptionsModel = mongoose.model('Subscriptions', SubscriptionSchema);
module.exports = SubscriptionsModel;
