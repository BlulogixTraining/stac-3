const express = require('express');
const router = express.Router();
const { isAdmin, isUser } = require('../middleware/authorize');

const {
    getAllPayments,
    getPaymentMethods,
    getPaymentMethodById,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
  } = require("../controllers/payment.controller");


router.get('/getAllPayment', isAdmin, getAllPayments);
router.get('/getPaymentsOfUser/:userId', isAdmin, getPaymentMethods);
router.get('/getPayment/:id', isAdmin, getPaymentMethodById);
router.post('/createPayment', isAdmin, createPaymentMethod);
router.put('/updatePayment/:id', isAdmin, updatePaymentMethod);
router.delete('/deletePayment/:id', isAdmin, deletePaymentMethod);


module.exports = router;