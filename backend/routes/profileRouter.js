const express = require("express");
const router = express.Router();
const {
  getVendorProfile,
  updateVendorProfile,
  createVendorProfile,
} = require("../controllers/profileController");
const { validateVendorProfile } = require("../middlewares/profileValidation");

// Get a vendor profile by ID
router.get("/profile/:vendorId", getVendorProfile);

// Update vendor profile
router.put("/profile/:vendorId", validateVendorProfile, updateVendorProfile);

// Create a new vendor profile (for testing purposes)
router.post("/profile", validateVendorProfile, createVendorProfile);

module.exports = router;