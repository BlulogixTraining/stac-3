const express = require('express');
const router = express.Router();

const {
  linkUserToSubscription,
  getAllSubscriptionsForUser,
  unlinkUserFromSubscription,
  getUsersCountAndIdsBySubscription,
} = require('../controllers/usersubscription.controller');

const { isAdmin, isUser } = require('../middleware/authorize');
// Subscribe a user to a subscription
router.post('/subscribe', linkUserToSubscription); // POST /subscribe

// Get all subscriptions for a user
router.get('/users/:userId/subscriptions', getAllSubscriptionsForUser); // GET /users/:userId/subscriptions

// Unsubscribe a user from a subscription
router.delete('/unsubscribe/:userId/:subscriptionId', unlinkUserFromSubscription); // DELETE /unsubscribe/:userId/:subscriptionId

// Get user count and IDs by subscription
router.get('/subscriptions/:subscriptionId/users', getUsersCountAndIdsBySubscription); // GET /subscriptions/:subscriptionId/users

module.exports = router;
