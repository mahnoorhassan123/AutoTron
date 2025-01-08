const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database', {
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed', err.message);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectDB;
