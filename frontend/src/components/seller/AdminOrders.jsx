import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import {
  Search,
  Filter,
  RefreshCw,
  Download,
  Plus,
  Trash,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  CheckCircle,
  XCircle,
  Truck,
  Clock,
  Loader2
} from "lucide-react";

const AdminOrders = () => {
  // Sample orders with expanded data
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(null);

  // Mock data fetch with loading state
  useEffect(() => {
    const fetchOrders = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setOrders([
          {
            id: 1,
            customerName: "John Doe",
            customerEmail: "john@example.com",
            paymentMode: "UPI",
            status: "Processing",
            date: "2025-03-02",
            total: 149.99,
            items: 3,
            address: "123 Main St, New York, NY 10001",
            products: [
              { name: "iPhone 14 Pro", price: 999, quantity: 1 },
              { name: "AirPods Pro", price: 249, quantity: 2 }
            ]
          },
          {
            id: 2,
            customerName: "Jane Smith",
            customerEmail: "jane@example.com",
            paymentMode: "Cash on Delivery",
            status: "Out for Delivery",
            date: "2025-03-04",
            total: 79.5,
            items: 2,
            address: "456 Oak Ave, Los Angeles, CA 90001",
            products: [
              { name: "MacBook Air", price: 999, quantity: 1 },
              { name: "USB-C Cable", price: 19.5, quantity: 1 }
            ]
          },
          {
            id: 3,
            customerName: "Michael Johnson",
            customerEmail: "michael@example.com",
            paymentMode: "UPI",
            status: "Delivered",
            date: "2025-03-01",
            total: 299.99,
            items: 5,
            address: "789 Pine Rd, Chicago, IL 60601",
            products: [
              { name: "iPad Pro", price: 799, quantity: 1 },
              { name: "Apple Pencil", price: 129, quantity: 1 },
              { name: "Smart Keyboard", price: 179, quantity: 1 }
            ]
          },
          {
            id: 4,
            customerName: "Sarah Wilson",
            customerEmail: "sarah@example.com",
            paymentMode: "Credit Card",
            status: "Processing",
            date: "2025-03-07",
            total: 124.95,
            items: 1,
            address: "321 Elm Blvd, Houston, TX 77001",
            products: [
              { name: "Apple Watch Series 8", price: 399, quantity: 1 }
            ]
          },
          {
            id: 5,
            customerName: "Robert Brown",
            customerEmail: "robert@example.com",
            paymentMode: "UPI",
            status: "Cancelled",
            date: "2025-03-05",
            total: 199.99,
            items: 4,
            address: "654 Maple Ln, Phoenix, AZ 85001",
            products: [
              { name: "AirTag", price: 29, quantity: 4 }
            ]
          },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchOrders();
  }, []);

  // Sort orders
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Filter orders based on search term and status filter
  const filteredOrders = sortedOrders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  // Pagination
  const itemsPerPage = 5;
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Function to update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setShowStatusDropdown(null);
  };

  // Function to delete an order
  const deleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    }
  };

  // Function to handle order selection
  const toggleOrderSelection = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Function to handle bulk selection
  const toggleSelectAll = () => {
    if (selectedOrders.length === currentOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(currentOrders.map((order) => order.id));
    }
  };

  // Function to delete selected orders
  const deleteSelectedOrders = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedOrders.length} orders?`)) {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => !selectedOrders.includes(order.id))
      );
      setSelectedOrders([]);
    }
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case "Processing":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <Clock size={14} className="mr-1" />
        };
      case "Out for Delivery":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: <Truck size={14} className="mr-1" />
        };
      case "Delivered":
        return {
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle size={14} className="mr-1" />
        };
      case "Cancelled":
        return {
          color: "bg-red-100 text-red-800",
          icon: <XCircle size={14} className="mr-1" />
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: null
        };
    }
  };

  // Request sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  // Status options
  const statusOptions = ["Processing", "Out for Delivery", "Delivered", "Cancelled"];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 animate-fade-in-down">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Order Management
              </h2>
              <p className="text-gray-600">View and manage customer orders</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95">
                <Plus size={16} className="mr-2" />
                New Order
              </button>
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                <RefreshCw size={16} className="mr-2" />
                Refresh
              </button>
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                <Download size={16} className="mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-fade-in">
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
              <h3 className="text-gray-500 font-medium">Total Orders</h3>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
              <h3 className="text-gray-500 font-medium">Processing</h3>
              <p className="text-2xl font-bold">
                {orders.filter(o => o.status === "Processing").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
              <h3 className="text-gray-500 font-medium">Delivered</h3>
              <p className="text-2xl font-bold">
                {orders.filter(o => o.status === "Delivered").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow">
              <h3 className="text-gray-500 font-medium">Cancelled</h3>
              <p className="text-2xl font-bold">
                {orders.filter(o => o.status === "Cancelled").length}
              </p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 animate-fade-in-up">
            <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[240px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search orders by ID, name or email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <Filter size={16} />
                    <span>Filters</span>
                    {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200 animate-fade-in-up">
                      <div className="p-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          value={statusFilter}
                          onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                        >
                          <option value="All">All Statuses</option>
                          <option value="Processing">Processing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in-up">
            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <Loader2 className="animate-spin text-blue-500" size={32} />
              </div>
            ) : currentOrders.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            checked={
                              selectedOrders.length === currentOrders.length &&
                              currentOrders.length > 0
                            }
                            onChange={toggleSelectAll}
                          />
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort('id')}
                        >
                          <div className="flex items-center gap-1">
                            Order ID
                            {getSortIndicator('id')}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort('customerName')}
                        >
                          <div className="flex items-center gap-1">
                            Customer
                            {getSortIndicator('customerName')}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort('date')}
                        >
                          <div className="flex items-center gap-1">
                            Date
                            {getSortIndicator('date')}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort('total')}
                        >
                          <div className="flex items-center gap-1">
                            Total
                            {getSortIndicator('total')}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentOrders.map((order) => {
                        const statusInfo = getStatusInfo(order.status);
                        return (
                          <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                checked={selectedOrders.includes(order.id)}
                                onChange={() => toggleOrderSelection(order.id)}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                              #{order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="font-medium">{order.customerName}</div>
                                <div className="text-sm text-gray-500">{order.customerEmail}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                              {order.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                              {order.items}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100">
                                {order.paymentMode}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.color}`}
                              >
                                {statusInfo.icon}
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <div className="relative">
                                  <button
                                    onClick={() => setShowStatusDropdown(showStatusDropdown === order.id ? null : order.id)}
                                    className="flex items-center px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                  >
                                    <span>Update</span>
                                    <ChevronDown size={16} className="ml-1" />
                                  </button>
                                  
                                  {showStatusDropdown === order.id && (
                                    <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200 animate-fade-in-up">
                                      {statusOptions.map((status) => (
                                        <button
                                          key={status}
                                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                            order.status === status ? "bg-blue-50 text-blue-600" : "text-gray-700"
                                          }`}
                                          onClick={() => updateOrderStatus(order.id, status)}
                                        >
                                          {status}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={() => deleteOrder(order.id)}
                                  className="p-2 text-red-600 hover:text-red-800 transition-colors"
                                  title="Delete"
                                >
                                  <Trash size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
                  <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstOrder + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastOrder, filteredOrders.length)}
                    </span>{" "}
                    of <span className="font-medium">{filteredOrders.length}</span>{" "}
                    orders
                  </div>
                  <div className="flex gap-2">
                    {selectedOrders.length > 0 && (
                      <button 
                        onClick={deleteSelectedOrders}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        Delete Selected ({selectedOrders.length})
                      </button>
                    )}
                    <div className="flex">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-l-md border ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        Previous
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-3 py-1 border-t border-b ${
                            currentPage === i + 1
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-r-md border ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">
                  No orders found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;