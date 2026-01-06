const Product = require("../models/product.model");

exports.createProduct = async (req, res) => {
  try {
    let { name, category, image, variants, onOrder } = req.body;

    if (!name || !category || !image || !variants) {
      return res.status(400).json({ message: "All fields required" });
    }
    if (typeof variants === "string") {
      variants = JSON.parse(variants);
    }
    if (!Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({ message: "Variants required" });
    }

    const cleanVariants = variants.map(v => ({
      size: v.size,
      price: Number(v.price),
      showPrice: v.showPrice !== false,
    }));

    const invalid = cleanVariants.some(
      v => !v.size || Number.isNaN(v.price)
    );

    if (invalid) {
      return res.status(400).json({ message: "Invalid variants data" });
    }

    const product = await Product.create({
      name,
      category,
      image,
      variants: cleanVariants,
      onOrder: onOrder || false,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET ALL PRODUCTS
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET PRODUCTS BY CATEGORY
 */
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId }).populate("category");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE PRODUCT
 */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, category, image, variants, onOrder } = req.body;

    if (typeof variants === "string") {
      variants = JSON.parse(variants);
    }

    const cleanVariants = variants.map(v => ({
      size: v.size,
      price: Number(v.price),
      showPrice: v.showPrice !== false,
    }));

    const product = await Product.findByIdAndUpdate(
      id,
      { name, category, image, variants: cleanVariants, onOrder: onOrder || false },
      { new: true, runValidators: true }
    ).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE PRODUCT
 */
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * TOGGLE PRICE (ALL PRODUCTS)
 */
exports.toggleAllPrices = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    const firstVariant = products.find(p => p.variants.length)?.variants[0];
    if (!firstVariant) {
      return res.status(400).json({ message: "No variants found" });
    }

    const newState = !firstVariant.showPrice;

    await Product.updateMany(
      {},
      { $set: { "variants.$[].showPrice": newState } }
    );

    res.json({
      success: true,
      showPrice: newState,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
