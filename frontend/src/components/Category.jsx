import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Chadh",
    path: "/chadh",
  },
  {
    name: "CPVC",
    path: "/cpvc",
  },
  {
    name: "Power",
    path: "/power",
  },
  {
    name: "SWR",
    path: "/swr",
  },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      
      <h2 className="text-2xl font-semibold text-center mb-8">
        Categories
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(cat.path)}
            className="cursor-pointer bg-white rounded-xl shadow-md h-40 flex items-center justify-center
                       text-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
