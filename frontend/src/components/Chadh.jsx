import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import img1 from "../assets/Chadh/bend.webp";
import img2 from "../assets/Chadh/buj.webp";
import img3 from "../assets/Chadh/debbi.webp";
import img4 from "../assets/Chadh/debbi1.webp";
import img5 from "../assets/Chadh/fanbox.webp";
import img6 from "../assets/Chadh/pipe.webp";
import img7 from "../assets/Chadh/tape.webp";
import { toast } from "react-toastify";
import Categories from '../context/Categories';

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
  },
  {
    id: 4,
    name: "Chadh Debbi 1",
    image: img4,
    variants: [
      { size: "Standard", price: 720 },
      { size: "Heavy", price: 800 },
    ],
  },
  {
    id: 5,
    name: "Chadh Fanbox",
    image: img5,
    variants: [
      { size: "Standard", price: 900 },
      { size: "Heavy", price: 1000 },
    ],
  },
  {
    id: 6,
    name: "Chadh Pipe",
    image: img6,
    variants: [
      { size: "1 inch", price: 300 },
      { size: "2 inch", price: 400 },
    ],
  },
  {
    id: 7,
    name: "Chadh Tape",
    image: img7,
    variants: [
      { size: "Standard", price: 150 },
      { size: "Heavy", price: 200 },
    ],
  },
];

const Chadh = () => {
  const { addToCart, updateQuantity, cartItems } = useCart();
  const [selectedVariants, setSelectedVariants] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getVariant = (product) =>
    selectedVariants[product.id] || product.variants[0];

  const getCartItem = (cartId) =>
    cartItems.find((item) => item.id === cartId);

  const handleAddToCart = (product) => {
    const variant = getVariant(product);

    addToCart({
      id: `${product.id}-${variant.size}`,
      name: `${product.name} (${variant.size})`,
      price: variant.price,
      image: product.image,
    });

    toast.success(`${product.name} added 🛒`);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-8">
      <Categories />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Chadh Products</h1>
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => {
          const variant = getVariant(product);
          const cartId = `${product.id}-${variant.size}`;
          const cartItem = getCartItem(cartId);

          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition-all duration-300 border border-blue-100"
            >
              {/* Image Container */}
              <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-center h-40">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Name & Price */}
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-bold text-gray-800">
                  {product.name}
                </p>
                <p className="text-orange-600 font-bold text-xl">
                  ₹{variant.price}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  {product.variants.map((v) => (
                    <label
                      key={v.size}
                      className="flex flex-col items-center gap-1 cursor-pointer px-2"
                    >
                      <input
                        type="radio"
                        name={`variant-${product.id}`}
                        checked={variant.size === v.size}
                        onChange={() =>
                          setSelectedVariants({
                            ...selectedVariants,
                            [product.id]: v,
                          })
                        }
                        className="w-5 h-5 cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-gray-800">{v.size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cart Buttons */}
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
                      <span className="font-bold text-xl text-blue-800">
                        {cartItem.quantity}
                      </span>
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
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-3 rounded-xl bg-blue-500 text-white text-lg font-bold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
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

export default Chadh;
