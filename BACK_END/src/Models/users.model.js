const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    line1: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  role: {
    type: String,
    enum: ["Admin", "User", "Moderator"], // Include roles as needed
    default: "User",
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  },
  dateOfBirth: Date,
  profilePictureURL: String,
  outstandingBalance: {
    type: Number,
    default: 0.0,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  stripe_customer_id: {
    type: String,
    default : null, // This will store the Stripe customer ID
  },
  stripe_payment_method_id: {
    type: String,
    default:null , // This will store the default Stripe payment method ID
  },
  paymentMethods: [{
    paymentMethodId: String,
    brand: String,
    last4: String,
    exp_month: Number,
    exp_year: Number,
    // any other fields you need
}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: Date,
  subscriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'  // Reference to your Subscription model
  }],
});

const UsersModel = mongoose.model("Users", UserSchema);
module.exports = UsersModel;
