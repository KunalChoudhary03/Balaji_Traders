import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await getCategories();
      setCategories(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (categories.length === 0) {
    return <div className="text-center py-8 text-gray-600">No categories found. Add one above!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div key={category._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
            {category.description && (
              <p className="text-gray-600 text-sm">{category.description}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              ID: {category._id}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;