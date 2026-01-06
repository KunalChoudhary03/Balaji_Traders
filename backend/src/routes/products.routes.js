const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  toggleAllPrices,
} = require("../controller/product.controller");

router.post("/create", createProduct);
router.get("/all", getAllProducts);
router.patch("/toggle-all-prices", toggleAllPrices);

module.exports = router;
