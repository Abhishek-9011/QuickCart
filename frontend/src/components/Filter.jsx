import React from "react";
import PriceRange from "./PriceRange";

function Filter() {
  return (
    <div className="p-4 border-gray-200 border-1 shadow-lg rounded-lg w-64">
      {/* Price Range */}
      <div className="mb-4 ">
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <PriceRange min={10} max={100} />
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Rating</h3>
        <div className="space-y-2">
          {["1-2", "2-3", "3-4", "4-5"].map((range, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" name={range} className="accent-blue-500" />
              <span className="text-gray-700">{range}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
