import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Balaji Traders Bidwal | Product Categories";
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "https://balaji-traders-8f7n.onrender.com/api";

      const { data } = await axios.get(`${API_BASE_URL}/category/all`);
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (e, cat) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Check out ${cat.name} products at Balaji Traders Bidwal: ${window.location.origin}/category/${cat._id}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 display-flex flex-col px-4">
        Loading categories...

        <p className="text-center text-red-500 mt-2">We are currently using free server , this might take some time due to limited resources.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
        Balaji Traders Bidwal
      </h1>

      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
        Explore our premium range of plumbing and pipe categories including CPVC,
        SWR, Power Pipes and more.
      </p>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl lg:max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => navigate(`/category/${cat._id}`)}
            className="group cursor-pointer bg-white rounded-xl lg:rounded-2xl border border-slate-200 shadow-sm lg:shadow hover:shadow-lg hover:border-emerald-300/70 transition-all duration-200"
          >
            {/* Image */}
            <div className="relative h-28 sm:h-36 lg:h-40 bg-gray-50 rounded-t-xl lg:rounded-t-2xl overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-contain p-3 lg:p-4 transition-transform duration-200 group-hover:scale-105 lg:group-hover:scale-110"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image")
                }
              />

              {/* Share */}
              <button
                onClick={(e) => handleShare(e, cat)}
                className="absolute top-2 right-2 bg-white border border-emerald-400 text-emerald-600 rounded-full p-1.5 shadow hover:bg-emerald-50"
                aria-label="Share"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12.04 2a9.96 9.96 0 00-8.78 14.52l-.58 3.3a.75.75 0 00.88.87l3.26-.62A9.96 9.96 0 1012.04 2z" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-3 lg:p-4 text-center">
              <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 leading-tight">
                {cat.name}
              </h2>

              {cat.description && (
                <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              )}

              <div className="mt-2 text-xs sm:text-sm font-semibold text-emerald-600">
                View Products →
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Category;
