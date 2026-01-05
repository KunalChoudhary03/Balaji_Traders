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

// Routes
router.post("/create", upload.single('image'), createProduct);
router.get("/all", getAllProducts);
router.get("/category/:categoryId", getProductsByCategory);
router.patch("/price-toggle/:productId", toggleProductPrice);
router.patch("/toggle-all-prices", toggleAllPrices);

module.exports = router;
