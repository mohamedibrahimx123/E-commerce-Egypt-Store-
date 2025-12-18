import React, { useState, useEffect } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
      const data = await response.json();
      
      if (data.data) {
        setCategories(data.data);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load categories');
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading categories...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    return <CategoryDetails categoryId={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => handleCategoryClick(cat._id)}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <img 
              src={cat.image} 
              alt={cat.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-center text-gray-800">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryDetails({ categoryId, onBack }) {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategoryDetails();
  }, [categoryId]);

  const fetchCategoryDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch category details
      const categoryResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`);
      const categoryData = await categoryResponse.json();
      
      if (categoryData.data) {
        setCategory(categoryData.data);
      }

      // Fetch products for this category
      const productsResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
      const productsData = await productsResponse.json();
      
      if (productsData.data) {
        setProducts(productsData.data);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load category details');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        ← Back to Categories
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">
          {category ? category.name : 'Category'}
        </h1>
        <p className="text-gray-600">{products.length} products found</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No products found in this category
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={product.imageCover} 
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
                  {product.title}
                </h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold text-blue-600">
                    {product.price} EGP
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm text-gray-600">
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}