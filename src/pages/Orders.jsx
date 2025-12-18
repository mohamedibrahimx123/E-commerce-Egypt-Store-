import React, { useState, useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      if (!userId) {
        setError('Please login to view orders');
        setLoading(false);
        return;
      }

      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load orders');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading orders...</div>
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
              <a href="/login" className="text-blue-600 underline">Go to Login</a>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">Start shopping to place your first order</p>
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
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-semibold text-gray-800">#{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-800">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-semibold text-blue-600 text-lg">{order.totalOrderPrice} EGP</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    order.isDelivered 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.isDelivered ? 'Delivered' : 'Processing'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    order.isPaid 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {order.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <h3 className="font-semibold text-gray-800 mb-4">Shipping Address</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Details:</span> {order.shippingAddress.details}</p>
                <p><span className="font-medium">Phone:</span> {order.shippingAddress.phone}</p>
                <p><span className="font-medium">City:</span> {order.shippingAddress.city}</p>
              </div>

              <h3 className="font-semibold text-gray-800 mt-6 mb-4">Items ({order.cartItems.length})</h3>
              <div className="space-y-3">
                {order.cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.product.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.product.category?.name} • {item.product.brand?.name}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-600">Qty: {item.count}</span>
                        <span className="text-sm font-semibold text-blue-600">{item.price} EGP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">Payment Method:</span>
                  <span className="font-semibold text-gray-800">
                    {order.paymentMethodType === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}