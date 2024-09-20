const mongoose = require('mongoose');
const Subscription = require('../Models/subscriptions');
require('dotenv').config();

const subscriptions = [
  {
    subscriptionId: 'sub123OOP',
    products: ['prod123OOP'], // Add product IDs
    start_date: new Date(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days later
    status: 'active',
    payment_method: 'credit_card',
    price: '49.99',
    currency: 'USD'
  },
  {
    subscriptionId: 'sub124PPO',
    products: ['prod124PPO'], // Add product IDs
    start_date: new Date(),
    status: 'inactive',
    payment_method: 'paypal',
    price: '19.99',
    currency: 'EUR'
  }
];

async function seedSubscriptions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Subscription.insertMany(subscriptions);
    console.log('Subscriptions seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding subscriptions:', error);
    process.exit(1);
  }
}

seedSubscriptions();
