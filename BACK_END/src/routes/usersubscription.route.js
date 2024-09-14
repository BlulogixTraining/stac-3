const express = require('express');
const router = express.Router();

const {
  linkUserToSubscription,
  getAllSubscriptionsForUser,
  unlinkUserFromSubscription,
} = require('../controllers/usersubscription.controller');

// Link a user to a subscription
router.post('/user-subscriptions', linkUserToSubscription);

// Get all subscriptions for a user
router.get('/user-subscriptions/:userId', getAllSubscriptionsForUser);

// Unlink a user from a subscription
router.delete('/user-subscriptions/:userId/:subscriptionId', unlinkUserFromSubscription);

module.exports = router;
