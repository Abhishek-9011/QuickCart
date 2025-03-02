import { useState } from "react";
import Sidebar from "./Sidebar";

const AdminOrders = () => {
    // Sample orders stored in the frontend
    const [orders, setOrders] = useState([
        { id: 1, customerName: "John Doe",paymentMode:"UPI", status: "Processing" },
        { id: 2, customerName: "Jane Smith",paymentMode:"Cash on delivery", status: "Out for Delivery" },
        { id: 3, customerName: "Michael Johnson",paymentMode:"UPI", status: "Delivered" },
    ]);

    // Function to update order status
    const updateOrderStatus = (orderId, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <div className="flex ">
            <div><Sidebar/></div>
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Admin Order Management</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Order ID</th>
                        <th className="border p-2">Customer</th>
                        <th className="border p-2">Payment Mode</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="text-center">
                            <td className="border p-2">{order.id}</td>
                            <td className="border p-2">{order.customerName}</td>
                            <td className="border p-2">{order.paymentMode}</td>
                            <td className="border p-2">{order.status}</td>
                            <td className="border p-2">
                                <select
                                    className="border p-1"
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default AdminOrders;
