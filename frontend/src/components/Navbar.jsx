import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  LogOut,
  Settings,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo */}
            <div className="flex items-center gap-2">
              <img
                className="h-10 w-auto"
                src="/api/placeholder/40/40"
                alt="logo"
              />
              <span className="text-xl font-bold text-gray-800 hidden sm:block">
                BrandName
              </span>
            </div>

            {/* Center - Navigation Links (Hidden on Mobile) */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link
                  to={"/"}
                  className="text-gray-700 hover:text-black hover:border-b-2 hover:border-black px-2 py-1 text-sm font-medium transition-all duration-200"
                >
                  Home
                </Link>
                <Link
                  to={"/products"}
                  className="text-gray-700 hover:text-black hover:border-b-2 hover:border-black px-2 py-1 text-sm font-medium transition-all duration-200"
                >
                  Products
                </Link>
                <Link
                  to={"/"}
                  className="text-gray-700 hover:text-black hover:border-b-2 hover:border-black px-2 py-1 text-sm font-medium transition-all duration-200"
                >
                  Categories
                </Link>
                <Link
                  to={"/"}
                  className="text-gray-700 hover:text-black hover:border-b-2 hover:border-black px-2 py-1 text-sm font-medium transition-all duration-200"
                >
                  About Us
                </Link>
                <Link
                  to={"/"}
                  className="text-gray-700 hover:text-black hover:border-b-2 hover:border-black px-2 py-1 text-sm font-medium transition-all duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Side - Icons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-200">
                <Search size={20} />
              </button>

              {/* Profile Dropdown */}
              <div className="relative hidden sm:block">
                <button
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 flex items-center"
                  onClick={toggleProfileDropdown}
                >
                  <User size={20} />
                
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">
                          Signed in as
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          user@example.com
                        </p>
                      </div>

                      <Link
                        to="/user-profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User size={16} className="mr-3" />
                        Your Profile
                      </Link>
                      <Link
                        to="/logout"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign out
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <button className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 hidden sm:block">
                <Heart size={20} />
              </button>

              <button className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 relative">
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  3
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
                onClick={toggleSidebar}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      >
        <div
          className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
              onClick={toggleSidebar}
            >
              <X size={24} />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="py-4">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                className="flex items-center justify-between text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium"
              >
                Home
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/products"
                className="flex items-center justify-between text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium"
              >
                Products
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/categories"
                className="flex items-center justify-between text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium"
              >
                Categories
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/collections"
                className="flex items-center justify-between text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium"
              >
                Collections
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="flex items-center justify-between text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium"
              >
                Contact Us
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* Account Icons on Mobile */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="px-4 py-2">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Your Account
                </h3>
                <div className="mt-3 space-y-1">
                  <Link
                    to="/profile"
                    className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium w-full"
                  >
                    <User size={18} className="mr-3" />
                    Profile
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium w-full"
                  >
                    <Heart size={18} className="mr-3" />
                    Wishlist
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium w-full"
                  >
                    <Settings size={18} className="mr-3" />
                    Settings
                  </Link>
                  <Link
                    to="/logout"
                    className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium w-full"
                  >
                    <LogOut size={18} className="mr-3" />
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
