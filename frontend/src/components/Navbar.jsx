import React, { useState, useRef, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Settings,
  LogIn,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchInputRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();

  // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setProfileDropdownOpen(false);
    navigate("/");
  };

  // Focus the search input when the search bar opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchOpen &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        !event.target.closest("button[data-search-toggle]")
      ) {
        setSearchOpen(false);
      }

      if (
        profileDropdownOpen &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        !event.target.closest("div[data-profile-toggle]")
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen, profileDropdownOpen]);

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo */}
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <img
                  className="h-10 w-auto"
                  src="/logo.png" // Replace with your actual logo path
                  alt="logo"
                />
                <span className="text-xl font-bold text-gray-800 hidden sm:block">
                  BrandName
                </span>
              </Link>
            </div>

            {/* Center - Navigation Links (Hidden on Mobile) */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-black hover:border-b-2 hover:border-black px-2 py-1 text-sm font-medium transition-all duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-black hover:border-b-2 hover:border-black px-2 py-1 text-sm font-medium transition-all duration-200"
                >
                  Products
                </Link>
                <Link
                  to="/category"
                  className="text-gray-700 hover:text-black hover:border-b-2 hover:border-black px-2 py-1 text-sm font-medium transition-all duration-200"
                >
                  Categories
                </Link>
                <Link
                  to="/about-us"
                  className="text-gray-700 hover:text-black hover:border-b-2 hover:border-black px-2 py-1 text-sm font-medium transition-all duration-200"
                >
                  About Us
                </Link>
                <Link
                  to="/contact-us"
                  className="text-gray-700 hover:text-black hover:border-b-2 hover:border-black px-2 py-1 text-sm font-medium transition-all duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Side - Icons */}
            <div className="flex items-center space-x-4">
              <button
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
                onClick={toggleSearch}
                data-search-toggle
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Conditional rendering based on login status */}
              {isLoggedIn ? (
                <>
                  {/* Only show these buttons when logged in */}
                  <Link
                    to="/wishlist"
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 hidden sm:block"
                    aria-label="Wishlist"
                  >
                    <Heart size={20} />
                  </Link>

                  <Link
                    to="/cart"
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 relative"
                    aria-label="Cart"
                  >
                    <ShoppingBag size={20} />
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                      3
                    </span>
                  </Link>

                  {/* Profile Dropdown - Only when logged in */}
                  <div
                    className="relative hidden sm:block"
                    ref={profileDropdownRef}
                  >
                    <div
                      className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 flex items-center cursor-pointer"
                      onClick={toggleProfileDropdown}
                      data-profile-toggle
                      aria-label="User profile"
                    >
                      <User size={20} />
                    </div>

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
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <User size={16} className="mr-3" />
                            Your Profile
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <Settings size={16} className="mr-3" />
                            Settings
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <LogOut size={16} className="mr-3" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Show login button when not logged in */
                <Link
                  to="/signin"
                  className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors duration-200 hidden sm:flex items-center"
                >
                  <LogIn size={16} className="mr-2" />
                  Login
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
                onClick={toggleSidebar}
                aria-label="Menu"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Search Bar - Expandable */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              searchOpen ? "max-h-16 opacity-100 mb-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500   sm:text-sm"
                placeholder="Search for products..."
              />
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
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="py-4">
            {/* Search in Mobile Sidebar */}
            <div className="px-4 mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2  sm:text-sm"
                  placeholder="Search for products..."
                />
              </div>
            </div>

            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                className="flex items-center justify-between text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium"
                onClick={toggleSidebar}
              >
                Home
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/products"
                className="flex items-center justify-between text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium"
                onClick={toggleSidebar}
              >
                Products
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/categories"
                className="flex items-center justify-between text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium"
                onClick={toggleSidebar}
              >
                Categories
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/about-us"
                className="flex items-center justify-between text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium"
                onClick={toggleSidebar}
              >
                About Us
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/contact-us"
                className="flex items-center justify-between text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium"
                onClick={toggleSidebar}
              >
                Contact Us
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* Account section - conditional based on login status */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="px-4 py-2">
                {isLoggedIn ? (
                  <>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Your Account
                    </h3>
                    <div className="mt-3 space-y-1">
                      <Link
                        to="/profile"
                        className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium w-full"
                        onClick={toggleSidebar}
                      >
                        <User size={18} className="mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium w-full"
                        onClick={toggleSidebar}
                      >
                        <Heart size={18} className="mr-3" />
                        Wishlist
                      </Link>
                      <Link
                        to="/cart"
                        className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium w-full"
                        onClick={toggleSidebar}
                      >
                        <ShoppingBag size={18} className="mr-3" />
                        Cart
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium w-full"
                        onClick={toggleSidebar}
                      >
                        <Settings size={18} className="mr-3" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          toggleSidebar();
                        }}
                        className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium w-full"
                      >
                        <LogOut size={18} className="mr-3" />
                        Sign out
                      </button>
                    </div>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center bg-black text-white rounded-md px-3 py-2 text-base font-medium w-full"
                    onClick={toggleSidebar}
                  >
                    <LogIn size={18} className="mr-3" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
