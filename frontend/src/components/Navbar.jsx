import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 px-5 py-2 flex items-center justify-between">
      {/* Left Side - Logo */}
      <div className="flex items-center gap-3">
        <img className="h-[40px]" src="/logo.png" alt="logo" />
        <span className="text-xl font-semibold text-gray-700">BrandName</span>
      </div>

      {/* Center - Navigation Links */}
      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
        <Link>About Us</Link>
        <Link>Contact Us</Link>
      </ul>

      {/* Right Side - Icons */}
      <div className="flex items-center gap-4">
        <img
          className="h-[30px] hover:scale-110 transition-transform"
          src="/cart.png"
          alt="Cart"
        />
        <img
          className="h-[30px] hover:scale-110 transition-transform"
          src="/user.png"
          alt="User"
        />
      </div>

      {/* Mobile Menu Button (Optional) */}
      <div className="md:hidden">
        <button className="text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
