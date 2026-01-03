import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { toast } from "react-toastify";
import img1 from "../assets/Power/4s black.webp";
import img2 from "../assets/Power/6X2.webp";
import img3 from "../assets/Power/6X4.webp";
import img4 from "../assets/Power/block.webp";
import img5 from "../assets/Power/carb.webp";
import img6 from "../assets/Power/gun blet.webp";
import img7 from "../assets/Power/normal.webp";
import img8 from "../assets/Power/petrol tank.webp";
import img9 from "../assets/Power/Shankar.webp";
import Categories from '../context/Categories';

const products = [
  {
    id: 1,
    name: "4S Black Cable",
    image: img1,
    variants: [
      { size: "Normal", price: 580 },
      { size: "Heavy", price: 650 },
    ],
  },
  {
    id: 2,
    name: "6X2 Cable",
    image: img2,
    variants: [
      { size: "Standard", price: 420 },
      { size: "Premium", price: 480 },
    ],
  },
  {
    id: 3,
    name: "6X4 Cable",
    image: img3,
    variants: [
      { size: "Standard", price: 520 },
      { size: "Premium", price: 590 },
    ],
  },
  {
    id: 4,
    name: "Block",
    image: img4,
    variants: [
      { size: "Single", price: 150 },
    ],
  },
  {
    id: 5,
    name: "Carb",
    image: img5,
    variants: [
      { size: "Standard", price: 200 },
    ],
  },
  {
    id: 6,
    name: "Gun Belt",
    image: img6,
    variants: [
      { size: "Standard", price: 300 },
    ],
  },
  {
    id: 7,
    name: "Normal Cable",
    image: img7,
    variants: [ 
      { size: "Standard", price: 400 },
    ],  
  },  
  {
    id: 8,
    name: "Petrol Tank",  
    image: img8,  
    variants: [  
      { size: "Small", price: 750 },    
      { size: "Large", price: 1200 },
    ],  
  },  
  { 
    id: 9,
    name: "Shankar Cable",
    image: img9,
    variants: [
      { size: "Standard", price: 500 },
    ],
  },    

];

const Power = () => {
  const { addToCart, updateQuantity, cartItems } = useCart();
  const [selectedVariants, setSelectedVariants] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen  px-4 py-8">
      <Categories />
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-2">Power Products</h2>
          <p className="text-gray-700 text-lg">Best prices for you</p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-blue-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map(item => {
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

                {/* Variants */}
                <div>
                  <p className="text-base font-semibold text-gray-700 mb-2">Choose size:</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {item.variants.map(v => (
                      <label
                        key={v.size}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-200 bg-white shadow-sm cursor-pointer hover:border-blue-400"
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
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-semibold text-gray-800">{v.size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cart */}
                <div className="mt-auto">
                  {cartItem ? (
                    <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                      <button
                        onClick={() => updateQuantity(cartId, cartItem.quantity - 1)}
                        className="w-10 h-10 bg-white rounded-full font-bold text-xl text-blue-700 hover:bg-gray-100 transition-all"
                      >
                        −
                      </button>
                      <div className="flex flex-col items-center">
                        <span className="text-blue-700 font-bold text-xs">Total</span>
                        <span className="font-bold text-xl text-blue-800">{cartItem.quantity}</span>
                      </div>
                      <button
                        onClick={() => updateQuantity(cartId, cartItem.quantity + 1)}
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

export default Power;
