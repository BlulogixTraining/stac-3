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
    { type: String, ref: "Subscriptions" } // Updated to use String IDs
  ],
});

const UsersModel = mongoose.model("Users", UserSchema);
module.exports = UsersModel;
