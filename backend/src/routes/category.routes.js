const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createCategory, getAllCategories } = require("../controller/category.controller");

// Wrap multer to catch upload errors and return a clear message
const handleUpload = (req, res, next) => {
	upload.single('image')(req, res, (err) => {
		if (err) {
			console.error('Category upload error:', err);
			return res.status(400).json({ message: err.message || 'Image upload failed' });
		}
		next();
	});
};

// Routes
router.post("/create", handleUpload, createCategory);
router.get("/all", getAllCategories);

module.exports = router;
