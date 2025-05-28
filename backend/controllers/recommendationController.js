const Product = require('../models/productModel');

const getRecommendations = async (req, res) => {
  const { hungerLevel, priceRange } = req.body;

  let hungerCategory = '';
  if (hungerLevel <= 3) hungerCategory = 'low';
  else if (hungerLevel <= 7) hungerCategory = 'medium';
  else hungerCategory = 'high';

  try {
    // Build query filter
    const query = {
      hungerCategory,
      price: { $gte: priceRange.min, $lte: priceRange.max }
    };

    const products = await Product.find(query);

    // Return only product names (or you can send full product data if needed)
    const recommendations = products.map(p => p.name);

    res.json({ recommendations });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Server error fetching recommendations' });
  }
};

module.exports = { getRecommendations };