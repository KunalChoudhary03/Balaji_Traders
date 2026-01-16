import { useEffect, useState } from "react";
import {
  getCategories,
  getProducts,
  toggleProductPrices,
  deleteProduct,
} from "../services/api";
import { toast } from "react-toastify";
import CategoryForm from "./CategoryForm";
import ProductForm from "./ProductForm";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeForm, setActiveForm] = useState("category");
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        getCategories(),
        getProducts(),
      ]);
      setCategories(catRes.data);
      setProducts(prodRes.data);
    } catch (err) {
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveForm("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Delete "${name}" ?`)) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      loadData();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleToggleProductPrices = async (productId) => {
    try {
      setLoading(true);
      const { data } = await toggleProductPrices(productId);
      toast.success(data.showPrice ? "Prices shown" : "Prices hidden");
      loadData();
    } catch {
      toast.error("Toggle failed");
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on selected category + search
  const filteredProducts = products.filter((p) => {
    if (
      selectedCategoryId &&
      p.category?._id !== selectedCategoryId &&
      p.category !== selectedCategoryId
    ) {
      return false;
    }

    const term = searchTerm.toLowerCase();
    if (!term) return true;
    return (
      p.name.toLowerCase().includes(term) ||
      p.category?.name.toLowerCase().includes(term)
    );
  });

  const selectedCategory = categories.find((c) => c._id === selectedCategoryId);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Toggle */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => {
              setActiveForm("category");
              setEditingProduct(null);
            }}
            className={`px-5 py-2 rounded-lg font-medium ${
              activeForm === "category"
                ? "bg-indigo-600 text-white"
                : "bg-white border"
            }`}
          >
            Category
          </button>

          <button
            onClick={() => {
              setActiveForm("product");
              setEditingProduct(null);
            }}
            className={`px-5 py-2 rounded-lg font-medium ${
              activeForm === "product"
                ? "bg-indigo-600 text-white"
                : "bg-white border"
            }`}
          >
            Product
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          {activeForm === "category" ? (
            <CategoryForm refresh={loadData} />
          ) : (
            <ProductForm
              categories={categories}
              refresh={loadData}
              editingProduct={editingProduct}
              onCancelEdit={() => setEditingProduct(null)}
            />
          )}
        </div>

        {loading && <p className="text-center text-blue-600">Loading...</p>}

        {/* Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Categories */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Categories ({categories.length})
            </h2>

            {categories.length === 0 ? (
              <p className="text-gray-500">No categories</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {categories.map((c) => {
                  const isSelected = selectedCategoryId === c._id;
                  return (
                    <button
                      type="button"
                      key={c._id}
                      onClick={() => setSelectedCategoryId(c._id)}
                      className={`border rounded-lg p-3 flex gap-3 text-left transition ${
                        isSelected ? "border-indigo-500 bg-indigo-50" : "hover:border-indigo-200"
                      }`}
                    >
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-16 h-16 rounded object-cover"
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://via.placeholder.com/64")
                        }
                      />
                      <div>
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-xs text-gray-500">
                          {c.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Products */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedCategory
                  ? `${selectedCategory.name} Products (${filteredProducts.length})`
                  : "Select a category to view products"}
              </h2>
            </div>

            {!selectedCategory ? (
              <p className="text-gray-500 text-center py-6">
                Choose a category on the left to see its products.
              </p>
            ) : (
              <>
                {/* Search Bar */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder=" Search products by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {filteredProducts.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    {searchTerm ? "No products found" : "No products"}
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {filteredProducts.map((p) => (
                      <div
                        key={p._id}
                        className="border rounded-lg p-3 flex gap-3"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-20 h-20 rounded object-cover"
                          onError={(e) =>
                            (e.currentTarget.src =
                              "https://via.placeholder.com/80")
                          }
                        />

                        <div className="flex-1">
                          <p className="font-semibold">{p.name}</p>
                          <p className="text-xs text-gray-500 mb-2">
                            {p.category?.name}
                          </p>

                          <div className="flex gap-2 flex-wrap">
                            {p.variants?.slice(0, 2).map((v, i) => (
                              <span
                                key={i}
                                className="text-xs bg-gray-100 px-2 py-1 rounded"
                              >
                                {v.size}: ₹{v.price}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleToggleProductPrices(p._id)}
                            className={`px-3 py-1 rounded text-xs border ${
                              p.variants?.[0]?.showPrice === false
                                ? "bg-gray-100 text-gray-700"
                                : "bg-green-50 text-green-700"
                            }`}
                          >
                            {p.variants?.[0]?.showPrice === false
                              ? "Show Prices"
                              : "Hide Prices"}
                          </button>

                          <button
                            onClick={() => handleEditProduct(p)}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteProduct(p._id, p.name)
                            }
                            className="px-3 py-1 bg-red-50 text-red-600 rounded text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
