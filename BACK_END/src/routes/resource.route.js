const express = require('express');
const router = express.Router();
const {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource
} = require('../controllers/resource.controller');

// Create a new resource
router.post('/resources', createResource);

// Get all resources
router.get('/resources', getAllResources);

// Get a resource by ID
router.get('/resources/:id', getResourceById);

// Update a resource
router.put('/resources/:id', updateResource);

// Delete a resource
router.delete('/resources/:id', deleteResource);

module.exports = router;
