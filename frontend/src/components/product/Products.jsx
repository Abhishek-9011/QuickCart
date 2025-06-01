import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import Filter from "../Filter";
import { ChevronDown } from "lucide-react";
import productService from "../../api/productService";
import cartService from "../../api/cartService"; // Import cart service
import { toast } from "react-toastify"; // For notifications

function Products() {
  const [sortBy, setSortBy] = useState("highToLow");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  
  
  useEffect(() => {
    // Get user ID from localStorage when component mounts
    const userToken = localStorage.getItem("token");
    if (userToken) {
      try {
        const userData = JSON.parse(userToken);
        setUserId(userData.id);
      } catch (err) {
        console.error("Error parsing user token:", err);
      }
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let allProducts = await productService.getProducts();

      // Handle frontend sorting
      if (sortBy === "highToLow") {
        allProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === "lowToHigh") {
        allProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === "popularity") {
        allProducts.sort((a, b) => b.totalPurchases - a.totalPurchases);
      } else if (sortBy === "newest") {
        allProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setProducts(allProducts);
      console.log(products._id);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products.");
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!userId) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      await cartService.addToCart({
        userId,
        productId,
        quantity: 1 // Default quantity
      });
      toast.success("Product added to cart!");
    } catch (err) {
      toast.error("Failed to add product to cart");
      console.error("Add to cart error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>

      <div className="flex justify-between items-center mb-8">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{products.length}</span> products
        </div>

        <div className="relative rounded-md shadow-sm border border-gray-200 bg-white px-4 py-2 flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            className="border-0 bg-transparent text-gray-700 text-sm font-medium focus:ring-0 focus:outline-none cursor-pointer pr-8"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="highToLow">Price: High to Low</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="popularity">Popularity</option>
            <option value="newest">Newest First</option>
          </select>
          <ChevronDown className="absolute right-2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>
            <Filter />
          </div>
        </div>

        <div className="flex-1">
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    productImage={product.images?.[0]}
                    name={product.name}
                    rating={product.rating}
                    totalPurchases={product.totalPurchases}
                    price={product.price}
                    discount={product.discount}
                    onAddToCart={() => handleAddToCart(product._id)}
                  />
                ))}
              </div>
              
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center">
                  <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`mx-1 px-3 py-1 rounded-md ${
                        page === 1
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="ml-1 px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;