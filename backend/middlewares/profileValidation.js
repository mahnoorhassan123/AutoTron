// middleware/validateRequest.js
exports.validateVendorProfile = (req, res, next) => {
    const { name, address, contact, operationalHours } = req.body;
  
    if (!name || !address || !contact) {
      return res
        .status(400)
        .json({ message: "Name, address, and contact are required fields" });
    }
  
    if (
      !operationalHours ||
      typeof operationalHours.open !== "string" ||
      typeof operationalHours.close !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Operational hours must include valid open and close times" });
    }
  
    next(); // Proceed to the next middleware/controller
};  