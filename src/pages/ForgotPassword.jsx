import React, { useState } from "react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const [formData, setFormData] = useState({
    email: '',
    resetCode: '',
    newPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSendCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json();

      if (data.statusMsg === 'success') {
        setSuccess('Reset code sent to your email!');
        setStep(2);
      } else {
        setError(data.message || 'Failed to send reset code.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resetCode: formData.resetCode })
      });

      const data = await response.json();

      if (data.status === 'Success') {
        setSuccess('Code verified! Enter your new password.');
        setStep(3);
      } else {
        setError(data.message || 'Invalid reset code.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();

      if (data.token) {
        setSuccess('Password reset successful! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '#/login';
        }, 2000);
      } else {
        setError(data.message || 'Failed to reset password.');
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
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Forgot Password</h1>
        
        {step === 1 && (
          <p className="text-sm text-gray-500 mb-6">
            Enter your email and we will send you a reset code.
          </p>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        {step === 1 && (
          <>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />

            <button
              onClick={handleSendCode}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Enter the 6-digit code sent to {formData.email}
            </p>
            
            <input
              type="text"
              name="resetCode"
              value={formData.resetCode}
              onChange={handleChange}
              placeholder="Reset Code"
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={6}
              required
              disabled={loading}
            />

            <button
              onClick={handleVerifyCode}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300 mb-2"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full text-blue-600 py-2 text-sm hover:underline"
              disabled={loading}
            >
              Back to Email
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}

        <div className="text-center mt-4">
          <a href="#/login" className="text-sm text-blue-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}