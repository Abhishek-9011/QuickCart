import React from "react";
import ProductCard from "./ProductCard";
import Filter from "./Filter";

function Products() {
  return (
    <div>
      <div className="flex justify-end ">
        <div className="mt-2.5 mb-2.5 flex justify-evenly w-[200px] shadow-md  rounded-lg border border-gray-200"> 
          <p>Sort by</p>
          <select name="" id="">
            <option value="highToLow">High to Low</option>
            <option value="lowToHigh">Low to High</option>
          </select>
        </div>
      </div>
      <div className="flex gap-4 ml-">
        <div className="ml-4">
          <Filter />
        </div>
        <div className="grid  grid-cols-3 gap-3 container">
          <ProductCard
            productImage={"/white-tshirt.jpeg"}
            rating={4}
            totalPurchases={23}
            price={400}
          />

          <ProductCard
            productImage={"/white-tshirt.jpeg"}
            rating={4}
            totalPurchases={23}
            price={400}
          />

          <ProductCard
            productImage={"/white-tshirt.jpeg"}
            rating={4}
            totalPurchases={23}
            price={400}
          />

          <ProductCard
            productImage={"/white-tshirt.jpeg"}
            rating={4}
            totalPurchases={23}
            price={400}
          />

          <ProductCard
            productImage={"/white-tshirt.jpeg"}
            rating={4}
            totalPurchases={23}
            price={400}
          />

          <ProductCard
            productImage={"/white-tshirt.jpeg"}
            rating={4}
            totalPurchases={23}
            price={400}
          />
          <ProductCard
            productImage={"/white-tshirt.jpeg"}
            rating={4}
            totalPurchases={23}
            price={400}
          />
          <ProductCard
            productImage={"/white-tshirt.jpeg"}
            rating={4}
            totalPurchases={23}
            price={400}
          />
          <ProductCard
            productImage={"/white-tshirt.jpeg"}
            rating={4}
            totalPurchases={23}
            price={400}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
