const mongoose = require('mongoose');
const UserSubscriptionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "users"
    },
    subscriptionId: {
        type: String,
        required: true,
        ref: "subscriptions"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    autoRenewal: 
      { type: Boolean, default: true },  // Auto-renewal flag
    
    nextRenewalDate: 
      { type: Date, required: true },  // Next renewal date
});
const UserSubscriptionsModel = mongoose.model("user_subscriptions", UserSubscriptionSchema);
module.exports = UserSubscriptionsModel;
