const { getUserById } = require('../models/userModel');

const getRecommendations = (req, res) => {
  const { userId, hungerLevel } = req.body;

  const user = getUserById(userId);

  // Simulated AI logic
  const foodRecommendations = {
    low: ['Fruit Salad', 'Yogurt', 'Smoothie'],
    medium: ['Chicken Wrap', 'Grilled Sandwich', 'Rice Bowl'],
    high: ['Burger', 'Pizza', 'Biryani'],
  };

  let selected = [];
  if (hungerLevel <= 3) selected = foodRecommendations.low;
  else if (hungerLevel <= 7) selected = foodRecommendations.medium;
  else selected = foodRecommendations.high;

  res.json({
    userId,
    userName: user?.name || 'Anonymous',
    hungerLevel,
    recommendations: selected,
  });
};

module.exports = { getRecommendations };