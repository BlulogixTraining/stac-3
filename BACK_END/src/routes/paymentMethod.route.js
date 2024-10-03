// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const {
    createPaymentMethod
}  =require('../controllers/paymentMethod.controller.js');

// Define route to create a payment method for a user
router.post('/create-payment-method', createPaymentMethod);

module.exports = router;
