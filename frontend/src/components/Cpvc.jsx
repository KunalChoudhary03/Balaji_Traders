import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { toast } from "react-toastify";
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
    image: img1,
    variants: [
      { size: "1/2 inch", price: 350 },
      { size: "3/4 inch", price: 420 },
    ],
  },
  {
    id: 2,
    name: "CPVC Clip",
    image: img2,
    variants: [
      { size: "20 mm", price: 25 },
      { size: "25 mm", price: 35 },
    ],
  },
  {
    id: 3,
    name: "CPVC Concealed Valve",
    image: img3,
    variants: [ 
      { size: "1/2 inch", price: 400 },
      { size: "3/4 inch", price: 480 },
    ],  
  },
  {
    id: 4,
    name: "CPVC Coupler",
    image: img4,
    variants: [
      { size: "1/2 inch", price: 80 },
      { size: "3/4 inch", price: 95 },
    ],
  },
  {
    id: 5,
    name: "CPVC Elbow 45°",
    image: img5,  
    variants: [
      { size: "1/2 inch", price: 90 },
      { size: "3/4 inch", price: 110 },
    ],  
  },
  {
    id: 6,
    name: "CPVC Elbow Brass",
    image: img6,
    variants: [
      { size: "1/2 inch", price: 150 },
      { size: "3/4 inch", price: 180 },
    ],
  },
  {
    id: 7,  
    name: "CPVC Elbow",
    image: img7,
    variants: [ 
      { size: "1/2 inch", price: 70 },
      { size: "3/4 inch", price: 85 },
    ],    
  }
];

const Cpvc = () => {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, cartItems } = useCart();
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getSelectedVariant = (product) =>
    selectedVariants[product.id] || product.variants[0];

  const getCartItem = (id) =>
    cartItems.find(item => item.id === id);

  const handleAddToCart = (product) => {
    const variant = getSelectedVariant(product);

    addToCart({
      id: `${product.id}-${variant.size}`,
      name: `${product.name} (${variant.size})`,
      price: variant.price,
      image: product.image,
    });

    toast.success(`${product.name} (${variant.size}) added 🛒`);
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-blue-700 font-semibold">⬅ Back</button>
          <h2 className="text-3xl font-bold text-blue-900">CPVC Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((item) => {
            const variant = getSelectedVariant(item);
            const cartId = `${item.id}-${variant.size}`;
            const cartItem = getCartItem(cartId);

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition-all duration-300 border border-blue-100"
              >
                {/* Image */}
                <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-center h-40">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Name + Price */}
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <span className="text-orange-600 font-bold text-xl">₹{variant.price}</span>
                </div>

                {/* Variants (NO PRICE HERE) */}
                <div>
                  <p className="text-base font-semibold text-gray-700 mb-2">Choose size:</p>
                  <div className="flex flex-wrap items-center gap-3">
                    {item.variants.map(v => (
                      <label
                        key={v.size}
                        className="flex flex-col items-center gap-1 cursor-pointer px-2"
                      >
                        <input
                          type="radio"
                          name={`variant-${item.id}`}
                          checked={variant.size === v.size}
                          onChange={() =>
                            setSelectedVariants({
                              ...selectedVariants,
                              [item.id]: v,
                            })
                          }
                          className="w-5 h-5 cursor-pointer"
                        />
                        <span className="text-sm font-semibold text-gray-800">{v.size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cart Controls */}
                <div className="mt-auto">
                  {cartItem ? (
                    <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                      <button
                        onClick={() =>
                          updateQuantity(cartId, cartItem.quantity - 1)
                        }
                        className="w-10 h-10 bg-white rounded-full font-bold text-xl text-blue-700 hover:bg-gray-100 transition-all"
                      >
                        −
                      </button>

                      <div className="flex flex-col items-center">
                        <span className="text-blue-700 font-bold text-xs">Total</span>
                        <span className="font-bold text-xl text-blue-800">{cartItem.quantity}</span>
                      </div>

                      <button
                        onClick={() =>
                          updateQuantity(cartId, cartItem.quantity + 1)
                        }
                        className="w-10 h-10 bg-white rounded-full font-bold text-xl text-blue-700 hover:bg-gray-100 transition-all"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-3 rounded-xl bg-blue-500 text-white text-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
                    >
                       Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cpvc;
