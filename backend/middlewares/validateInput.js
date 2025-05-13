// backend/middleware/validateInput.js

const validateInput = (req, res, next) => {
    const { userId, hungerLevel } = req.body;
  
    if (!userId || typeof hungerLevel !== 'number') {
      return res.status(400).json({ message: 'User ID and hunger level are required' });
    }
  
    if (hungerLevel < 1 || hungerLevel > 10) {
      return res.status(400).json({ message: 'Hunger level must be between 1 and 10' });
    }
  
    next(); // ✅ Continue to controller
  };
  
  module.exports = validateInput;  