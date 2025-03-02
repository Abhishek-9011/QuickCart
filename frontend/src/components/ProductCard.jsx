import React from "react";

function ProductCard({ productImage, rating, totalPurchases, price }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64 border border-gray-200">
      <img
        src={productImage}
        alt="Product"
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <span className="text-yellow-500 font-bold">⭐ {rating}</span>
          <span className="text-sm text-gray-500">{totalPurchases} sold</span>
        </div>
        <div className="text-lg font-semibold text-gray-900 mt-1">₹{price}</div>
        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  
  );
}

export default ProductCard;
