
import React, { useState } from "react";
import Sidebar from "./Sidebar";

const AdminProduct = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 14",
      brand: "Apple",
      category: "Smartphones",
      price: "$999",
      stock: 15,
      status: "In Stock",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Galaxy S23",
      brand: "Samsung",
      category: "Smartphones",
      price: "$899",
      stock: 8,
      status: "In Stock",
      image: "https://via.placeholder.com/50",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  // Function to delete a product
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  // Function to add a new product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.brand || !newProduct.price || !newProduct.stock) {
      alert("Please fill all required fields!");
      return;
    }

    setProducts([
      ...products,
      {
        id: products.length + 1,
        ...newProduct,
        status: newProduct.stock > 0 ? "In Stock" : "Out of Stock",
      },
    ]);
    setNewProduct({ name: "", brand: "", category: "", price: "", stock: "", image: "" });
    setShowModal(false);
  };

  return (
    <div className="flex">
    <div>
      <Sidebar />
    </div>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>

      {/* Add Product Button */}
      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
        onClick={() => setShowModal(true)}
      >
        ➕ Add Product
      </button>

      {/* Product Table */}
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Brand</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-100">
              <td className="p-3 text-center">
                <img
                  src={product.image || "https://via.placeholder.com/50"}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.brand}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">{product.price}</td>
              <td className="p-3">{product.stock}</td>
              <td
                className={`p-3 font-semibold ${
                  product.status === "In Stock" ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.status}
              </td>
              <td className="p-3 flex space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#ffffff60] bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              className="w-full mb-2 p-2 border rounded"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Brand"
              className="w-full mb-2 p-2 border rounded"
              value={newProduct.brand}
              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full mb-2 p-2 border rounded"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <input
              type="text"
              placeholder="Price"
              className="w-full mb-2 p-2 border rounded"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Stock"
              className="w-full mb-2 p-2 border rounded"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full mb-2 p-2 border rounded"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800" onClick={handleAddProduct}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default AdminProduct;
