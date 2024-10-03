// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentProcessing.js');

// Endpoint to process a payment
router.post('/process-payment', paymentController.processPayment);

module.exports = router;
