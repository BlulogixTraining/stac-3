const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: Date,

  subscriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
  ],

  role: {
    type: String,
    enum: ["Admin", "User", "Moderator"], // Add roles as needed
    default: "User",
}

});

const UsersModel = mongoose.model("Users", UserSchema);
module.exports = UsersModel;
