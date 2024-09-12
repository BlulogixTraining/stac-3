const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for unique identifier
    required: true,
    unique: true
  },
  user_id: { // Reference to the User document
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Reference to Users collection
    required: true
  },
  plan_id: { // Reference to the Plan document (if you have a Plan schema)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan', // Reference to Plan collection (adjust if you have different schema name)
    required: true
  },
  start_date: {
    type: Date, // Use Date type for date fields
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
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
