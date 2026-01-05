const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  toggleProductPrice,
  toggleAllPrices,
} = require("../controller/product.controller");

const upload = require("../middleware/upload");

/**
 * MULTER ERROR HANDLER
 */
const handleUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Product upload error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Image upload failed",
      });
    }
    next();
  });
};

/**
 * ROUTES
 */

// Create product (Admin)
router.post("/create", handleUpload, createProduct);

// Get all products
router.get("/all", getAllProducts);

// Get products by category
router.get("/category/:categoryId", getProductsByCategory);

// Toggle price visibility (single product)
router.patch("/price-toggle/:productId", toggleProductPrice);

// Toggle price visibility (all products)
router.patch("/toggle-all-prices", toggleAllPrices);

module.exports = router;
