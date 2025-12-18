import React, { useState, useEffect } from "react";

export default function Checkout() {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'card'
  
  const [shippingAddress, setShippingAddress] = useState({
    details: '',
    phone: '',
    city: ''
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        setError('Please login to checkout');
        setLoading(false);
        return;
      }

      const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: { 'token': token }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setCart(data.data);
        setCartId(data.data._id);
      } else {
        setError('Failed to load cart');
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load cart');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleCashOrder = async () => {
    if (!shippingAddress.details || !shippingAddress.phone || !shippingAddress.city) {
      setError('Please fill all shipping details');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('userToken');

      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({ shippingAddress })
      });

      const data = await response.json();

      if (data.status === 'success') {
        window.location.href = '#/orders';
      } else {
        setError(data.message || 'Failed to create order');
      }
    } catch (err) {
      setError('Failed to create order');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCardPayment = async () => {
    if (!shippingAddress.details || !shippingAddress.phone || !shippingAddress.city) {
      setError('Please fill all shipping details');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('userToken');
      const url = window.location.origin;

      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          },
          body: JSON.stringify({ shippingAddress })
        }
      );

      const data = await response.json();

      if (data.status === 'success' && data.session?.url) {
        window.location.href = data.session.url;
      } else {
        setError(data.message || 'Failed to create checkout session');
      }
    } catch (err) {
      setError('Failed to create checkout session');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (paymentMethod === 'cash') {
      handleCashOrder();
    } else {
      handleCardPayment();
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
          <a href="#/products" className="text-blue-600 hover:underline">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Shipping Address</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Details
                </label>
                <input
                  type="text"
                  name="details"
                  value={shippingAddress.details}
                  onChange={handleChange}
                  placeholder="Street, Building, Apartment..."
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleChange}
                  placeholder="01012345678"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  placeholder="Cairo"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Method</h2>
            
            <div className="space-y-3">
              <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-semibold">Cash on Delivery</div>
                  <div className="text-sm text-gray-500">Pay when you receive</div>
                </div>
              </label>

              <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-semibold">Credit/Debit Card</div>
                  <div className="text-sm text-gray-500">Pay online securely</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
            
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cart.products.map((item) => (
                <div key={item._id} className="flex gap-3 text-sm">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium line-clamp-2">{item.product.title}</p>
                    <p className="text-gray-500">Qty: {item.count}</p>
                  </div>
                  <p className="font-semibold">{item.price} EGP</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{cart.totalCartPrice} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-blue-600">{cart.totalCartPrice} EGP</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-6 disabled:bg-blue-300"
            >
              {submitting ? 'Processing...' : paymentMethod === 'cash' ? 'Place Order' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}