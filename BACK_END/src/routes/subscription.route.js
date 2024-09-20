const express = require('express');
const router = express.Router();

const {
  createSubscription,
  getSubscriptionById,
  removeProductFromSubscription,
  endSubscription,
  deleteSubscription,
} = require('../controllers/subscription.controller');
const { isAdmin, isUser } = require('../middleware/authorize');
// Create a new subscription
router.post('/createsubscription',isAdmin, createSubscription); // POST /createsubscription

// Get a subscription by ID
router.get('/getsubscription/:id',isAdmin, getSubscriptionById); // GET /getsubscription/:id

// Remove a product from a subscription
router.delete('/removesubscriptionproduct/:subscriptionId/products/:productId',isAdmin, removeProductFromSubscription); // DELETE /removesubscriptionproduct/:subscriptionId/products/:productId

// End a subscription
router.patch('/endsubscription/:subscriptionId',isAdmin, endSubscription); // PATCH /endsubscription/:subscriptionId

// Delete a subscription
router.delete('/deletesubscription/:id',isAdmin, deleteSubscription); // DELETE /deletesubscription/:id

module.exports = router;

