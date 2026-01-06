import { useState } from "react";
import { createProduct } from "../services/api";
import { toast } from "react-toastify";

export default function ProductForm({ categories, refresh }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [variants, setVariants] = useState([
    { size: "", price: "" },
  ]);

  const addVariant = () => {
    setVariants([...variants, { size: "", price: "" }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !category || !image) {
      toast.warn("All fields required");
      return;
    }

    const cleanVariants = variants.filter(
      (v) => v.size && v.price
    );

    if (!cleanVariants.length) {
      toast.warn("At least one variant required");
      return;
    }

    try {
      await createProduct({
        name,
        category,
        image,
        variants: cleanVariants.map((v) => ({
          size: v.size,
          price: Number(v.price),
          showPrice: true,
        })),
      });

      toast.success("Product Added");

      setName("");
      setCategory("");
      setImage("");
      setVariants([{ size: "", price: "" }]);
      refresh();
    } catch (err) {
      toast.error("Failed to create product");
    }
  };

  return (
    <form onSubmit={submitHandler} className="p-4 border rounded">
      <h2 className="font-bold mb-3">Add Product</h2>

      <input
        className="w-full border p-2 mb-2"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="w-full border p-2 mb-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        className="w-full border p-2 mb-2"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      {/* VARIANTS */}
      <div className="mb-3">
        <p className="font-semibold mb-2">Variants</p>

        {variants.map((v, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className="border p-2 flex-1"
              placeholder="Size (e.g. 1 inch)"
              value={v.size}
              onChange={(e) =>
                updateVariant(i, "size", e.target.value)
              }
            />
            <input
              type="number"
              className="border p-2 w-32"
              placeholder="Price"
              value={v.price}
              onChange={(e) =>
                updateVariant(i, "price", e.target.value)
              }
            />

            {variants.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariant(i)}
                className="text-red-600"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addVariant}
          className="text-blue-600 text-sm"
        >
          + Add Variant
        </button>
      </div>

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Save Product
      </button>
    </form>
  );
}
