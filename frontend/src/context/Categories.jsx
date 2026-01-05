import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://balaji-traders-8f7n.onrender.com/api";
      console.log("Fetching categories from:", `${API_BASE_URL}/category/all`);
      const { data } = await axios.get(`${API_BASE_URL}/category/all`);
      console.log("Categories fetched:", data);
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      console.error("Error details:", error.response || error.message);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="w-full px-4 py-4 text-center">Loading categories...</div>;
  }

  if (categories.length === 0) {
    return <div className="w-full px-4 py-4 text-center text-gray-500">No categories available</div>;
  }

  return (
    <div className="w-full flex gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 py-4 overflow-x-auto scrollbar-hide">
      
      {categories.map((category) => (
        <div
          key={category._id}
          onClick={() => navigate(`/category/${category._id}`)}
          className="min-w-[80px] sm:min-w-[100px] cursor-pointer text-center flex flex-col items-center"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border shadow hover:scale-105 transition"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/100?text=No+Image';
            }}
          />
          <p className="mt-2 text-xs sm:text-sm font-semibold">{category.name}</p>
        </div>
      ))}

    </div>
  );
};

export default Categories;
