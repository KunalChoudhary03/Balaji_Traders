import { useNavigate } from "react-router-dom";
import Footer from './Footer'
import ChadhImg from "../assets/Chadh/Chadhimg.jpg";
import CpvcImg from "../assets/Cpvc/Cpvcimg.jpg";
import PowerImg from "../assets/Power/Powerimg.jpg";
import SwrImg from "../assets/Swr/Swrimg.jpg";

const categories = [
  { 
    name: "Chadh", 
    path: "/chadh",
    description: "High-quality Chadh pipes for all plumbing needs",
    image: ChadhImg

  },
  { 
    name: "CPVC", 
    path: "/cpvc",
    description: "Durable CPVC pipes for hot & cold water systems",
    image: CpvcImg
  },
  { 
    name: "Power", 
    path: "/power",
    description: "Premium power cables and electrical solutions",
    image: PowerImg
  },
  { 
    name: "SWR", 
    path: "/swr",
    description: "Soil, Waste & Rain water drainage pipes",
    image: SwrImg
  },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:py-10">
      
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-8">
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto ">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(cat.path)}
            className="
              cursor-pointer 
              bg-white 
              rounded-xl 
              shadow-md 
              relative
              overflow-hidden
              group
              border border-gray-200
              hover:shadow-xl hover:scale-105
              transition-all duration-300
              flex flex-col
            "
          >
            <div className="w-full h-36 sm:h-44 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-4 py-3 sm:py-4 text-center">
              <span className="text-lg sm:text-xl font-semibold text-gray-800">
                {cat.name}
              </span>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                {cat.description}
              </p>
            </div>

            {/* Hover effect - "View Products" */}
            <div className="
              absolute inset-0 
              bg-blue-600 bg-opacity-0 
              group-hover:bg-opacity-90
              flex items-center justify-center
              transition-all duration-300
              opacity-0 group-hover:opacity-100
            ">
              <span className="text-white text-lg sm:text-xl font-semibold">
                View Products →
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default Category;