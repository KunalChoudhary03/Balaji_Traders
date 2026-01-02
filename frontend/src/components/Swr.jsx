import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import img1 from "../assets/Swr/Clip.webp";
import img2 from "../assets/Swr/Door Elbow_.webp";
import img3 from "../assets/Swr/Haf elbow_.webp";
import img4 from "../assets/Swr/Jali.webp";
import img5 from "../assets/Swr/Multi Floor Trap_.webp";
import img6 from "../assets/Swr/Soket_.webp";
import img7 from "../assets/Swr/Tee.webp";
import { toast } from "react-toastify";

const products = [
  { id: 1, name: "SWR Clip", price: 30, image: img1 },
  { id: 2, name: "Door Elbow", price: 180, image: img2 },
  { id: 3, name: "Half Elbow", price: 160, image: img3 },
  { id: 4, name: "Jali", price: 120, image: img4 },
  { id: 5, name: "Multi Floor Trap", price: 450, image: img5 },
  { id: 6, name: "Socket", price: 95, image: img6 },
  { id: 7, name: "SWR Tee", price: 210, image: img7 },
];

const Swr = () => {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 search term

  const getCartItem = (id) => cartItems.find(item => item.id === id);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`);
  };

  // 🔹 Filter products by search term
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
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">SWR Products</h2>
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
                <div className="relative overflow-hidden bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-contain transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-sm font-semibold text-gray-800 shadow">
                    ₹{item.price}
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>

                  {getCartItem(item.id) ? (
                    <div className="w-full flex items-center justify-between bg-gray-100 rounded-xl px-3 py-2">
                      <button
                        onClick={() => {
                          const currentItem = getCartItem(item.id);
                          if (currentItem && currentItem.quantity > 0) {
                            updateQuantity(item.id, currentItem.quantity - 1);
                          }
                        }}
                        className="w-9 h-9 bg-white rounded-full shadow text-lg font-bold hover:bg-gray-200"
                      >
                        −
                      </button>

                      <span className="font-semibold text-lg">
                        {getCartItem(item.id).quantity}
                      </span>

                      <button
                        onClick={() => {
                          const currentItem = getCartItem(item.id);
                          updateQuantity(item.id, currentItem.quantity + 1);
                        }}
                        className="w-9 h-9 bg-white rounded-full shadow text-lg font-bold hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full inline-flex justify-center items-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.99] transition"
                    >
                      Add to Cart
                    </button>
                  )}
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

export default Swr;
