import { useState } from "react";
import { Trash2, Plus, Minus, ChevronLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  // Updated data matching the image
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Black Jacket Puffed",
      variant: "Agora",
      size: "XXL",
      color: "Black",
      price: 499.0,
      quantity: 1,
      image: "/api/placeholder/180/180",
    },
    {
      id: 2,
      name: "Women White jacket",
      variant: "Allure",
      size: "XL",
      color: "Smoke white",
      price: 1000.0,
      quantity: 2,
      image: "/api/placeholder/180/180",
    },
    {
      id: 3,
      name: "Orange Full wear",
      variant: "Vibe",
      size: "L",
      color: "Orange",
      price: 1200.0,
      quantity: 1,
      image: "/api/placeholder/180/180",
    },
  ]);

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate order summary - using the values from the image
  const subtotal = 2699.0; // Based on image
  const delivery = 12.99;
  const total = 2711.99; // Based on image

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold">Cart</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="border-b pb-6">
                <div className="flex gap-4">
                  <div className="w-36 h-36 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <div className="text-sm text-gray-600 mt-1">
                          <p>Variant: {item.variant}</p>
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${item.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <div className="flex space-x-4">
                        <button className="text-gray-500 hover:text-black">
                          <Heart size={20} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-4 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">${delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="">
              <Link
                to={"/checkout"}
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition duration-200"
              >
                Checkout
              </Link>
              </div>
            </div>
          </div>
        </div>

        <button to={"/product"} className="mt-6">
          <button className="flex items-center text-gray-600 hover:text-black">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <Link to={"/products"}>Continue Shopping</Link>
          </button>
        </button>
      </div>
    </div>
  );
};

export default CartPage;
