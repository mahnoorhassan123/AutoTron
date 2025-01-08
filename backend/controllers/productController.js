const Product = require('../models/productModel');
// Add a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  
  if (!name || !description || !price || !category || !stock) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Error adding product', details: error.message });
  }
};


// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error updating product', details: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product', details: error.message });
  }
};

// View all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    // Optionally map the response to include `id`:
    const formattedProducts = products.map((product) => ({
      ...product,
      id: product._id, // Map _id to id if frontend expects `id`
    }));
    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products", details: error.message });
  }
};

// Generate report based on products and stock levels
const PDFDocument = require('pdfkit'); // Import PDFKit

exports.generateReport = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } });

    // Initialize a PDF document
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="product_report.pdf"');

    // Write to PDF
    doc.text("Product Report", { align: "center", fontSize: 20 });
    doc.text(`Total Products: ${totalProducts}`);
    doc.text(`Low Stock Count: ${lowStockProducts.length}`);
    doc.moveDown();

    doc.text("Low Stock Products:", { underline: true });
    lowStockProducts.forEach((product, index) => {
      doc.text(`${index + 1}. ${product.name} - Stock: ${product.stock}`);
    });

    // Finalize the PDF and send it
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Error generating report", details: error.message });
  }
};
