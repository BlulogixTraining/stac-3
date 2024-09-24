const mongoose = require('mongoose');

// Define the Resources schema
const resourceSchema = new mongoose.Schema({
  resourceId: {
    type: String, 
    required: true,
    unique: true
  },

  resource_name: {
    type: String,
    required: true,
    trim: true,
  },
  resource_type: {
    type: String,
    required: true,
    enum: ['Page', 'API', 'Component'], // Example types
  },
  resource_path: {
    type: String,
    required: true,
    trim: true,
  },
  action: {
    type: [String],
    required:true,
    enum: ['view', 'edit', 'delete', 'create'], // Actions allowed on the resource
  },
  description: {
    type: String,
    required:true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updated_at` before save
resourceSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
