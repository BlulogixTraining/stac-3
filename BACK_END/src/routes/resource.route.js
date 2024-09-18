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
router.post('/resources',isAdmin, createResource);

// Get all resources
router.get('/resources',isAdmin, getAllResources);

// Get a resource by ID
router.get('/resources/:id',isAdmin, getResourceById);

// Update a resource
router.put('/resources/:id',isAdmin, updateResource);

// Delete a resource
router.delete('/resources/:id',isAdmin, deleteResource);

module.exports = router;
