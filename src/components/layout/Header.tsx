'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, UserIcon, Bars3Icon, HeartIcon, ArrowsRightLeftIcon, MapPinIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white">
      {/* Top Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm">
            <div className="flex items-center space-x-6">
              <Link href="/about" className="text-gray-600 hover:text-primary-600">About Us</Link>
              <Link href="/account" className="text-gray-600 hover:text-primary-600">My Account</Link>
              <Link href="/wishlist" className="text-gray-600 hover:text-primary-600">Wishlist</Link>
              <Link href="/order-tracking" className="text-gray-600 hover:text-primary-600">Order Tracking</Link>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-600">Need help? Call Us: + 1800 900</span>
              <div className="flex items-center space-x-1">
                <span className="text-gray-600">English</span>
                <ChevronDownIcon className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-gray-600">USD</span>
                <ChevronDownIcon className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <span className="text-2xl font-bold text-green-600">Nest</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="flex">
                <div className="relative">
                  <select className="appearance-none bg-white border border-r-0 border-gray-300 rounded-l-md px-4 py-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                    <option>Home & Garden</option>
                  </select>
                  <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search for items..."
                    className="w-full px-4 py-3 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <button className="bg-green-500 text-white px-6 py-3 rounded-r-md hover:bg-green-600 transition-colors">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Location & Actions */}
            <div className="flex items-center space-x-6">
              {/* Location */}
              <div className="flex items-center space-x-2 text-sm">
                <MapPinIcon className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-gray-600">Your Location</div>
                </div>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </div>

              {/* Compare */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <ArrowsRightLeftIcon className="h-6 w-6 text-gray-600" />
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </div>
                <span className="text-sm text-gray-600">Compare</span>
              </div>

              {/* Wishlist */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <HeartIcon className="h-6 w-6 text-gray-600" />
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    6
                  </span>
                </div>
                <span className="text-sm text-gray-600">Wishlist</span>
              </div>

              {/* Cart */}
              <Link href="/cart" className="flex items-center space-x-2">
                <div className="relative">
                  <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  <div className="text-gray-600">Cart</div>
                  <div className="font-semibold text-green-600">$0.00</div>
                </div>
              </Link>

              {/* User Account */}
              {isAuthenticated ? (
                <Link href="/profile" className="flex items-center space-x-2">
                  <UserIcon className="h-6 w-6 text-gray-600" />
                  <div className="text-sm">
                    <div className="text-gray-600">Account</div>
                    <div className="font-semibold">{user?.name}</div>
                  </div>
                </Link>
              ) : (
                <Link href="/signin" className="flex items-center space-x-2">
                  <UserIcon className="h-6 w-6 text-gray-600" />
                  <div className="text-sm">
                    <div className="text-gray-600">Account</div>
                    <div className="font-semibold">Login</div>
                  </div>
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-8 h-14">
            <div className="flex items-center space-x-2 text-white">
              <Bars3Icon className="h-5 w-5" />
              <span className="font-medium">Browse All Categories</span>
              <ChevronDownIcon className="h-4 w-4" />
            </div>
            <div className="hidden md:flex items-center space-x-8 text-white">
              <Link href="/" className="hover:text-green-200 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-green-200 transition-colors">About</Link>
              <Link href="/shop" className="hover:text-green-200 transition-colors">Shop</Link>
              <Link href="/vendors" className="hover:text-green-200 transition-colors">Vendors</Link>
              <Link href="/mega-menu" className="hover:text-green-200 transition-colors">Mega menu</Link>
              <Link href="/blog" className="hover:text-green-200 transition-colors">Blog</Link>
              <Link href="/pages" className="hover:text-green-200 transition-colors">Pages</Link>
              <Link href="/contact" className="hover:text-green-200 transition-colors">Contact</Link>
            </div>
            <div className="ml-auto flex items-center space-x-4 text-white">
              <span className="text-sm">📞 1900 - 888</span>
              <span className="text-sm">24/7 Support Center</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-700 hover:text-green-600">Home</Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-green-600">About</Link>
            <Link href="/shop" className="block py-2 text-gray-700 hover:text-green-600">Shop</Link>
            <Link href="/vendors" className="block py-2 text-gray-700 hover:text-green-600">Vendors</Link>
            <Link href="/blog" className="block py-2 text-gray-700 hover:text-green-600">Blog</Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-green-600">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}