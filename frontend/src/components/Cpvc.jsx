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
    name: "CPVC Coupler",
    image: img4,
    variants: [
      { size: "1/2 inch", price: 80 },
      { size: "3/4 inch", price: 95 },
    ],
  },
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
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)}>⬅ Back</button>
          <h2 className="text-2xl font-semibold">CPVC Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => {
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

                {/* Variants (NO PRICE HERE) */}
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

                {/* Cart Controls */}
                {cartItem ? (
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl px-3 py-2">
                    <button
                      onClick={() =>
                        updateQuantity(cartId, cartItem.quantity - 1)
                      }
                    >−</button>

                    <span>{cartItem.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(cartId, cartItem.quantity + 1)
                      }
                    >+</button>
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

export default Cpvc;
