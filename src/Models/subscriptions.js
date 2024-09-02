const mongoose = require('mongoose');
const SubscriptionSchema = new mongoose.schema ({
  
    subscriptionId: {
      type: string,
      required: true,
      unique: true
    },
    user_id: { // Reference to the User document
      type: string,
      required: true
    },
    plan_id:{ // Reference to the Plan document
      type: string,
      required: true
    },
    start_date: {
      type: string,
      required: true
    },
    end_date: {
      type: string,
      required: true
    },
    status: {
      type: bool,
      required: true
    },
    payment_method: {
      type: string,
      required: true
    },
    price: {
      type: string,
      required: true
    },
    currency: {
      type: string,
      required: true
},


})
const SubscriptionsModel = mongoose.model("subscriptions", SubscriptionSchema);
module.exports = SubscriptionsModel;