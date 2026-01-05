const Product = require("../models/product.model");

// Add new product
const createProduct = async (req, res) => {
  try {
    const { name, image, category, variants } = req.body;

    if (!name || !image || !category || !variants || !variants.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({
      name,
      image,
      category,
      variants
    });

    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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

