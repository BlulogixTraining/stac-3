const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controllers/products.controller'); // Adjust path as needed

// Create a new product
router.post('/create', createProduct);

// Get all products
router.get('/getall', getAllProducts);

// Get a product by ID
router.get('/getby/:id', getProductById);

// Update a product by ID
router.put('/updateby/:id', updateProductById);

// Delete a product by ID
router.delete('/deleteb/:id', deleteProductById);

module.exports = router;
