import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../services/api";
import { toast } from "react-toastify";

export default function ProductForm({ categories, refresh, editingProduct, onCancelEdit }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [onOrder, setOnOrder] = useState(false);
  const [variants, setVariants] = useState([
    { size: "", price: "" },
  ]);

  // Populate form when editing
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCategory(editingProduct.category?._id || editingProduct.category);
      setImage(editingProduct.image);
      setOnOrder(editingProduct.onOrder || false);
      setVariants(editingProduct.variants.map(v => ({ size: v.size, price: v.price })));
    }
  }, [editingProduct]);

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

  const resetForm = () => {
    setName("");
    setCategory("");
    setImage("");
    setOnOrder(false);
    setVariants([{ size: "", price: "" }]);
    if (onCancelEdit) onCancelEdit();
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

      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        toast.success("Product Updated");
      } else {
        await createProduct(productData);
        toast.success("Product Added");
      }

      resetForm();
      refresh();
    } catch (err) {
      toast.error(editingProduct ? "Failed to update product" : "Failed to create product");
    }
  };

  return (
    <form onSubmit={submitHandler} className="p-4 sm:p-6 border rounded-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>
        {editingProduct && (
          <button
            type="button"
            onClick={resetForm}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        <input
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* On Order Toggle */}
        <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div>
            <label className="font-semibold text-gray-700 block">On Order Status</label>
            <p className="text-sm text-gray-500">Show "On Order" badge on product card</p>
          </div>
          <button
            type="button"
            onClick={() => setOnOrder(!onOrder)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              onOrder ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                onOrder ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

      
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-gray-700">Variants</p>
            <button
              type="button"
              onClick={addVariant}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              + Add Variant
            </button>
          </div>

          <div className="space-y-2">
            {variants.map((v, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="border border-gray-300 rounded-lg p-2 flex-1 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Size (e.g. 1 inch)"
                  value={v.size}
                  onChange={(e) =>
                    updateVariant(i, "size", e.target.value)
                  }
                />
                <input
                  type="number"
                  className="border border-gray-300 rounded-lg p-2 w-32 focus:ring-2 focus:ring-indigo-500"
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
                    className="text-red-600 hover:text-red-800 px-3"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          {editingProduct ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  );
}
