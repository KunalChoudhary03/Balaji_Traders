const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories } = require("../controller/category.controller");

// Routes
router.post("/create", createCategory);
router.get("/all", getAllCategories);

module.exports = router;
