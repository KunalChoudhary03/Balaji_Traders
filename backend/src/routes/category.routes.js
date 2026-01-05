const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createCategory,
  getAllCategories,
} = require("../controller/category.controller");

// Multer error handler wrapper
const handleUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Category upload error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Image upload failed",
      });
    }
    next();
  });
};

// Routes
router.post("/create", handleUpload, createCategory);
router.get("/all", getAllCategories);

module.exports = router;
