import React, { useState, useEffect } from "react";
import {
  Download,
  Printer,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Calculator,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
  User,
  CreditCard,
} from "lucide-react";

const InvoicePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [invoice, setInvoice] = useState({
    id: "INV-2024-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "Draft",
    type: "Product", // Product or Service

    // Business info
    business: {
      name: "Your Business Name",
      email: "hello@yourbusiness.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business Street\nSuite 100\nYour City, State 12345",
      logo: null,
    },

    // Client info
    client: {
      name: "Client Name",
      email: "client@example.com",
      phone: "+1 (555) 987-6543",
      address: "456 Client Avenue\nClient City, State 67890",
      company: "Client Company Inc.",
    },

    // Line items
    items: [
      {
        id: 1,
        description: "Web Design & Development",
        type: "Service",
        quantity: 1,
        rate: 2500.0,
        taxable: true,
      },
      {
        id: 2,
        description: "Premium Hosting (Annual)",
        type: "Service",
        quantity: 1,
        rate: 299.99,
        taxable: true,
      },
    ],

    // Financial settings
    taxRate: 8.5, // percentage
    discountType: "percentage", // 'percentage' or 'fixed'
    discountValue: 0,
    notes: "Thank you for your business! Payment is due within 30 days.",
    terms:
      "Payment due within 30 days. Late payments may incur a 1.5% monthly service charge.",
  });

  // Calculate totals
  const calculations = React.useMemo(() => {
    const subtotal = invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );

    let discount = 0;
    if (invoice.discountType === "percentage") {
      discount = subtotal * (invoice.discountValue / 100);
    } else {
      discount = invoice.discountValue;
    }

    const taxableAmount = invoice.items
      .filter((item) => item.taxable)
      .reduce((sum, item) => sum + item.quantity * item.rate, 0);

    const discountedTaxableAmount =
      taxableAmount - discount * (taxableAmount / subtotal);
    const tax = discountedTaxableAmount * (invoice.taxRate / 100);
    const total = subtotal - discount + tax;

    return {
      subtotal,
      discount,
      tax,
      total,
      taxableAmount,
    };
  }, [
    invoice.items,
    invoice.taxRate,
    invoice.discountValue,
    invoice.discountType,
  ]);

  // Add new item
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: "",
      type: invoice.type,
      quantity: 1,
      rate: 0,
      taxable: true,
    };
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  // Remove item
  const removeItem = (id) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  // Update item
  const updateItem = (id, field, value) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Update invoice field
  const updateInvoice = (path, value) => {
    const keys = path.split(".");
    setInvoice((prev) => {
      const newInvoice = { ...prev };
      let current = newInvoice;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newInvoice;
    });
  };

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Export to PDF (simplified - in real app would use jsPDF or similar)
  const handleExportPDF = () => {
    alert(
      "PDF export would be implemented with a library like jsPDF or react-pdf"
    );
  };

  // Status color mapping
  const getStatusColor = (status) => {
    const colors = {
      Draft: "bg-gray-100 text-gray-800",
      Sent: "bg-blue-100 text-blue-800",
      Paid: "bg-green-100 text-green-800",
      Overdue: "bg-red-100 text-red-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || colors["Draft"];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 print:bg-white">
      {/* Header - Hidden in print */}
      <header className="bg-white border-b border-gray-200 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Invoice Generator
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  invoice.status
                )}`}
              >
                {invoice.status}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isEditing
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
                <span>{isEditing ? "Save" : "Edit"}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all"
              >
                <Printer size={16} />
                <span>Print</span>
              </button>

              <button
                onClick={handleExportPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all"
              >
                <Download size={16} />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 print:p-0 print:max-w-none">
        <div className="bg-white rounded-xl shadow-lg print:shadow-none print:rounded-none">
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Invoice Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-10">
              {/* Business Info */}
              <div className="mb-6 lg:mb-0">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={invoice.business.name}
                      onChange={(e) =>
                        updateInvoice("business.name", e.target.value)
                      }
                      className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-200 focus:border-blue-500 outline-none"
                      placeholder="Your Business Name"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <input
                        type="email"
                        value={invoice.business.email}
                        onChange={(e) =>
                          updateInvoice("business.email", e.target.value)
                        }
                        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="business@email.com"
                      />
                      <input
                        type="tel"
                        value={invoice.business.phone}
                        onChange={(e) =>
                          updateInvoice("business.phone", e.target.value)
                        }
                        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <textarea
                      value={invoice.business.address}
                      onChange={(e) =>
                        updateInvoice("business.address", e.target.value)
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      rows="3"
                      placeholder="Business Address"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {invoice.business.name}
                    </h2>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Mail size={14} />
                        <span>{invoice.business.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={14} />
                        <span>{invoice.business.phone}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin size={14} className="mt-0.5" />
                        <span className="whitespace-pre-line">
                          {invoice.business.address}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Invoice Details */}
              <div className="text-right">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  INVOICE
                </h1>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4">
                    <span className="font-medium text-gray-600">
                      Invoice #:
                    </span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={invoice.id}
                        onChange={(e) => updateInvoice("id", e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <span className="font-semibold">{invoice.id}</span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4">
                    <span className="font-medium text-gray-600">Date:</span>
                    {isEditing ? (
                      <input
                        type="date"
                        value={invoice.date}
                        onChange={(e) => updateInvoice("date", e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <span>{new Date(invoice.date).toLocaleDateString()}</span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4">
                    <span className="font-medium text-gray-600">Due Date:</span>
                    {isEditing ? (
                      <input
                        type="date"
                        value={invoice.dueDate}
                        onChange={(e) =>
                          updateInvoice("dueDate", e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <span>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4">
                      <span className="font-medium text-gray-600">Status:</span>
                      <select
                        value={invoice.status}
                        onChange={(e) =>
                          updateInvoice("status", e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Sent">Sent</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="mb-10 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Building size={18} className="mr-2" />
                Bill To:
              </h3>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={invoice.client.name}
                    onChange={(e) =>
                      updateInvoice("client.name", e.target.value)
                    }
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Client Name"
                  />
                  <input
                    type="text"
                    value={invoice.client.company}
                    onChange={(e) =>
                      updateInvoice("client.company", e.target.value)
                    }
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Company Name"
                  />
                  <input
                    type="email"
                    value={invoice.client.email}
                    onChange={(e) =>
                      updateInvoice("client.email", e.target.value)
                    }
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="client@email.com"
                  />
                  <input
                    type="tel"
                    value={invoice.client.phone}
                    onChange={(e) =>
                      updateInvoice("client.phone", e.target.value)
                    }
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 987-6543"
                  />
                  <textarea
                    value={invoice.client.address}
                    onChange={(e) =>
                      updateInvoice("client.address", e.target.value)
                    }
                    className="md:col-span-2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Client Address"
                  />
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-gray-900">
                    {invoice.client.name}
                  </p>
                  <p className="text-gray-700">{invoice.client.company}</p>
                  <p className="text-gray-600">{invoice.client.email}</p>
                  <p className="text-gray-600">{invoice.client.phone}</p>
                  <p className="text-gray-600 whitespace-pre-line mt-2">
                    {invoice.client.address}
                  </p>
                </div>
              )}
            </div>

            {/* Line Items */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Items</h3>
                {isEditing && (
                  <button
                    onClick={addItem}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    <Plus size={16} />
                    <span>Add Item</span>
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">
                        Description
                      </th>
                      <th className="text-center py-3 px-2 font-semibold text-gray-700 w-20">
                        Qty
                      </th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700 w-24">
                        Rate
                      </th>
                      <th className="text-center py-3 px-2 font-semibold text-gray-700 w-16">
                        Tax
                      </th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700 w-24">
                        Total
                      </th>
                      {isEditing && <th className="w-12"></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-2">
                          {isEditing ? (
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="w-full border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                              placeholder="Item description"
                            />
                          ) : (
                            <span className="font-medium">
                              {item.description}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.quantity}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "quantity",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full border rounded px-2 py-1 text-sm text-center focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <span>{item.quantity}</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-right">
                          {isEditing ? (
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.rate}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "rate",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full border rounded px-2 py-1 text-sm text-right focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <span>${item.rate.toFixed(2)}</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-center">
                          {isEditing ? (
                            <input
                              type="checkbox"
                              checked={item.taxable}
                              onChange={(e) =>
                                updateItem(item.id, "taxable", e.target.checked)
                              }
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          ) : (
                            <span>{item.taxable ? "✓" : "—"}</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-right font-semibold">
                          ${(item.quantity * item.rate).toFixed(2)}
                        </td>
                        {isEditing && (
                          <td className="py-3 px-2 text-center">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
              {/* Notes Section */}
              <div className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:pr-8">
                <h4 className="font-semibold text-gray-800 mb-2">Notes:</h4>
                {isEditing ? (
                  <textarea
                    value={invoice.notes}
                    onChange={(e) => updateInvoice("notes", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                    rows="4"
                    placeholder="Additional notes or payment instructions"
                  />
                ) : (
                  <p className="text-gray-600 text-sm">{invoice.notes}</p>
                )}
              </div>

              {/* Totals */}
              <div className="w-full lg:w-1/2">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">
                        ${calculations.subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Discount */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Discount:</span>
                        {isEditing && (
                          <div className="flex items-center space-x-1">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={invoice.discountValue}
                              onChange={(e) =>
                                updateInvoice(
                                  "discountValue",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-16 border rounded px-1 py-0.5 text-xs"
                            />
                            <select
                              value={invoice.discountType}
                              onChange={(e) =>
                                updateInvoice("discountType", e.target.value)
                              }
                              className="border rounded px-1 py-0.5 text-xs"
                            >
                              <option value="percentage">%</option>
                              <option value="fixed">$</option>
                            </select>
                          </div>
                        )}
                      </div>
                      <span className="font-semibold text-red-600">
                        -${calculations.discount.toFixed(2)}
                      </span>
                    </div>

                    {/* Tax */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Tax:</span>
                        {isEditing && (
                          <div className="flex items-center space-x-1">
                            <input
                              type="number"
                              min="0"
                              step="0.1"
                              value={invoice.taxRate}
                              onChange={(e) =>
                                updateInvoice(
                                  "taxRate",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-12 border rounded px-1 py-0.5 text-xs"
                            />
                            <span className="text-xs">%</span>
                          </div>
                        )}
                        {!isEditing && (
                          <span className="text-sm text-gray-500">
                            ({invoice.taxRate}%)
                          </span>
                        )}
                      </div>
                      <span className="font-semibold">
                        ${calculations.tax.toFixed(2)}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span className="text-gray-800">Total:</span>
                        <span className="text-2xl text-blue-600">
                          ${calculations.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-800 mb-2">
                Terms & Conditions:
              </h4>
              {isEditing ? (
                <textarea
                  value={invoice.terms}
                  onChange={(e) => updateInvoice("terms", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                  rows="3"
                  placeholder="Terms and conditions"
                />
              ) : (
                <p className="text-gray-600 text-sm">{invoice.terms}</p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-sm">
                Thank you for your business!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvoicePage;
