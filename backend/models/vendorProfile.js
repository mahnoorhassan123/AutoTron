// models/VendorProfile.js
const mongoose = require("mongoose");

const VendorProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  operationalHours: {
    open: { type: String, required: true },
    close: { type: String, required: true },
  },
  paymentIntegration: {
    jazzCashEnabled: { type: Boolean, default: false },
    easyPaisaEnabled: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model("VendorProfile", VendorProfileSchema);