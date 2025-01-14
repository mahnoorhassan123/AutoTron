// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error(err.stack); // Log error details (optional)
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
};  