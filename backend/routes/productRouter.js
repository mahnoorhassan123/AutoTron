const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productMiddleware = require('../middlewares/productMiddleware');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

// Add a new product with validation middleware
router.post("/products", productMiddleware.validateProduct, async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    try {
        const newProduct = new Product({ name, description, price, category, stock });
        await newProduct.save();
        res.status(201).json(newProduct); // Respond with the created product
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Server error");
    }
});

// Update a product with validation middleware
router.put("/products/:id", productMiddleware.validateProduct, async (req, res) => {
    try {
      const { id } = req.params; // Extract the ID from params
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(updatedProduct); // Respond with the updated product
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send("Server error");
    }
});  

// Delete a product by ID
router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Get all products
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products); // Respond with the list of products
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Server error");
    }
});

// Generate product stock report using the controller
router.get('/products/report', productController.generateReport);

module.exports = router;
