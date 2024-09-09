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
    }
});
const UserSubscriptionsModel = mongoose.model("user_subscriptions", UserSubscriptionSchema);
module.exports = UserSubscriptionsModel;