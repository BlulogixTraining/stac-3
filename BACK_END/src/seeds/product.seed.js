const mongoose = require('mongoose');
const Product = require('../Models/products');
require('dotenv').config();

const products = [
  {
    productId: 'prod123OOP',
    name: 'Product One',
    description: 'Description for Product One',
    price: 19.99,
    category: 'Category One',
    stock: 10,
    images: [
      { url: 'http://example.com/image1.jpg', alt: 'Image 1' },
      { url: 'http://example.com/image2.jpg', alt: 'Image 2' }
    ],
  },
  {
    productId: 'prod124PPO',
    name: 'Product Two',
    description: 'Description for Product Two',
    price: 29.99,
    category: 'Category Two',
    stock: 20,
    images: [
      { url: 'http://example.com/image3.jpg', alt: 'Image 3' },
    ],
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.insertMany(products);
    console.log('Products seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
