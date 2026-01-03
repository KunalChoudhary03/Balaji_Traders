import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)}>⬅ Back</button>
          <h2 className="text-2xl font-semibold">Power Products</h2>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 w-full md:w-1/2 px-4 py-2 rounded-xl border"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(item => {
            const variant = getSelectedVariant(item);
            const cartId = `${item.id}-${variant.size}`;
            const cartItem = getCartItem(cartId);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow border p-4 flex flex-col gap-3"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-contain"
                />

                {/* Name + Price */}
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <span className="text-blue-600 font-bold">
                    ₹{variant.price}
                  </span>
                </div>

                {/* Variants */}
                <div className="space-y-2">
                  {item.variants.map(v => (
                    <label
                      key={v.size}
                      className="flex items-center gap-2 text-sm cursor-pointer"
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
                      />
                      <span>{v.size}</span>
                    </label>
                  ))}
                </div>

                {/* Cart */}
                {cartItem ? (
                  <div className="flex justify-between items-center bg-gray-100 rounded-xl px-3 py-2">
                    <button onClick={() => updateQuantity(cartId, cartItem.quantity - 1)}>−</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={() => updateQuantity(cartId, cartItem.quantity + 1)}>+</button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Power;
