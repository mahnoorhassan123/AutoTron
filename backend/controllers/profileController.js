// controllers/vendorProfileController.js
const VendorProfile = require("../models/vendorProfile");

// Fetch vendor profile by ID
exports.getVendorProfile = async (req, res, next) => {
  try {
    const vendorProfile = await VendorProfile.findById(req.params.vendorId);
    if (!vendorProfile) {
      return res.status(404).json({ message: "Vendor profile not found" });
    }
    res.status(200).json(vendorProfile);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Update vendor profile
exports.updateVendorProfile = async (req, res, next) => {
  const { name, address, contact, operationalHours, paymentIntegration } =
    req.body;

  try {
    const updatedProfile = await VendorProfile.findByIdAndUpdate(
      req.params.vendorId,
      {
        name,
        address,
        contact,
        operationalHours,
        paymentIntegration,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Vendor profile not found" });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Create a new vendor profile
exports.createVendorProfile = async (req, res, next) => {
  const { name, address, contact, operationalHours, paymentIntegration } =
    req.body;

  try {
    const newProfile = new VendorProfile({
      name,
      address,
      contact,
      operationalHours,
      paymentIntegration,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};