import React, { useState, useEffect } from "react";

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [newAddress, setNewAddress] = useState({
    name: '',
    details: '',
    phone: '',
    city: ''
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        setError('Please login to view addresses');
        setLoading(false);
        return;
      }

      const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
        headers: { 'token': token }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setAddresses(data.data || []);
      } else {
        setError(data.message || 'Failed to load addresses');
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load addresses');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleAddAddress = async () => {
    if (!newAddress.name || !newAddress.details || !newAddress.phone || !newAddress.city) {
      setError('Please fill all fields');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('userToken');

      const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(newAddress)
      });

      const data = await response.json();

      if (data.status === 'success') {
        setAddresses(data.data || []);
        setNewAddress({ name: '', details: '', phone: '', city: '' });
        setShowAddForm(false);
      } else {
        setError(data.message || 'Failed to add address');
      }
    } catch (err) {
      setError('Failed to add address');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    try {
      const token = localStorage.getItem('userToken');

      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
        method: 'DELETE',
        headers: { 'token': token }
      });

      const data = await response.json();

      if (data.status === 'success') {
        setAddresses(data.data || []);
      }
    } catch (err) {
      console.error('Failed to delete address:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading addresses...</div>
        </div>
      </div>
    );
  }

  if (error && !showAddForm) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          {error.includes('login') && (
            <div className="mt-3">
              <a href="#/login" className="text-blue-600 underline">Go to Login</a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Addresses</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : '+ Add New Address'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {showAddForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Address</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Name/Label
              </label>
              <input
                type="text"
                name="name"
                value={newAddress.name}
                onChange={handleChange}
                placeholder="Home, Work, etc."
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleChange}
                placeholder="Cairo"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={newAddress.phone}
                onChange={handleChange}
                placeholder="01012345678"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Address
              </label>
              <textarea
                name="details"
                value={newAddress.details}
                onChange={handleChange}
                placeholder="Street, Building, Apartment..."
                rows="3"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleAddAddress}
            disabled={submitting}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {submitting ? 'Adding...' : 'Add Address'}
          </button>
        </div>
      )}

      {addresses.length === 0 && !showAddForm ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📍</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No addresses saved
          </h2>
          <p className="text-gray-500 mb-6">
            Add your first address to make checkout faster
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow relative"
            >
              <button
                onClick={() => handleDeleteAddress(address._id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                title="Delete address"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {address.name}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <p>{address.details}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <p>{address.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                    <p>{address.city}</p>
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