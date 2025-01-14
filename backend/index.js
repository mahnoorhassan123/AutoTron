const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const profileRouter = require('./routes/profileRouter');
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler); // Register after all routes

require('dotenv').config();
const connectDB = require('./models/db'); // Import the database connection

const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Test Route
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Routes
app.use('/auth', authRouter);
app.use('/api', productRouter);
app.use('/profile', profileRouter);
// Connect to MongoDB
connectDB(); // Call the connection function only once

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
