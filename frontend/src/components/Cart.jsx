import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { buildCartPdf } from '../utils/pdf';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isGenerating, setIsGenerating] = useState(false);
  const [quantityInputs, setQuantityInputs] = useState({});

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-xl text-gray-600">Your cart is empty</p>
            <p className="text-gray-500 mt-2">Add some products to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  const handleDownloadPdf = async () => {
    try {
      setIsGenerating(true);
      const { blob } = await buildCartPdf(cartItems, { includePrices: true });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cart-summary.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF download failed', err);
      alert('PDF download failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuantityChange = (itemId, value) => {
    const qty = parseInt(value) || 0;
    setQuantityInputs({ ...quantityInputs, [itemId]: value });
    if (qty > 0) {
      updateQuantity(itemId, qty);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-5 sm:px-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-3xl font-bold text-center mb-5 sm:mb-8">Your Cart</h2>

        <div className="bg-white rounded-xl shadow-md p-2.5 sm:p-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 border-b border-gray-200 py-2.5 sm:py-4 last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 sm:w-20 sm:h-20 object-cover rounded-lg"
              />

              <div className="flex-1 min-w-[140px] sm:min-w-0">
                <h3 className="font-semibold text-sm sm:text-lg leading-tight truncate">{item.name}</h3>
                {item.showPrice === false ? (
                  <p className="text-gray-500 font-semibold text-xs sm:text-base">Price hidden</p>
                ) : (
                  <p className="text-green-600 font-semibold text-xs sm:text-base">₹{item.price}</p>
                )}
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center text-sm sm:text-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantityInputs[item.id] !== undefined ? quantityInputs[item.id] : item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-12 sm:w-16 text-center border border-gray-300 rounded px-2 py-1 text-xs sm:text-base"
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center text-sm sm:text-lg"
                >
                  +
                </button>
              </div>

              <div className="w-full sm:w-auto sm:ml-auto text-right font-semibold text-green-600 text-sm sm:text-base min-w-[70px] sm:min-w-[80px]">
                {item.showPrice === false ? "—" : `₹${item.price * item.quantity}`}
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}

            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <span className="text-lg sm:text-xl font-semibold">Total:</span>
                <span className="text-xl sm:text-2xl font-bold text-green-600">
                ₹{getCartTotal()}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadPdf}
                disabled={isGenerating}
                className="w-full sm:flex-1 bg-gray-800 text-white py-2.5 sm:py-3 rounded-lg hover:bg-gray-900 transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isGenerating ? 'Preparing PDF...' : 'Download PDF'}
              </button>
              <button
                onClick={clearCart}
                className="w-full sm:flex-1 bg-red-500 text-white py-2.5 sm:py-3 rounded-lg hover:bg-red-600 transition font-semibold text-sm sm:text-base"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;