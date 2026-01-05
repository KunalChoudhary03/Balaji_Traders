const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image upload is required" });
    }

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      description: description || "",
      image: req.file.path, // Cloudinary URL
    });

    res.status(201).json({
      success: true,
      message: "Category created",
      category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
