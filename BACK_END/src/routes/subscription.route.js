const express = require('express');
const router = express.Router();
const {
  createSubscription,
  viewSubscriptions,
  unsubscribe,
} = require('../controllers/subscription.controller'); // Adjust path as needed

// Create a new subscription
router.post('/subscribe', createSubscription);

// View all subscriptions for a user
router.get('/subscriptions/:user_id', viewSubscriptions);

// Unsubscribe (delete a subscription)
router.delete('/unsubscribe/:subscriptionId', unsubscribe);

module.exports = router;
