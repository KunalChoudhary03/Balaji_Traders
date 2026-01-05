const Category = require("../models/category.model");

// Create category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!req.file) return res.status(400).json({ message: "Image upload is required" });

    const exists = await Category.findOne({ name });
    if (exists) return res.status(409).json({ message: "Category already exists" });

    const category = await Category.create({
      name,
      description: description || "",
      image: req.file.path, // Cloudinary URL
    });

    res.status(201).json({ success: true, message: "Category created", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createCategory, getAllCategories };
