const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories } = require("../controller/category.controller");
const upload = require("../middleware/upload");

// Multer error handler
const handleUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
};

router.post("/create", handleUpload, createCategory);
router.get("/all", getAllCategories);

module.exports = router;
