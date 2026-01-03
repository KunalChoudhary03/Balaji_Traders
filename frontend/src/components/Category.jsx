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

  const handleShare = (e, cat) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Check out ${cat.name} products: ${window.location.origin}${cat.path}`
    );
    const url = `https://wa.me/?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-6 pb-16 sm:pt-10 sm:pb-20">
      
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