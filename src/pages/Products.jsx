import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center p-10">Loading products...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded-lg p-4">
            <img
              src={product.imageCover}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="mt-3 font-semibold line-clamp-2">
              {product.title}
            </h3>

            <p className="text-sm text-gray-500">
              {product.category?.name}
            </p>

            <p className="font-bold text-blue-600 mt-2">
              {product.price} EGP
            </p>

            <Link
              to={`/product/${product._id}`}
              className="block mt-3 text-center bg-blue-600 text-white py-2 rounded"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
