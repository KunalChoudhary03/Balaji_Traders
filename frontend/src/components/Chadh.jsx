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
  {
    id: 1,
    name: "Chadh Bend",
    image: img1,
    variants: [
      { size: "1/2 inch", price: 450 },
      { size: "3/4 inch", price: 520 },
    ],
  },
  {
    id: 2,
    name: "Chadh Buj",
    image: img2,
    variants: [
      { size: "Small", price: 520 },
      { size: "Large", price: 610 },
    ],
  },
  {
    id: 3,
    name: "Chadh Debbi",
    image: img3,
    variants: [
      { size: "Standard", price: 610 },
      { size: "Heavy", price: 700 },
    ],
  },{
    id: 4,
    name: "Chadh Debbi 1",
    image: img4,
    variants: [
      { size: "Standard", price: 720 },
      { size: "Heavy", price: 800 },
    ],
  },{
    id: 5,
    name: "Chadh Fanbox",
    image: img5,
    variants: [
      { size: "Standard", price: 900 },
      { size: "Heavy", price: 1000 },
    ],
  },{
    id: 6,
    name: "Chadh Pipe",
    image: img6,
    variants: [
      { size: "1 inch", price: 300 },
      { size: "2 inch", price: 400 },
    ],
  },{
    id: 7,
    name: "Chadh Tape",
    image: img7,
    variants: [
      { size: "Standard", price: 150 },
      { size: "Heavy", price: 200 },
    ],
  }
];

const Chadh = () => {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, cartItems } = useCart();
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getCartItem = (id) =>
    cartItems.find(item => item.id === id);

  const getSelectedVariant = (product) =>
    selectedVariants[product.id] || product.variants[0];

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
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-2xl font-semibold mb-6">Chadh Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => {
            const selectedVariant = getSelectedVariant(item);
            const cartId = `${item.id}-${selectedVariant.size}`;
            const cartItem = getCartItem(cartId);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md border p-4 flex flex-col gap-3"
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
                    ₹{selectedVariant.price}
                  </span>
                </div>

                {/* Variants */}
                <div className="space-y-2">
                  {item.variants.map((variant) => (
                    <label
                      key={variant.size}
                      className="flex justify-between items-center text-sm cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`variant-${item.id}`}
                          checked={selectedVariant.size === variant.size}
                          onChange={() =>
                            setSelectedVariants({
                              ...selectedVariants,
                              [item.id]: variant,
                            })
                          }
                        />
                        <span>{variant.size}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Cart */}
                {cartItem ? (
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl px-3 py-2">
                    <button
                      onClick={() =>
                        updateQuantity(cartId, cartItem.quantity - 1)
                      }
                      className="w-9 h-9 bg-white rounded-full shadow font-bold"
                    >
                      −
                    </button>

                    <span className="font-semibold">
                      {cartItem.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(cartId, cartItem.quantity + 1)
                      }
                      className="w-9 h-9 bg-white rounded-full shadow font-bold"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
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

export default Chadh;
