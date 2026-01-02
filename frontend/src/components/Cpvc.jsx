import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import img1 from "../assets/Cpvc/Ball.webp";
import img2 from "../assets/Cpvc/Clip.webp";
import img3 from "../assets/Cpvc/Concealed Valve.webp";
import img4 from "../assets/Cpvc/Coupler.webp";
import img5 from "../assets/Cpvc/Elbow 45°.webp";
import img6 from "../assets/Cpvc/Elbow Brass.webp";
import img7 from "../assets/Cpvc/Elbow_.webp";
import img8 from "../assets/Cpvc/FTP.webp";
import img9 from "../assets/Cpvc/MTB.webp";
import img10 from "../assets/Cpvc/Mtp.webp";
import img11 from "../assets/Cpvc/Reduser_.webp";
import img12 from "../assets/Cpvc/Union.webp";

const products = [
  {
    id: 1,
    name: "CPVC Ball Valve",
    price: 350,
    image: img1,
  },
  {
    id: 2,
    name: "CPVC Clip",
    price: 25,
    image: img2,
  },
  {
    id: 3,
    name: "Concealed Valve",
    price: 450,
    image: img3,
  },
  {
    id: 4,
    name: "CPVC Coupler",
    price: 80,
    image: img4,
  },
  {
    id: 5,
    name: "Elbow 45°",
    price: 65,
    image: img5,
  },
  {
    id: 6,
    name: "Elbow Brass",
    price: 120,
    image: img6,
  },
  {
    id: 7,
    name: "CPVC Elbow",
    price: 55,
    image: img7,
  },
  {
    id: 8,
    name: "FTP",
    price: 95,
    image: img8,
  },
  {
    id: 9,
    name: "MTB",
    price: 110,
    image: img9,
  },
  {
    id: 10,
    name: "MTP",
    price: 105,
    image: img10,
  },
  {
    id: 11,
    name: "Reducer",
    price: 75,
    image: img11,
  },
  {
    id: 12,
    name: "CPVC Union",
    price: 130,
    image: img12,
  },
];

const Cpvc = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-4 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 sm:gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white shadow hover:shadow-md transition">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span className="font-medium text-sm sm:text-base">Back</span>
          </button>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">CPVC Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 sm:h-56 object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 " />
                <span className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2.5 sm:px-3 py-1 rounded-full bg-white/90 text-xs sm:text-sm font-semibold text-gray-800 shadow">
                  ₹{item.price}
                </span>
              </div>

              <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full inline-flex justify-center items-center gap-2 py-2 sm:py-2.5 text-sm sm:text-base rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.99] transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2m0 0L7 15h10l1.6-8H5.4zm3 12a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cpvc;