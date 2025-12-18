import React, { useState } from "react";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    password: '',
    rePassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (formData.password !== formData.rePassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      const response = await fetch('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          password: formData.password,
          rePassword: formData.rePassword
        })
      });

      const data = await response.json();

      if (data.message === 'success' && data.token) {
        // Update token in localStorage
        localStorage.setItem('userToken', data.token);
        
        setSuccess(true);
        
        // Clear form
        setFormData({
          currentPassword: '',
          password: '',
          rePassword: ''
        });

        setTimeout(() => {
          window.location.href = '#/';
        }, 2000);
      } else {
        setError(data.message || 'Failed to change password. Please check your current password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Change Password</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">
            Password changed successfully! Redirecting...
          </div>
        )}

        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={loading}
        />

        <input
          type="password"
          name="rePassword"
          value={formData.rePassword}
          onChange={handleChange}
          placeholder="Confirm New Password"
          className="w-full p-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={loading}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300 mb-4"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>

        <div className="text-center">
          <a href="#/" className="text-sm text-blue-600 hover:underline">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}