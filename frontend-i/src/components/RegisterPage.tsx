'use client';
import React, { useState, FormEvent } from "react";
import { FaTimes } from "react-icons/fa";
import { registerUser, loginUser } from '../../utils/api';
import Link from "next/link";

const RegisterPage: React.FC = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const handleRegisterClick = () => {
    setShowSignup(true);
    setShowLogin(false);
    setMessage(null);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
    setMessage(null);
  };

  const handleClose = () => {
    setShowSignup(false);
    setShowLogin(false);
    setMessage(null);
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userData = { name, email, password, confirmPassword };
      const response = await registerUser(userData);
      if (response.success) {
        setMessage('User registered successfully');
        setMessageType('success');
      } else {
        setMessage(response.message || 'Registration error');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Registration error');
      setMessageType('error');
    }
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await loginUser(userData);
      if (response.success) {
        setMessage('User logged in successfully');
        setMessageType('success');
      } else {
        setMessage(response.message || 'Login error');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Login error');
      setMessageType('error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-950 tracking-wide font-sans mb-8">Register Here</h1>
      <div className="flex space-x-4">
        <button
          onClick={handleRegisterClick}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
        >
          Register
        </button>
        <button
          onClick={handleLoginClick}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
        >
          Login
        </button>
      </div>

      {/* Display Alert Message */}
      {message && (
        <div className={`mt-4 px-4 py-2 rounded ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Sign Up</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-800">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-gray-800">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                />
              </div>
              <Link
                href={"/home"}
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
              >
                Login
              </Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
