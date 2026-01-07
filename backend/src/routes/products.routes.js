import express from "express";
import {
  createProduct,
  getAllProducts,
  toggleAllPrices,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/all", getAllProducts);
router.get("/category/:categoryId", getProductsByCategory);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.patch("/toggle-all-prices", toggleAllPrices);

export default router;
