import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
        <div 
          onClick={() => navigate('/')}
          className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition"
        >
          Balaji Traders
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => navigate('/cart')}
            className="relative p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700"
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
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          <button className="px-3 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar
