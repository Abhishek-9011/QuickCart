import { Download, Printer, ArrowLeft, CheckCircle } from 'lucide-react';

const InvoicePage = () => {
  // Sample order data
  const order = {
    id: 'ORD-2023-4567',
    date: 'October 15, 2023',
    status: 'Completed',
    customer: {
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      phone: '(555) 123-4567',
    },
    shipping: {
      method: 'Standard Shipping',
      address: '123 Main St, Apt 4B\nNew York, NY 10001\nUnited States',
      estimatedDelivery: 'October 20, 2023',
    },
    payment: {
      method: 'Credit Card (Visa ****4242)',
      transactionId: 'TXN-789456123',
    },
    items: [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 99.99,
        quantity: 1,
        image: 'https://via.placeholder.com/80',
      },
      {
        id: 2,
        name: 'Smart Watch Series 5',
        price: 199.99,
        quantity: 1,
        image: 'https://via.placeholder.com/80',
      },
      {
        id: 3,
        name: 'Organic Cotton T-Shirt',
        price: 29.99,
        quantity: 2,
        image: 'https://via.placeholder.com/80',
      },
    ],
    subtotal: 359.96,
    shipping: 5.99,
    tax: 28.80,
    total: 394.75,
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 print:hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <button className="flex items-center text-indigo-600 hover:text-indigo-800">
              <ArrowLeft size={18} className="mr-1" />
              Back to Orders
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Order Invoice</h1>
            <div className="flex gap-3">
              <button 
                onClick={handlePrint}
                className="flex items-center gap-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-3 rounded-md text-sm font-medium"
              >
                <Printer size={16} />
                Print
              </button>
              <button className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-md text-sm font-medium">
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 print:py-0">
        {/* Invoice Container */}
        <div className="bg-white rounded-lg shadow-sm p-6 print:shadow-none">
          {/* Invoice Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Invoice #{order.id}</h2>
              <p className="text-gray-600">Date: {order.date}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {order.status === 'Completed' && <CheckCircle size={14} className="mr-1" />}
                {order.status}
              </span>
            </div>
          </div>

          {/* Order and Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Customer Details</h3>
              <div className="space-y-1 text-gray-600">
                <p>{order.customer.name}</p>
                <p>{order.customer.email}</p>
                <p>{order.customer.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Shipping Details</h3>
              <div className="space-y-1 text-gray-600">
                <p className="whitespace-pre-line">{order.shipping.address}</p>
                <p className="mt-2"><span className="font-medium">Method:</span> {order.shipping.method}</p>
                <p><span className="font-medium">Est. Delivery:</span> {order.shipping.estimatedDelivery}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Details</h3>
              <div className="space-y-1 text-gray-600">
                <p><span className="font-medium">Method:</span> {order.payment.method}</p>
                <p><span className="font-medium">Transaction ID:</span> {order.payment.transactionId}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-md" src={item.image} alt={item.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="flex justify-end">
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>Thank you for shopping with us!</p>
            <p className="mt-1">If you have any questions about your order, please contact our customer support.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvoicePage;