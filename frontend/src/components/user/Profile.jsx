import { useState, useEffect } from "react";
import axios from "axios";
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
  // Default values as placeholders (will be overridden by API data)
  avatarSrc = "/api/placeholder/150/150",
}) {
  const [activeTab, setActiveTab] = useState("User info");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch user profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });
      setUserData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle profile update
  const handleSaveChanges = async () => {
    try {
      setIsUpdating(true);
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        address: userData.address
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth implementation
        }
      });
      
      setUserData(response.data);
      alert('Profile updated successfully!'); // You can replace this with a toast notification
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const tabs = [
    {
      id: "User info",
      icon: <User size={20} className="text-gray-500" />,
      content: (
        <div className="flex-1 p-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                  onClick={fetchUserProfile}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Profile header with avatar */}
              <div className="flex justify-center relative mb-10">
                <div className="relative">
                  <img
                    src={avatarSrc}
                    alt={userData.name || 'User'}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-2 shadow-md">
                    <Edit size={18} className="text-white" />
                  </button>
                </div>
              </div>

              {/* User info */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">{userData.name || 'User Name'}</h2>
                <p className="text-gray-500">{userData.address || 'Location not set'}</p>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <div className="col-span-2">
                  <label className="block text-gray-500 text-sm mb-1">Full Name</label>
                  <input
                    type="text"
                    value={userData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-gray-500 text-sm mb-1">Email Address</label>
                  <input
                    type="email"
                    value={userData.email || ''}
                    placeholder="Email Address"
                    disabled
                    className="w-full p-3 bg-gray-100 rounded-lg border border-gray-200 text-gray-500 cursor-not-allowed"
                    title="Email cannot be changed"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be modified</p>
                </div>

                <div>
                  <label className="block text-gray-500 text-sm mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={userData.phoneNumber || ''}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 text-sm mb-1">Address</label>
                  <input
                    type="text"
                    value={userData.address || ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your address"
                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Save button */}
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={handleSaveChanges}
                  disabled={isUpdating}
                  className="bg-orange-500 text-white font-medium rounded-full py-3 px-8 hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </>
          )}
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
        <SidebarUser />
        {/* Main content area that changes based on active tab */}
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}