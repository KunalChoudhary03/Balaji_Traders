const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  toggleAllPrices,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");

router.post("/create", createProduct);
router.get("/all", getAllProducts);
router.get("/category/:categoryId", getProductsByCategory);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.patch("/toggle-all-prices", toggleAllPrices);

module.exports = router;
