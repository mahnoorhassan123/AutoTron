// productMiddleware.js
exports.validateProduct = (req, res, next) => {
  const { name, description, price, category, stock } = req.body;

  if (!name || !description || !price || !category || !stock) {
    return res.status(400).json({ error: 'All fields are required: name, description, price, category, stock' });
  }

  // Additional validation for price and stock could go here
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }

  if (typeof stock !== 'number' || stock < 0) {
    return res.status(400).json({ error: 'Stock must be a non-negative number' });
  }

  next(); // Proceed to the controller if validation passes
};
