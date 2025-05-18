import React, { useState } from "react";
import {
  MessageSquareWarning,
  PackageSearch,
  ListOrdered,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-40"
      } min-h-screen bg-gray-800 text-white shadow-lg transition-all duration-300 relative`}
    >
      <div
        className={`p-4 border-b border-gray-700 flex ${
          collapsed ? "justify-center" : "justify-between"
        } items-center`}
      >
        {!collapsed && <h2 className="text-xl font-bold">Admin Panel</h2>}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-700 focus:outline-none"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          <li>
            <Link
              to="/admin-dashboard"
              className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <MessageSquareWarning
                className={collapsed ? "" : "mr-3"}
                color="#60A5FA"
                size={20}
              />
              {!collapsed && <span className="font-medium">Reports</span>}
            </Link>
          </li>

          <li>
            <Link
              to="/admin-products"
              className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <PackageSearch
                className={collapsed ? "" : "mr-3"}
                color="#10B981"
                size={20}
              />
              {!collapsed && <span className="font-medium">Products</span>}
            </Link>
          </li>

          <li>
            <Link
              to="/admin-orders"
              className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <ListOrdered
                className={collapsed ? "" : "mr-3"}
                color="#FBBF24"
                size={20}
              />
              {!collapsed && <span className="font-medium">Orders</span>}
            </Link>
          </li>

          <li className="mt-8">
            <Link
              to="/admin-settings"
              className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <Settings
                className={collapsed ? "" : "mr-3"}
                color="#9CA3AF"
                size={20}
              />
              {!collapsed && <span className="font-medium">Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* {!collapsed && (
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-sm font-bold">A</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Sidebar;
