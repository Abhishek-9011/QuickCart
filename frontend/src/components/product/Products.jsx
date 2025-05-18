import React, { useState } from "react";
import ProductCard from "../ProductCard";
import Filter from "../Filter";
import { ChevronDown } from "lucide-react";

function Products() {
  const [sortBy, setSortBy] = useState("highToLow");
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
      
      <div className="flex justify-between items-center mb-8">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">9</span> products
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(9).fill().map((_, index) => (
              <ProductCard
                key={index}
                productImage={"/white-tshirt.jpeg"}
                name="Classic White T-Shirt"
                rating={4 + (index % 2) * 0.5}
                totalPurchases={23 + index * 5}
                price={400 + index * 50}
                discount={index % 3 === 0 ? 15 : 0}
              />
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center">
              <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              {[1, 2, 3].map(page => (
                <button 
                  key={page} 
                  className={`mx-1 px-3 py-1 rounded-md ${page === 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}
              <button className="ml-1 px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;