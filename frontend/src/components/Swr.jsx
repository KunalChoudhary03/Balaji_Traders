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
  {
    id: 1,
    name: "SWR Clip",
    image: img1,
    variants: [
      { size: "Small", price: 30 },
      { size: "Large", price: 45 },
    ],
  },
  {
    id: 2,
    name: "Door Elbow",
    image: img2,
    variants: [
      { size: "75 mm", price: 180 },
      { size: "110 mm", price: 260 },
    ],
  },
  {
    id: 3,
    name: "Half Elbow",
    image: img3,
    variants: [
      { size: "75 mm", price: 160 },
      { size: "110 mm", price: 230 },
    ],
  },
  {
    id: 4,
    name: "Jali",
    image: img4,
    variants: [
      { size: "Standard", price: 120 },
    ],
  },
  {
    id: 5,
    name: "Multi Floor Trap",
    image: img5,
    variants: [
      { size: "Standard", price: 450 },
      { size: "Heavy", price: 520 },
    ],
  },
  {
    id: 6,
    name: "Socket",
    image: img6,
    variants: [
      { size: "75 mm", price: 95 },
      { size: "110 mm", price: 150 },
    ],
  },
  {
    id: 7,
    name: "SWR Tee",
    image: img7,
    variants: [
      { size: "75 mm", price: 210 },
      { size: "110 mm", price: 310 },
    ],
  },
];


const Swr = () => {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVariants, setSelectedVariants] = useState({});

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
          <h2 className="text-2xl font-semibold">SWR Products</h2>
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


export default Swr;
