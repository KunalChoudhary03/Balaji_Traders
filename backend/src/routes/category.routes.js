const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createCategory, getAllCategories } = require("../controller/category.controller");

// Routes
router.post("/create", upload.single('image'), createCategory);
router.get("/all", getAllCategories);

module.exports = router;
