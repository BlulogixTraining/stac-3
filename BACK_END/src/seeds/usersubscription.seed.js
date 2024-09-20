const mongoose = require('mongoose');
const UserSubscription = require('../Models/user_subscriptions');
require('dotenv').config();

const userSubscriptions = [
  {
    userId: 'user123OOP', // Replace with actual user IDs
    subscriptionId: 'sub123OOP' // Replace with actual subscription IDs
  },
  {
    userId: 'user124PPO',
    subscriptionId: 'sub124PPO'
  }
];

async function seedUserSubscriptions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await UserSubscription.insertMany(userSubscriptions);
    console.log('User Subscriptions seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding user subscriptions:', error);
    process.exit(1);
  }
}

seedUserSubscriptions();
