import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { buildCartPdf } from '../utils/pdf';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [includePrices, setIncludePrices] = useState(true);
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
      const { blob } = await buildCartPdf(cartItems, { includePrices });
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

  const handleShareWhatsApp = async () => {
    try {
      setIsSharing(true);
      const { blob, summaryText } = await buildCartPdf(cartItems, { includePrices });
      
      // Create text message for WhatsApp
      let message = `*Balaji Traders - Cart Summary*\n\n`;
      cartItems.forEach((item) => {
        message += `${item.name}\nQuantity: ${item.quantity}\n`;
        if (includePrices) {
          message += `Price: ₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
        }
        message += `\n`;
      });
      if (includePrices) {
        message += `*Total: ₹${getCartTotal()}*`;
      }

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

      // Mobile: Use native WhatsApp if available
      if (navigator.share && /mobile/i.test(navigator.userAgent)) {
        window.open(`whatsapp://send?text=${encodedMessage}`, '_blank');
      } else {
        // Desktop: Open WhatsApp Web
        window.open(whatsappUrl, '_blank');
      }
    } catch (err) {
      console.error('WhatsApp share failed', err);
      alert('Share failed. Please try again.');
    } finally {
      setIsSharing(false);
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
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-200 py-4 last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1 w-full sm:w-auto">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-green-600 font-semibold">₹{item.price}</p>
              </div>

              {/* Quantity Controls - Desktop */}
              <div className="hidden sm:flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
                >
                  +
                </button>
              </div>

              {/* Quantity Controls - Mobile */}
              <div className="sm:hidden w-full flex items-center gap-2">
                <span className="text-gray-600 text-sm">Qty:</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center text-sm"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantityInputs[item.id] !== undefined ? quantityInputs[item.id] : item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-12 text-center border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center text-sm"
                >
                  +
                </button>
              </div>

              <div className="hidden sm:block w-24 text-right font-semibold">
                ₹{item.price * item.quantity}
              </div>

              <div className="sm:hidden w-full text-right font-semibold text-green-600">
                ₹{item.price * item.quantity}
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

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl font-bold text-green-600">
                ₹{getCartTotal()}
              </span>
            </div>

            <label className="flex items-center gap-2 mb-4 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={includePrices}
                onChange={(e) => setIncludePrices(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Include prices in PDF / share</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleDownloadPdf}
                disabled={isGenerating}
                className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Preparing PDF...' : 'Download PDF'}
              </button>
              <button
                onClick={handleShareWhatsApp}
                disabled={isSharing}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSharing ? 'Opening WhatsApp...' : 'Share on WhatsApp'}
              </button>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={clearCart}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold"
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