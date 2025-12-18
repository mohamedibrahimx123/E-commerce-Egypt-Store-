import React, { useState, useEffect } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      
      // Get token from localStorage
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        setError('Please login to view your wishlist');
        setLoading(false);
        return;
      }

      const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          'token': token
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'success' && data.data) {
        setWishlist(data.data);
      } else {
        setError(data.message || 'Failed to load wishlist');
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load wishlist');
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('userToken');
      
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'token': token
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Remove from local state
        setWishlist(wishlist.filter(item => item._id !== productId));
      }
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading wishlist...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          {error.includes('login') && (
            <div className="mt-3">
              <a href="/login" className="text-blue-600 underline">
                Go to Login
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Wishlist</h1>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Start adding products you love to your wishlist
          </p>
          <a
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
        <span className="text-gray-600">{wishlist.length} items</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div 
            key={product._id} 
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all relative"
          >
            <button
              onClick={() => removeFromWishlist(product._id)}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors z-10"
              title="Remove from wishlist"
            >
              <svg 
                className="w-5 h-5 text-red-500" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
              </svg>
            </button>

            <img 
              src={product.imageCover} 
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 h-12 line-clamp-2">
                {product.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">{product.category?.name}</span>
              </div>

              <div className="flex justify-between items-center mb-3">
                {product.priceAfterDiscount ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-600">
                      {product.priceAfterDiscount} EGP
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {product.price} EGP
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-blue-600">
                    {product.price} EGP
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm text-gray-600">
                    {product.ratingsAverage}
                  </span>
                </div>
                
                <a
                  href={`#/product/${product._id}`}
                  className="text-blue-600 text-sm hover:text-blue-800 font-medium"
                >
                  View Details →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}