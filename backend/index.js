const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');

const profileRouter = require('./routes/profileRouter');
const recommendationRoutes = require('./routes/recommendationRoutes');

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
app.use('/api/orders', orderRouter);

app.use('/api', profileRouter);
app.use('/api', recommendationRoutes);
// Connect to MongoDB
connectDB(); // Call the connection function only once

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});