import { useState } from "react";
import { createCategory } from "../services/api";
import { toast } from "react-toastify";

export default function CategoryForm({ refresh }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      toast.warn("Name & Image URL required");
      return;
    }

    try {
      await createCategory({ name, description, image });
      toast.success("Category Added");
      setName("");
      setDescription("");
      setImage("");
      refresh();
    } catch (err) {
      toast.error("Failed to create category");
    }
  };

  return (
    <form onSubmit={submitHandler} className="p-4 border rounded">
      <h2 className="font-bold mb-3">Add Category</h2>

      <input
        className="w-full border p-2 mb-2"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-2"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Category
      </button>
    </form>
  );
}
