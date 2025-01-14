// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: String,
  customerName: String,
  address: String,
  quantity: Number,
  totalPrice: Number,
  status: { type: String, default: 'Pending' }, // Order status (Pending, Completed, etc.)
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
