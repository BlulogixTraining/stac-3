const express = require('express');
const router = express.Router();

const {
  getUsersCountAndIdsBySubscription,
  linkUserToSubscription,
  getAllSubscriptionsForUser,
  unlinkUserFromSubscription,
  handleRenewals,
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

// Optionally, add a route to handle renewals if you want to call it manually
router.post('/handle-renewals', handleRenewals);
module.exports = router;
