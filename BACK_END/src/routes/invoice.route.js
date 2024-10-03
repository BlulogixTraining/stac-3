// routes/invoiceRoutes.js
const express = require('express');
const { sendInvoice } = require('../controllers/invoince.controller');

const router = express.Router();

router.post('/send-invoice', sendInvoice);

module.exports = router;
