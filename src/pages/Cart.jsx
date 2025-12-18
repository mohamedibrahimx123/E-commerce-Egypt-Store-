import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token }
    })
      .then(res => res.json())
      .then(data => setCart(data.data));
  }, []);

  if (!cart) return <p className="p-10">Loading cart...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>

      {cart.products.map(item => (
        <div key={item._id} className="flex gap-4 mb-4">
          <img src={item.product.imageCover} className="w-20 rounded" />
          <div>
            <p className="font-semibold">{item.product.title}</p>
            <p>{item.price} EGP</p>
          </div>
        </div>
      ))}

      <Link
        to="/checkout"
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Checkout
      </Link>
    </div>
  );
}
