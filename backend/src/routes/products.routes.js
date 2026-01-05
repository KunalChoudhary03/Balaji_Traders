const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  toggleProductPrice,
  toggleAllPrices
} = require("../controller/product.controller");
const upload = require("../middleware/upload");

// Wrap multer to catch upload errors and return a clear message
const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Product upload error:', err);
      return res.status(400).json({ message: err.message || 'Image upload failed' });
    }
    next();
  });
};

// Routes
router.post("/create", handleUpload, createProduct);
router.get("/all", getAllProducts);
router.get("/category/:categoryId", getProductsByCategory);
router.patch("/price-toggle/:productId", toggleProductPrice);
router.patch("/toggle-all-prices", toggleAllPrices);

module.exports = router;
