import React, { useState, useEffect } from "react";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
      const data = await response.json();
      
      if (data.data) {
        setBrands(data.data);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load brands');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading brands...</div>
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Brands</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <a
            key={brand._id}
            href={`#/brand/${brand._id}`}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 flex flex-col items-center"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="h-20 w-20 object-contain mb-4"
            />
            <h3 className="font-semibold text-center text-gray-800">{brand.name}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}