// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const {
    createPaymentMethod,
    getAllPaymentMethods,
    getPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod

}  =require('../controllers/paymentMethod.controller.js');

// Define route to create a payment method for a user
router.post('/create-payment-method', createPaymentMethod);

router.get('/get-payment-methods/:userId', getAllPaymentMethods);

// Get a specific payment method
router.get('/get-payment-method/:userId/:paymentMethodId', getPaymentMethod);

// Update a specific payment method
router.put('/update-payment-method/:userId/:paymentMethodId', updatePaymentMethod);

// Delete a specific payment method
router.delete('/delete-payment-method/:userId/:paymentMethodId', deletePaymentMethod);

module.exports = router;
