import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Filter,
  ArrowUp,
  ArrowDown,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import Sidebar from "../Sidebar";
import productService from "../../api/productService";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    image: "",
    description: "",
    discountPrice: "",
    rating: "",
  });
  const [editProductId, setEditProductId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [modalAnimation, setModalAnimation] = useState("");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const products = await productService.getProducts();
        // Transform data to match frontend structure
        const transformedProducts = products.map((product) => ({
          id: product._id,
          name: product.title,
          brand: product.brand,
          price: product.price,
          stock: product.stock,
          status: product.stock > 0 ? "In Stock" : "Out of Stock",
          image: product.images?.[0] || "https://via.placeholder.com/150",
          description: product.description,
          discountPrice: product.discountPrice,
          rating: product.rating,
        }));
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Open modal with animation
  const openModal = () => {
    setModalAnimation("opening");
    setShowModal(true);
    setTimeout(() => setModalAnimation("open"), 10);
  };

  // Close modal with animation
  const closeModal = () => {
    setModalAnimation("closing");
    setTimeout(() => {
      setShowModal(false);
      resetForm();
      setModalAnimation("");
    }, 300);
  };

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  // Filter products based on search
  const filteredProducts = sortedProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Pagination
  const itemsPerPage = 5;
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Function to delete a product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await productService.deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  // Function to add a new product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const productData = {
        title: newProduct.name,
        description: newProduct.description || "",
        price: parseFloat(newProduct.price),
        discountPrice: parseFloat(newProduct.discountPrice) || undefined,
        images: newProduct.image ? [newProduct.image] : [],
        brand: newProduct.brand,
        stock: parseInt(newProduct.stock),
        rating: parseFloat(newProduct.rating) || 0,
      };

      const savedProduct = await productService.createProduct(productData);

      // Add to local state
      setProducts([
        ...products,
        {
          id: savedProduct._id,
          name: savedProduct.title,
          brand: savedProduct.brand,
          price: savedProduct.price,
          stock: savedProduct.stock,
          status: savedProduct.stock > 0 ? "In Stock" : "Out of Stock",
          image: savedProduct.images?.[0] || "https://via.placeholder.com/150",
          description: savedProduct.description,
          discountPrice: savedProduct.discountPrice,
          rating: savedProduct.rating,
        },
      ]);

      closeModal();
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
    }
  };

  // Function to update a product
  const handleUpdateProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const productData = {
        title: newProduct.name,
        description: newProduct.description || "",
        price: parseFloat(newProduct.price),
        discountPrice: parseFloat(newProduct.discountPrice) || undefined,
        images: newProduct.image ? [newProduct.image] : [],
        brand: newProduct.brand,
        stock: parseInt(newProduct.stock),
        rating: parseFloat(newProduct.rating) || 0,
      };

      const updatedProduct = await productService.updateProduct(
        editProductId,
        productData
      );

      // Update local state
      setProducts(
        products.map((product) =>
          product.id === editProductId
            ? {
                ...product,
                name: updatedProduct.title,
                brand: updatedProduct.brand,
                price: updatedProduct.price,
                stock: updatedProduct.stock,
                status: updatedProduct.stock > 0 ? "In Stock" : "Out of Stock",
                image: updatedProduct.images?.[0] || product.image,
                description: updatedProduct.description,
                discountPrice: updatedProduct.discountPrice,
                rating: updatedProduct.rating,
              }
            : product
        )
      );

      closeModal();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  // Reset form
  const resetForm = () => {
    setNewProduct({
      name: "",
      brand: "",
      price: "",
      stock: "",
      image: "",
      description: "",
      discountPrice: "",
      rating: "",
    });
    setEditProductId(null);
    setImagePreview(null);
  };

  // Handle edit click
  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image,
      description: product.description || "",
      discountPrice: product.discountPrice?.toString() || "",
      rating: product.rating?.toString() || "",
    });
    setEditProductId(product.id);
    setImagePreview(product.image);
    openModal();
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Request sort
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <div className="p-6 overflow-y-auto h-full">
          <div className="mb-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-800">
              Product Management
            </h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 animate-fade-in-down">
            <div className="relative w-full md:w-72">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 transform transition-transform duration-150"
                onClick={() => {
                  resetForm();
                  openModal();
                }}
              >
                <Plus size={18} />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fade-in">
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
              <h3 className="text-gray-500 font-medium">Total Products</h3>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
              <h3 className="text-gray-500 font-medium">In Stock</h3>
              <p className="text-2xl font-bold">
                {products.filter((p) => p.status === "In Stock").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow">
              <h3 className="text-gray-500 font-medium">Out of Stock</h3>
              <p className="text-2xl font-bold">
                {products.filter((p) => p.status === "Out of Stock").length}
              </p>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in-up">
            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <Loader2 className="animate-spin text-blue-500" size={32} />
              </div>
            ) : currentProducts.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort("name")}
                        >
                          <div className="flex items-center gap-1">
                            Name
                            {getSortIndicator("name")}
                          </div>
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort("brand")}
                        >
                          <div className="flex items-center gap-1">
                            Brand
                            {getSortIndicator("brand")}
                          </div>
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort("price")}
                        >
                          <div className="flex items-center gap-1">
                            Price
                            {getSortIndicator("price")}
                          </div>
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort("stock")}
                        >
                          <div className="flex items-center gap-1">
                            Stock
                            {getSortIndicator("stock")}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentProducts.map((product) => (
                        <tr
                          key={product.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={product.image}
                                alt={product.name}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {product.brand}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">
                              ${product.price.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {product.stock}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.status === "In Stock"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.status === "In Stock" ? (
                                <span className="flex items-center">
                                  <CheckCircle size={14} className="mr-1" />
                                  {product.status}
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <AlertCircle size={14} className="mr-1" />
                                  {product.status}
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button
                                className="text-blue-600 hover:text-blue-900 transition-colors"
                                onClick={() => handleEdit(product)}
                                title="Edit"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900 transition-colors"
                                onClick={() => handleDelete(product.id)}
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">
                          {indexOfFirstProduct + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(
                            indexOfLastProduct,
                            filteredProducts.length
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {filteredProducts.length}
                        </span>{" "}
                        products
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        } transition-colors`}
                      >
                        Previous
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === i + 1
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          } transition-colors`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        } transition-colors`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">
                  No products found. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div
          className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300 ${
            modalAnimation === "opening"
              ? "opacity-0"
              : modalAnimation === "closing"
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          <div
            className={`bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden transform transition-all duration-300 ${
              modalAnimation === "opening"
                ? "scale-95 opacity-0"
                : modalAnimation === "closing"
                ? "scale-95 opacity-0"
                : "scale-100 opacity-100"
            }`}
          >
            <div className="flex justify-between items-center border-b p-4 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">
                {editProductId ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="mx-auto h-48 w-full object-contain rounded-md"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                            onClick={() => {
                              setImagePreview(null);
                              setNewProduct({ ...newProduct, image: "" });
                            }}
                          >
                            <X size={16} className="text-gray-500" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-center">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          </div>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleImageChange}
                                accept="image/*"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Or enter image URL
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newProduct.image}
                      onChange={(e) => {
                        setNewProduct({ ...newProduct, image: e.target.value });
                        if (!e.target.value) setImagePreview(null);
                      }}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                {/* Right Column - Form Fields */}
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newProduct.brand}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          brand: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          className="pl-8 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              price: e.target.value,
                            })
                          }
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        value={newProduct.stock}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            stock: e.target.value,
                          })
                        }
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Price
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        className="pl-8 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        value={newProduct.discountPrice || ""}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            discountPrice: e.target.value,
                          })
                        }
                        min="0"
                        step="0.01"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating (0-5)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newProduct.rating || ""}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, rating: e.target.value })
                      }
                      min="0"
                      max="5"
                      step="0.1"
                      placeholder="0-5"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newProduct.description || ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      rows="3"
                      placeholder="Product description..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                <button
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                  onClick={
                    editProductId ? handleUpdateProduct : handleAddProduct
                  }
                >
                  {editProductId ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;