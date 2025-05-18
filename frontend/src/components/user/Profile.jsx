import { useState } from "react";
import {
  User,
  Heart,
  Star,
  Settings,
  Bell,
  Edit,
  ArrowUpRight,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import SidebarUser from "./SidebarUser";

export default function Profile({
  // Default values as placeholders
  userName = "Sara Tancredi",
  userLocation = "New York, USA",
  firstName = "Sara",
  lastName = "Tancredi",
  email = "SaraTancredi@gmail",
  phone = "(+98) 9123728167",
  location = "e.g. New York, USA",
  postalCode = "23728167",
  avatarSrc = "/api/placeholder/150/150",
}) {
  // State for handling the active tab
  const [activeTab, setActiveTab] = useState("User info");

  // List of tabs with corresponding content components
  const tabs = [
    {
      id: "User info",
      icon: <User size={20} className="text-gray-500" />,
      content: (
        <div className="flex-1 p-8">
          {/* Profile header with avatar */}
          <div className="flex justify-center relative mb-10">
            <div className="relative">
              <img
                src={avatarSrc}
                alt={userName}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-2 shadow-md">
                <Edit size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* User info */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">{userName}</h2>
            <p className="text-gray-500">{userLocation}</p>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            <div>
              <label className="block text-gray-500 text-sm mb-1">Name</label>
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-500 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-500 text-sm mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                placeholder="Email Address"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-500 text-sm mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                placeholder="Phone Number"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-500 text-sm mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                placeholder="City, Country"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-500 text-sm mb-1">
                Postal Code
              </label>
              <input
                type="text"
                value={postalCode}
                placeholder="Postal Code"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Save button */}
          <div className="mt-10 flex justify-center">
            <button className="bg-orange-500 text-white font-medium rounded-full py-3 px-8 hover:bg-orange-600 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "Favorites",
      icon: <Heart size={20} className="text-gray-500" />,
      content: (
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Favorites
          </h2>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Your favorites will appear here</p>
          </div>
        </div>
      ),
    },
    {
      id: "Watchlist",
      icon: <Star size={20} className="text-gray-500" />,
      content: (
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Watchlist
          </h2>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Star size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              Your watchlist items will appear here
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "Setting",
      icon: <Settings size={20} className="text-gray-500" />,
      content: (
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Settings
          </h2>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Settings size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Configure your account settings</p>
          </div>
        </div>
      ),
    },
    {
      id: "Notifications",
      icon: <Bell size={20} className="text-gray-500" />,
      content: (
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Notifications
          </h2>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Your notifications will appear here</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-screen mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
      {/* Main content */}
      <div className="flex">
        <SidebarUser></SidebarUser>

        {/* Main content area that changes based on active tab */}
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>

    </div>
  );
}
