const Category = require("../models/category.model");

// Add new category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({ message: "Name and image file are required" });
    }

    const category = new Category({
      name,
      description: description || "",
      image: req.file.secure_url || req.file.path
    });

    await category.save();
    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    console.log("Fetching all categories...");
    const categories = await Category.find();
    console.log(`Found ${categories.length} categories`);
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  createCategory,
  getAllCategories
};
