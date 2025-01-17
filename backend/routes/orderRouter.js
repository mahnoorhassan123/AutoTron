// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Mock data for orders (can be replaced with a database in the future)
let orders = [
  { id: 1, product: 'Product A', quantity: 2, status: 'Pending', customer: 'Customer 1' },
  { id: 2, product: 'Product B', quantity: 1, status: 'Shipped', customer: 'Customer 2' },
  { id: 3, product: 'Product C', quantity: 3, status: 'Delivered', customer: 'Customer 3' },
  { id: 4, product: 'Product D', quantity: 2, status: 'Pending', customer: 'Customer 1' },

];

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Update order status
// Update order status
router.put('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);  // ensure the ID is parsed as an integer
  const { status } = req.body;

  let order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;  // Update order status
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});



module.exports = router;
