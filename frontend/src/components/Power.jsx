import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import img1 from "../assets/Power/4s black.webp";
import img2 from "../assets/Power/6X2.webp";
import img3 from "../assets/Power/6X4.webp";
import img4 from "../assets/Power/block.webp";
import img5 from "../assets/Power/carb.webp";
import img6 from "../assets/Power/gun blet.webp";
import img7 from "../assets/Power/normal.webp";
import img8 from "../assets/Power/petrol tank.webp";
import img9 from "../assets/Power/Shankar.webp";

const products = [
  {
    id: 1,
    name: "4S Black Cable",
    price: 580,
    image: img1,
  },
  {
    id: 2,
    name: "6X2 Cable",
    price: 420,
    image: img2,
  },
  {
    id: 3,
    name: "6X4 Cable",
    price: 520,
    image: img3,
  },
  {
    id: 4,
    name: "Block",
    price: 150,
    image: img4,
  },
  {
    id: 5,
    name: "Carb",
    price: 280,
    image: img5,
  },
  {
    id: 6,
    name: "Gun Blet",
    price: 320,
    image: img6,
  },
  {
    id: 7,
    name: "Normal Cable",
    price: 380,
    image: img7,
  },
  {
    id: 8,
    name: "Petrol Tank",
    price: 650,
    image: img8,
  },
  {
    id: 9,
    name: "Shankar Cable",
    price: 480,
    image: img9,
  },
];

const Power = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:shadow-md transition">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span className="font-medium">Back</span>
          </button>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Power Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-sm font-semibold text-gray-800 shadow">
                  ₹{item.price}
                </span>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full inline-flex justify-center items-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.99] transition"
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

export default Power;
