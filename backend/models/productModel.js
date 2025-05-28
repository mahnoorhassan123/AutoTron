// backend/models/productModel.js
const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  hungerCategory: {
    type: String,
    enum: ['low', 'medium', 'high'], // 👈 Required for AI logic
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: '', // Optional: for image URL
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;