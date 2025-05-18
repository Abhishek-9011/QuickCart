import React from "react";
import  { useState } from "react";
import {
  User,
  Heart,
  Star,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function SidebarUser() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("User info");

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const tabs = [
    { id: "User info", icon: <User size={20} />, path: "/user-info" },
    { id: "Favorites", icon: <Heart size={20} />, path: "/favorites" },
    { id: "Watchlist", icon: <Star size={20} />, path: "/watchlist" },
    { id: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { id: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
  ];

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-white border-r border-gray-200 min-h-[600px] transition-all duration-300 relative`}
    >
      <div
        className={`p-6 border-b border-gray-200 flex ${
          collapsed ? "justify-center" : "justify-between"
        } items-center`}
      >
        {!collapsed && (
          <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-100 focus:outline-none text-gray-500"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-6 px-2">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <Link
                to={tab.path}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  collapsed ? "justify-center" : ""
                } ${
                  activeTab === tab.id
                    ? "bg-orange-50 text-orange-500"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className={collapsed ? "" : "mr-3"}>
                  {React.cloneElement(tab.icon, {
                    className: activeTab === tab.id ? "text-orange-500" : "",
                  })}
                </span>
                {!collapsed && (
                  <span className="font-medium">{tab.id}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SidebarUser;