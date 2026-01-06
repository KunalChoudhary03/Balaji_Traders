import { useEffect, useState } from "react";
import { getCategories, getProducts, toggleAllPrices } from "../services/api";
import { toast } from "react-toastify";
import CategoryForm from "./CategoryForm";
import ProductForm from "./ProductForm";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([getCategories(), getProducts()]);
      setCategories(catRes.data);
      setProducts(prodRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage categories and products. Paste image URLs directly (no uploads).</p>
        </div>

        {loading && (
          <div className="mb-4 text-blue-600">Loading…</div>
        )}

        {/* Forms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <CategoryForm refresh={loadData} />
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <ProductForm categories={categories} refresh={loadData} />
          </div>
        </div>

        {/* Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Categories ({categories.length})</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {categories.map((c) => (
                <div key={c._id} className="border rounded-lg p-4 flex items-center gap-4">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-16 h-16 rounded object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/64";
                    }}
                  />
                  <div>
                    <div className="font-semibold">{c.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Products ({products.length})</h2>
              <button
                onClick={async () => {
                  try {
                    setLoading(true);
                    await toggleAllPrices();
                    toast.success("Toggled all prices");
                    await loadData();
                  } catch (e) {
                    console.error(e);
                    toast.error("Toggle failed");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Toggle All Prices
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {products.map((p) => (
                <div key={p._id} className="border rounded-lg p-4 flex gap-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 rounded object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/80";
                    }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-gray-600">{p.category?.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
