import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Chadh",
    path: "/chadh",
    desc: "Pipes & fittings",
    icon: "🧱",
  },
  {
    name: "CPVC",
    path: "/cpvc",
    desc: "Hot & cold water pipes",
    icon: "🔥",
  },
  {
    name: "Power",
    path: "/power",
    desc: "Electrical solutions",
    icon: "⚡",
  },
  {
    name: "SWR",
    path: "/swr",
    desc: "Drainage systems",
    icon: "🚿",
  },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      {/* Hero Section */}
      <div className="bg-blue-50 rounded-xl p-8 text-center mb-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700">
          Balaji Traders
        </h1>
        <p className="text-gray-600 mt-2">
          Quality plumbing & electrical products at best prices
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-8">
        Categories
      </h2>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(cat.path)}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-6
                       hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]
                       transition-all duration-300 group"
          >
            <div className="text-4xl text-center mb-4">
              {cat.icon}
            </div>

            <h3 className="text-lg font-semibold text-center">
              {cat.name}
            </h3>

            <p className="text-sm text-gray-500 text-center mt-1">
              {cat.desc}
            </p>

            <p className="text-blue-600 text-sm text-center mt-4 opacity-0
                          group-hover:opacity-100 transition">
              View Products →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
