const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  productId: {
    type: String, // Use ObjectId for unique identifier
    required: true,
    unique: true
  },
  
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        default: '',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});


module.exports = mongoose.model('Product', productSchema);