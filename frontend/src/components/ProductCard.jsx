import React from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";

function ProductCard({
  productImage,
  name = "Product Name",
  rating,
  totalPurchases,
  price,
  discount = 0,
  onAddToCart,
}) {
  const discountedPrice = price - price * (discount / 100);

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
      <div className="relative">
        <img
          src={productImage}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}

        <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100">
          <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">
          {name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-medium">
              {rating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-gray-500">({totalPurchases} sold)</span>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div>
            {discount > 0 ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  ₹{discountedPrice.toFixed(0)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ₹{price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">₹{price}</span>
            )}
          </div>
          <div className="text-xs text-green-600 font-medium">In Stock</div>
        </div>

        <button 
          onClick={onAddToCart}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
