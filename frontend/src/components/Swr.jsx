import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import img1 from "../assets/Swr/Clip.webp";
import img2 from "../assets/Swr/Door Elbow_.webp";
import img3 from "../assets/Swr/Haf elbow_.webp";
import img4 from "../assets/Swr/Jali.webp";
import img5 from "../assets/Swr/Multi Floor Trap_.webp";
import img6 from "../assets/Swr/Soket_.webp";
import img7 from "../assets/Swr/Tee.webp";

const products = [
  {
    id: 1,
    name: "SWR Clip",
    price: 30,
    image: img1,
  },
  {
    id: 2,
    name: "Door Elbow",
    price: 180,
    image: img2,
  },
  {
    id: 3,
    name: "Half Elbow",
    price: 160,
    image: img3,
  },
  {
    id: 4,
    name: "Jali",
    price: 120,
    image: img4,
  },
  {
    id: 5,
    name: "Multi Floor Trap",
    price: 450,
    image: img5,
  },
  {
    id: 6,
    name: "Socket",
    price: 95,
    image: img6,
  },
  {
    id: 7,
    name: "SWR Tee",
    price: 210,
    image: img7,
  },
];

const Swr = () => {
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
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">SWR Products</h2>
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
                <div className="absolute inset-0 " />
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

export default Swr;
