import { useState } from "react";
import Sidebar from "../Sidebar";
import { Search, Filter, RefreshCw, Download, Plus, Trash } from "lucide-react";

const AdminOrders = () => {
  // Sample orders stored in the frontend with expanded data
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "John Doe",
      paymentMode: "UPI",
      status: "Processing",
      date: "2025-03-02",
      total: 149.99,
      items: 3,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      paymentMode: "Cash on Delivery",
      status: "Out for Delivery",
      date: "2025-03-04",
      total: 79.5,
      items: 2,
    },
    {
      id: 3,
      customerName: "Michael Johnson",
      paymentMode: "UPI",
      status: "Delivered",
      date: "2025-03-01",
      total: 299.99,
      items: 5,
    },
    {
      id: 4,
      customerName: "Sarah Wilson",
      paymentMode: "Credit Card",
      status: "Processing",
      date: "2025-03-07",
      total: 124.95,
      items: 1,
    },
    {
      id: 5,
      customerName: "Robert Brown",
      paymentMode: "UPI",
      status: "Cancelled",
      date: "2025-03-05",
      total: 199.99,
      items: 4,
    },
  ]);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Function to update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
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
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id));
    }
  };

  // Function to get status color class
  const getStatusColorClass = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Out for Delivery":
        return "bg-yellow-100 text-yellow-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);

    const matchesFilter =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Order Management
            </h2>
            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                <Plus size={16} className="mr-1" />
                New Order
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                <RefreshCw size={16} className="mr-1" />
                Refresh
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                <Download size={16} className="mr-1" />
                Export
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[240px]">
                <input
                  type="text"
                  placeholder="Search orders by ID or customer name..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter size={18} className="text-gray-500" />
                <select
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Processing">Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          checked={
                            selectedOrders.length === filteredOrders.length &&
                            filteredOrders.length > 0
                          }
                          onChange={toggleSelectAll}
                        />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => toggleOrderSelection(order.id)}
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {order.customerName}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                          {order.items}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                          {order.paymentMode}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColorClass(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <select
                              className="text-sm border rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={order.status}
                              onChange={(e) =>
                                updateOrderStatus(order.id, e.target.value)
                              }
                            >
                              <option value="Processing">Processing</option>
                              <option value="Out for Delivery">
                                Out for Delivery
                              </option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => deleteOrder(order.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        No orders found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{filteredOrders.length}</span>{" "}
                  of <span className="font-medium">{orders.length}</span> orders
                </div>
                <div className="flex space-x-2">
                  {selectedOrders.length > 0 && (
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700">
                      Delete Selected ({selectedOrders.length})
                    </button>
                  )}
                  <div className="flex justify-center">
                    <nav className="inline-flex rounded-md shadow-sm">
                      <button className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-blue-600 font-medium">
                        1
                      </button>
                      <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                        2
                      </button>
                      <button className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
