import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import img1 from "../assets/Chadh/bend.webp";
import img2 from "../assets/Chadh/buj.webp";
import img3 from "../assets/Chadh/debbi.webp";
import img4 from "../assets/Chadh/debbi1.webp";
import img5 from "../assets/Chadh/fanbox.webp";
import img6 from "../assets/Chadh/pipe.webp";
import img7 from "../assets/Chadh/tape.webp";
import { toast } from "react-toastify";

const products = [
  { id: 1, name: "Chadh Bend", price: 450, image: img1 },
  { id: 2, name: "Chadh Buj", price: 520, image: img2 },
  { id: 3, name: "Chadh Debbi", price: 610, image: img3 },
  { id: 4, name: "Chadh Debbi 1", price: 700, image: img4 },
  { id: 5, name: "Chadh Fan Box", price: 300, image: img5 },
  { id: 6, name: "Chadh Pipe", price: 400, image: img6 },
  { id: 7, name: "Chadh Tape", price: 150, image: img7 },
];

const Chadh = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
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

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Chadh Products
          </h2>
        </div>

        {/* 🔹 Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
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
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-sm font-semibold text-gray-800 shadow">
                    ₹{item.price}
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {item.name}
                  </h3>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full inline-flex justify-center items-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.99] transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chadh;
