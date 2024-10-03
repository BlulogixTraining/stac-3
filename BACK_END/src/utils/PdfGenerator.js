// utils/pdfGenerator.js
const PDFDocument = require('pdfkit');

exports.generateInvoicePDF = (invoiceData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData.toString('base64')); // Return PDF as base64 for email attachment
    });

    // Customize your PDF content using `invoiceData`
    doc.text(`Invoice for: ${invoiceData.customerName}`);
    doc.text(`Amount: ${invoiceData.amount}`);
    doc.text(`Invoice Date: ${invoiceData.invoiceDate}`);
    doc.text(`Due Date: ${invoiceData.dueDate}`);

    // Add more fields as necessary for your invoice
    doc.end();
  });
};
