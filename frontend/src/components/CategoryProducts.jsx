import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { toast } from "react-toastify";
import Categories from '../context/Categories';
import Footer from './Footer';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addToCart, updateQuantity, cartItems } = useCart();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategoryAndProducts();
  }, [categoryId]);

  const fetchCategoryAndProducts = async () => {
    try {
      setLoading(true);
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://balaji-traders-8f7n.onrender.com/api";
      
      // Fetch category details
      const categoryResponse = await axios.get(`${API_BASE_URL}/category/all`);
      const currentCategory = categoryResponse.data.find(cat => cat._id === categoryId);
      setCategory(currentCategory);
      
      // Fetch products by category
      const productsResponse = await axios.get(`${API_BASE_URL}/product/category/${categoryId}`);
      setProducts(productsResponse.data);
      
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const getVariant = (product) =>
    selectedVariants[product._id] || product.variants[0];

  const getCartItem = (cartId) =>
    cartItems.find((item) => item.id === cartId);

  const handleAddToCart = (product) => {
    const variant = getVariant(product);

    addToCart({
      id: `${product._id}-${variant.size}`,
      name: `${product.name} (${variant.size})`,
      price: variant.price,
      image: product.image,
      quantity: 1,
    });

    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleQuantityChange = (product, change) => {
    const variant = getVariant(product);
    const cartId = `${product._id}-${variant.size}`;
    const cartItem = getCartItem(cartId);

    if (cartItem) {
      const newQuantity = cartItem.quantity + change;
      updateQuantity(cartId, newQuantity);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Category not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Categories />

      <div className="container mx-auto px-4 py-6">
        {/* Category Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 mb-2 flex items-center"
          >
            ← Back to Categories
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 mt-2">{category.description}</p>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 pb-6">
            {filteredProducts.map((product) => {
              const variant = getVariant(product);
              const cartId = `${product._id}-${variant.size}`;
              const cartItem = getCartItem(cartId);

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full relative"
                >
                  {/* On Order Badge */}
                  {product.onOrder && (
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
                      On Order
                    </div>
                  )}
                  
                  {/* Product Image */}
                  <div className="bg-blue-50 rounded-lg p-2 sm:p-3 flex items-center justify-center h-24 sm:h-40">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

                  {/* Product Details */}
                  <div className="p-2 sm:p-4 flex flex-col flex-1">
                    {/* Product Name and Price */}
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <h3 className="text-sm sm:text-xl font-bold text-gray-800 line-clamp-2">
                        {product.name}
                      </h3>
                      {variant.showPrice && (
                        <p className="text-sm sm:text-xl font-bold text-orange-500 flex-shrink-0 ml-2">
                          ₹{variant.price}
                        </p>
                      )}
                    </div>

                    {/* Variant Selection - Single Column */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="mb-2 sm:mb-4 flex flex-col gap-1 sm:gap-2">
                        {product.variants.map((v, idx) => (
                          <label
                            key={idx}
                            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 border-2 rounded-lg cursor-pointer transition hover:border-blue-500 text-xs sm:text-sm"
                            style={{
                              borderColor: variant.size === v.size ? '#3b82f6' : '#e5e7eb',
                              backgroundColor: variant.size === v.size ? '#eff6ff' : 'white'
                            }}
                          >
                            <input
                              type="radio"
                              name={`variant-${product._id}`}
                              value={v.size}
                              checked={variant.size === v.size}
                              onChange={() => {
                                setSelectedVariants({
                                  ...selectedVariants,
                                  [product._id]: v,
                                });
                              }}
                              className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
                            />
                            <span className="font-medium text-gray-700">
                              {v.size}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* Add to Cart or Quantity Controls - Pushed to Bottom */}
                    <div className="mt-auto pt-2 sm:pt-4">
                      {cartItem ? (
                        <div className="flex items-center justify-between bg-blue-50 rounded-lg p-2 sm:p-3">
                          <button
                            onClick={() => handleQuantityChange(product, -1)}
                            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition font-bold text-sm sm:text-lg"
                          >
                            -
                          </button>
                          <span className="font-bold text-gray-800 text-sm sm:text-lg">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(product, 1)}
                            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition font-bold text-sm sm:text-lg"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-sm sm:text-base"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryProducts;
