const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories } = require("../controller/category.controller");

// Accept JSON body with image URL; no upload middleware
router.post("/create", createCategory);
router.get("/all", getAllCategories);

module.exports = router;
