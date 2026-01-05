import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from './Footer';

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
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
      `Check out ${cat.name} products: ${window.location.origin}/category/${cat._id}`
    );
    const url = `https://wa.me/?text=${text}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading categories...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-6 pb-16 sm:pt-10 sm:pb-20">
      
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-8">
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto ">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => navigate(`/category/${cat._id}`)}
            className="
              cursor-pointer 
              bg-white 
              rounded-xl 
              shadow-md 
              relative
              overflow-hidden
              border border-gray-200
              transition-all duration-200 transform hover:shadow-lg hover:scale-105
              flex flex-col
            "
          >
            <div className="w-full h-36 sm:h-44 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-4 py-3 sm:py-4 text-center">
              <span className="text-lg sm:text-xl font-semibold text-gray-800">
                {cat.name}
              </span>
              {cat.description && (
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                  {cat.description}
                </p>
              )}
            </div>

            <button
              onClick={(e) => handleShare(e, cat)}
              className="absolute top-2 right-2 bg-white/90 border border-green-500 text-green-600 rounded-full p-2 shadow-sm hover:bg-green-50 transition"
              aria-label="Share on WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12.04 2a9.96 9.96 0 00-8.78 14.52l-.58 3.3a.75.75 0 00.88.87l3.26-.62A9.96 9.96 0 1012.04 2zm5.9 14.54a.62.62 0 01-.19.44 2.43 2.43 0 01-1.67.7c-.29 0-.66-.04-1.07-.13a9.1 9.1 0 01-3.65-1.63 9.74 9.74 0 01-2.95-3.36 5.5 5.5 0 01-.6-2.52 2.2 2.2 0 01.7-1.67.62.62 0 01.44-.19h.49c.12 0 .27.01.42.31.16.32.55 1.32.6 1.42.05.1.08.22.02.35-.06.13-.09.2-.17.31-.08.1-.17.22-.25.3-.08.08-.17.17-.07.33.1.16.45.74.97 1.19.67.6 1.22.79 1.4.88.18.1.28.08.38-.05.1-.13.43-.5.55-.67.12-.17.23-.14.38-.08.16.06 1.02.48 1.2.57.18.1.3.13.35.2.05.07.05.44-.13.88z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default Category;