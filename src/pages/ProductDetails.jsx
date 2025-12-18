import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data.data));
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem("userToken");

    await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token
      },
      body: JSON.stringify({ productId: id })
    });

    navigate("/cart");
  };

  if (!product) return <p className="p-10">Loading...</p>;

  return (
    <div className="container mx-auto p-6 grid md:grid-cols-2 gap-6">
      <img src={product.imageCover} className="rounded" />

      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-500 mt-2">{product.description}</p>

        <p className="text-2xl font-bold text-blue-600 mt-4">
          {product.price} EGP
        </p>

        <button
          onClick={addToCart}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
