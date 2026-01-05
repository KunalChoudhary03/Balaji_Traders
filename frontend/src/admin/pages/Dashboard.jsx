import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('categories');
  const [refreshKey, setRefreshKey] = useState(0);
  const [pricesVisible, setPricesVisible] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    checkPriceVisibility();
  }, [refreshKey]);

  const checkPriceVisibility = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
      const { data } = await axios.get(`${API_BASE_URL}/product/all`);
      if (data.length > 0 && data[0].variants && data[0].variants.length > 0) {
        setPricesVisible(data[0].variants[0].showPrice);
      }
    } catch (error) {
      console.error('Failed to check price visibility:', error);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleToggleAllPrices = async () => {
    try {
      setToggling(true);
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
      await axios.patch(`${API_BASE_URL}/product/toggle-all-prices`);
      setPricesVisible(!pricesVisible);
      handleRefresh();
    } catch (error) {
      console.error('Failed to toggle prices:', error);
    } finally {
      setToggling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          
          {/* Global Price Toggle Button */}
          <button
            onClick={handleToggleAllPrices}
            disabled={toggling}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors shadow-md ${
              pricesVisible
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {toggling 
              ? ' Updating...' 
              : pricesVisible 
                ? ' Hide Prices ' 
                : ' Show Prices '
            }
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'categories'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'products'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Products
          </button>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'categories' ? (
            <>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Category</h2>
                <CategoryForm onSuccess={handleRefresh} />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">All Categories</h2>
                <CategoryList key={refreshKey} />
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h2>
                <ProductForm onSuccess={handleRefresh} />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">All Products</h2>
                <ProductList key={refreshKey} onUpdate={handleRefresh} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;