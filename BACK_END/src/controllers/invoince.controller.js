// controllers/invoiceController.js
const sendEmail = require('../services/nodeMailer');

exports.sendInvoice = async (req, res) => {
  const { userId, invoiceData } = req.body; // Assume `invoiceData` contains all the invoice details

  try {
    // Send email with invoice
    const emailConfig = {
      from: process.env.USER_EMAIL,
      to: req.body.toEmail, // Email of the recipient
      subject: 'Your Invoice',
      text: 'Please find your invoice attached.',
      html: '<b>Attached is your invoice for the recent transaction</b>', // Optional HTML content
      invoiceData: invoiceData // This is the data passed to the PDF generator
    };

    const emailResult = await sendEmail(emailConfig);
    res.status(200).json({ success: true, emailResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
