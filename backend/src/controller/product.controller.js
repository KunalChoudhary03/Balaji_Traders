const Product = require("../models/product.model");

// Add new product
const createProduct = async (req, res) => {
  try {
    let { name, category, variants } = req.body;

    // Parse variants if sent as JSON string (multipart/form-data case)
    if (typeof variants === "string") {
      try {
        variants = JSON.parse(variants);
      } catch (err) {
        return res.status(400).json({ message: "Invalid variants format" });
      }
    }

    const image = req.file?.secure_url || req.file?.path || req.body.image;

    if (!name || !image || !category || !variants || !variants.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize variants: ensure price is number and showPrice defaults true
    const normalizedVariants = variants.map((v) => ({
      size: v.size,
      price: Number(v.price),
      showPrice: v.showPrice !== false
    }));

    if (normalizedVariants.some(v => !v.size || Number.isNaN(v.price))) {
      return res.status(400).json({ message: "Variant size and price are required" });
    }

    const product = new Product({
      name,
      image,
      category,
      variants: normalizedVariants
    });

    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId }).populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Toggle price visibility
const toggleProductPrice = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.variants.forEach(v => v.showPrice = !v.showPrice); // optional if per variant price toggle
    await product.save();

    res.status(200).json({ message: "Price toggled", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Toggle all products price visibility
const toggleAllPrices = async (req, res) => {
  try {
    const products = await Product.find();
    
    // Check current state of first product to decide toggle direction
    const currentState = products[0]?.variants[0]?.showPrice || false;
    const newState = !currentState;
    
    // Update all products
    for (const product of products) {
      product.variants.forEach(v => v.showPrice = newState);
      await product.save();
    }

    res.status(200).json({ 
      message: `All prices ${newState ? 'shown' : 'hidden'}`, 
      showPrice: newState 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports ={
  createProduct,
  getAllProducts,
  getProductsByCategory,
  toggleProductPrice,
  toggleAllPrices
}

