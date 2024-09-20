const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controllers/products.controller'); // Adjust path as needed

const { isAdmin, isUser } = require('../middleware/authorize');

// Create a new product
router.post('/createproduct' ,isAdmin, createProduct); // POST /createproduct

// Get all products
router.get('/getallproducts',isAdmin, getAllProducts); // GET /getallproducts

// Get a product by ID
router.get('/getproduct/:id',isAdmin, getProductById); // GET /getproduct/:id

// Update a product by ID
router.put('/updateproduct/:id',isAdmin, updateProductById); // PUT /updateproduct/:id

// Delete a product by ID
router.delete('/deleteproduct/:id',isAdmin, deleteProductById); // DELETE /deleteproduct/:id

module.exports = router;
