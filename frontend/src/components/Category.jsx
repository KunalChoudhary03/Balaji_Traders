import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Chadh", path: "/chadh" },
  { name: "CPVC", path: "/cpvc" },
  { name: "Power", path: "/power" },
  { name: "SWR", path: "/swr" },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:py-10">
      
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(cat.path)}
            className="
              cursor-pointer 
              bg-white 
              rounded-xl 
              shadow-md 
              
              /* Mobile */
              h-28 
              text-lg 
              border border-gray-200
              
              /* Desktop (same as before) */
              sm:h-40 
              sm:text-xl 
              sm:border-none
              
              flex flex-col items-center justify-center
              font-medium
              hover:shadow-xl hover:scale-105
              transition-all duration-300
            "
          >
            <span>{cat.name}</span>

            {/* Mobile hint */}
            <span className="text-xs text-gray-500 mt-1 sm:hidden">
              Tap to view →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
