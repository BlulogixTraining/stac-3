const express = require('express');
const router = express.Router();
const {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource
} = require('../controllers/resource.controller');
const { isAdmin } = require('../middleware/authorize');

// Create a new resource
router.post('/addResources',isAdmin, createResource);

// Get all resources
router.get('/getResources',isAdmin, getAllResources);

// Get a resource by ID
router.get('/getResource/:id',isAdmin, getResourceById);

// Update a resource
router.put('/updateResources/:id',isAdmin, updateResource);

// Delete a resource
router.delete('/deleteResources/:id',isAdmin, deleteResource);

module.exports = router;
