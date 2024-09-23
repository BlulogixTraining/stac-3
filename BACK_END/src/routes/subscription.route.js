const express = require('express');
const router = express.Router();

const {
  createSubscription,
  getSubscriptionById,
  removeProductFromSubscription,
  endSubscription,
  deleteSubscription,
} = require('../controllers/subscription.controller');

// Create a new subscription
router.post('/subscriptions', createSubscription);

// Get a subscription by ID
router.get('/subscriptions/:id', getSubscriptionById);

// Remove a product from a subscription
router.delete('/subscriptions/:subscriptionId/products/:productId', removeProductFromSubscription);

// End a subscription
router.patch('/subscriptions/:subscriptionId/end', endSubscription);

// Delete a subscription
router.delete('/subscriptions/:id', deleteSubscription);

module.exports = router;

