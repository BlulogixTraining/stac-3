const Resource = require('../Models/resources');

// Create a new resource
const createResource = async (req, res) => {
  const { resourceId, name, type, url, description } = req.body;

  if (!resourceId || !name || !type || !url) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newResource = new Resource({
      resourceId,
      name,
      type,
      url,
      description,
    });

    await newResource.save();
    res.status(201).json({ message: 'Resource created successfully', resource: newResource });
  } catch (error) {
    res.status(500).json({ message: 'Error creating resource', error });
  }
};

// Get all resources
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json({ resources });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources', error });
  }
};

// Get a resource by ID
const getResourceById = async (req, res) => {
  const { id } = req.params;
  try {
    const resource = await Resource.findById(id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json({ resource });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resource', error });
  }
};

// Update a resource
const updateResource = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedResource = await Resource.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedResource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json({ message: 'Resource updated successfully', resource: updatedResource });
  } catch (error) {
    res.status(500).json({ message: 'Error updating resource', error });
  }
};

// Delete a resource
const deleteResource = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedResource = await Resource.findByIdAndDelete(id);
    if (!deletedResource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error });
  }
};

module.exports = {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
};
