import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Chadh",
    path: "/chadh",
    desc: "Pipes & fittings",
  },
  {
    name: "CPVC",
    path: "/cpvc",
    desc: "Hot & cold water pipes",

  },
  {
    name: "Power",
    path: "/power",
    desc: "Electrical solutions",
  },
  {
    name: "SWR",
    path: "/swr",
    desc: "Drainage systems",
  },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-4 py-6 sm:py-10">

      {/* Hero Section */}
      <div className="bg-blue-50 rounded-xl p-4 sm:p-6 md:p-8 text-center mb-6 sm:mb-10 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700">
          Balaji Traders
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Quality plumbing & electrical products at best prices
        </p>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">
        Categories
      </h2>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(cat.path)}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-5 sm:p-6
                       hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]
                       transition-all duration-300 group"
          >

            <h3 className="text-lg sm:text-xl font-semibold text-center">
              {cat.name}
            </h3>

            <p className="text-sm text-gray-500 text-center mt-1">
              {cat.desc}
            </p>

            <p className="text-blue-600 text-sm text-center mt-3 sm:mt-4 opacity-0
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
