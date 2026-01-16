import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  price: { type: Number, required: true },
  showPrice: { type: Boolean, default: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String, required: true }, // 👈 Image URL only
    variants: [variantSchema],
    productStatus: { type: String, enum: ['normal', 'on-order', 'top-seller', 'dispatch'], default: 'normal' },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
