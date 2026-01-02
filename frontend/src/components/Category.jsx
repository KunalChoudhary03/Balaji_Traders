import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Chadh", path: "/chadh", desc: "Pipes & fittings" },
  { name: "CPVC", path: "/cpvc", desc: "Hot & cold water pipes" },
  { name: "Power", path: "/power", desc: "Electrical solutions" },
  { name: "SWR", path: "/swr", desc: "Drainage systems" },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:py-10">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-3xl font-bold text-blue-700">
          Balaji Traders
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-1">
          Quality plumbing & electrical products
        </p>
      </div>

      <h2 className="text-lg sm:text-2xl font-semibold text-center mb-6">
        Categories
      </h2>

      {/* Responsive Grid */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          gap-4 sm:gap-6 
          max-w-5xl 
          mx-auto
        "
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(cat.path)}
            className="
              bg-white 
              rounded-2xl 
              shadow-sm 
              p-6 sm:p-10
              cursor-pointer
              flex flex-col items-center justify-center
              hover:shadow-xl hover:-translate-y-1
              transition-all duration-300
            "
          >
            <h3 className="text-lg sm:text-xl font-semibold">
              {cat.name}
            </h3>

            <p className="text-gray-500 text-sm sm:text-base mt-1 text-center">
              {cat.desc}
            </p>

            {/* Mobile CTA */}
            <button
              className="
                mt-4 
                sm:hidden 
                bg-blue-600 
                text-white 
                px-4 py-2 
                rounded-lg 
                text-sm
              "
            >
              View Products
            </button>

            {/* Desktop Hint */}
            <p className="hidden sm:block text-blue-600 mt-4 text-sm">
              View Products →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
