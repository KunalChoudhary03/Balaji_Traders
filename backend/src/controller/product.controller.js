const Product = require("../models/product.model");

/**
 * CREATE PRODUCT
 */
const createProduct = async (req, res) => {
  try {
    let { name, category, variants } = req.body;

    // Parse variants if sent as string (multipart/form-data)
    if (typeof variants === "string") {
      try {
        variants = JSON.parse(variants);
      } catch (err) {
        return res.status(400).json({ message: "Invalid variants format" });
      }
    }

    // Basic validations
    if (!name || !category || !variants || !variants.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Image must come from upload
    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    // Prevent duplicate product in same category
    const exists = await Product.findOne({ name, category });
    if (exists) {
      return res.status(409).json({ message: "Product already exists" });
    }

    // Normalize & validate variants
    const normalizedVariants = variants.map((v) => ({
      size: v.size,
      price: Number(v.price),
      showPrice: v.showPrice !== false, // default true
    }));

    const invalidVariant = normalizedVariants.some(
      (v) => !v.size || Number.isNaN(v.price)
    );

    if (invalidVariant) {
      return res
        .status(400)
        .json({ message: "Each variant must have size and price" });
    }

    const product = await Product.create({
      name,
      category,
      image: req.file.path, // Cloudinary URL
      variants: normalizedVariants,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * GET ALL PRODUCTS
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * GET PRODUCTS BY CATEGORY
 */
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ category: categoryId }).populate(
      "category"
    );

    res.status(200).json(products);
  } catch (error) {
    console.error("Get products by category error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * TOGGLE PRICE VISIBILITY (SINGLE PRODUCT)
 */
const toggleProductPrice = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.variants.forEach((v) => {
      v.showPrice = !v.showPrice;
    });

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product price visibility toggled",
      product,
    });
  } catch (error) {
    console.error("Toggle product price error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * TOGGLE PRICE VISIBILITY (ALL PRODUCTS)
 */
const toggleAllPrices = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    // Decide new state based on first variant
    const currentState = products[0].variants[0].showPrice;
    const newState = !currentState;

    for (const product of products) {
      product.variants.forEach((v) => {
        v.showPrice = newState;
      });
      await product.save();
    }

    res.status(200).json({
      success: true,
      message: `All prices ${newState ? "shown" : "hidden"}`,
      showPrice: newState,
    });
  } catch (error) {
    console.error("Toggle all prices error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  toggleProductPrice,
  toggleAllPrices,
};
