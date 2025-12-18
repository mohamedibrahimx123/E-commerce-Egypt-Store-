import { Link } from "react-router-dom";
import React, { useState } from "react";
import { ShoppingCart, Heart, Package, Menu, X } from "lucide-react";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold tracking-tight">SmartShop</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="/products" className="px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-200">
              Products
            </a>
            <a href="/brands" className="px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-200">
              Brands
            </a>
            <a href="/categories" className="px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-200">
              Categories
            </a>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-2">
            <a href="/cart" className="p-2 rounded-lg hover:bg-blue-500 transition-colors duration-200 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </a>
            <a href="/wishlist" className="p-2 rounded-lg hover:bg-blue-500 transition-colors duration-200 relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                5
              </span>
            </a>
            <a href="/orders" className="p-2 rounded-lg hover:bg-blue-500 transition-colors duration-200">
              <Package className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-500 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="/products" className="block px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-200">
              Products
            </a>
            <a href="/brands" className="block px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-200">
              Brands
            </a>
            <a href="/categories" className="block px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-200">
              Categories
            </a>
            <div className="flex items-center space-x-2 px-4 pt-2">
              <a href="/cart" className="flex items-center space-x-2 px-4 py-2 bg-blue-500 rounded-lg flex-1">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart (3)</span>
              </a>
              <a href="/wishlist" className="flex items-center space-x-2 px-4 py-2 bg-blue-500 rounded-lg flex-1">
                <Heart className="w-5 h-5" />
                <span>Wishlist (5)</span>
              </a>
            </div>
            <a href="/orders" className="flex items-center space-x-2 px-4 py-2 mx-4 bg-blue-500 rounded-lg">
              <Package className="w-5 h-5" />
              <span>Orders</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
