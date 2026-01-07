import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../services/api";
import { toast } from "react-toastify";

export default function ProductForm({
  categories,
  refresh,
  editingProduct,
  onCancelEdit,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [onOrder, setOnOrder] = useState(false);
  const [variants, setVariants] = useState([{ size: "", price: "" }]);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCategory(editingProduct.category?._id || editingProduct.category);
      setImage(editingProduct.image);
      setOnOrder(editingProduct.onOrder || false);
      setVariants(
        editingProduct.variants.map((v) => ({
          size: v.size,
          price: v.price,
        }))
      );
    }
  }, [editingProduct]);

  const addVariant = () =>
    setVariants([...variants, { size: "", price: "" }]);

  const removeVariant = (index) =>
    setVariants(variants.filter((_, i) => i !== index));

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setImage("");
    setOnOrder(false);
    setVariants([{ size: "", price: "" }]);
    onCancelEdit?.();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !category || !image) {
      toast.warn("All fields required");
      return;
    }

    const cleanVariants = variants.filter((v) => v.size && v.price);
    if (!cleanVariants.length) {
      toast.warn("At least one variant required");
      return;
    }

    try {
      const productData = {
        name,
        category,
        image,
        onOrder,
        variants: cleanVariants.map((v) => ({
          size: v.size,
          price: Number(v.price),
          showPrice: true,
        })),
      };

      editingProduct
        ? await updateProduct(editingProduct._id, productData)
        : await createProduct(productData);

      toast.success(editingProduct ? "Product Updated" : "Product Added");
      resetForm();
      refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 lg:p-8 space-y-6 max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>

        {editingProduct && (
          <button
            type="button"
            onClick={resetForm}
            className="text-sm text-red-500 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Basic Info */}
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full border rounded-lg px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
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
          className="sm:col-span-2 w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      {/* On Order */}
      <div className="flex items-center justify-between bg-indigo-50 border rounded-xl p-4">
        <div>
          <p className="font-semibold text-gray-800">On Order</p>
          <p className="text-xs text-gray-500">
            Display “On Order” badge on product
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOnOrder(!onOrder)}
          className={`relative w-14 h-8 rounded-full transition ${
            onOrder ? "bg-green-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 h-6 w-6 bg-white rounded-full transition ${
              onOrder ? "left-7" : "left-1"
            }`}
          />
        </button>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-800">Variants</p>
          <button
            type="button"
            onClick={addVariant}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            + Add Variant
          </button>
        </div>

        {variants.map((v, i) => (
          <div
            key={i}
            className="grid gap-2 sm:grid-cols-[1fr_140px_auto] items-center"
          >
            <input
              className="border rounded-lg px-4 py-2 text-sm"
              placeholder="Size (e.g. 1 inch)"
              value={v.size}
              onChange={(e) =>
                updateVariant(i, "size", e.target.value)
              }
            />

            <input
              type="number"
              className="border rounded-lg px-4 py-2 text-sm"
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
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Submit */}
      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
        {editingProduct ? "Update Product" : "Save Product"}
      </button>
    </form>
  );
}
