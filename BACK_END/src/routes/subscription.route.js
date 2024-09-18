const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');

// Route to create a new subscription
router.post('/createsub', subscriptionController.createSubscription);

// Route to get a subscription by ID
router.get('/:id', subscriptionController.getSubscriptionById);

// Route to remove a product from a subscription
router.delete('/remove-product/:subscriptionId/:productId', subscriptionController.removeProductFromSubscription);

// Route to end a subscription (set status to inactive)
router.patch('/end/:subscriptionId', subscriptionController.endSubscription);

// Route to delete a subscription (optional)
router.delete('/:id', subscriptionController.deleteSubscription);

// Route to get all subscriptions for a user
router.get('/user/:userId', subscriptionController.getAllSubscriptionsForUser);

module.exports = router;
