import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ChevronLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import cartService from "../api/cartService";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [delivery] = useState(12.99);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState(null);

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Get user ID from localStorage
        const userToken = localStorage.getItem("token");
        if (!userToken) {
          throw new Error("User not authenticated");
        }

        // If your token contains the user ID in its payload, you'll need to decode it
        // Here's a simple way to extract the payload (note: this doesn't verify the token)
        const payload = JSON.parse(atob(userToken.split(".")[1]));
        const currentUserId = payload.id;
        if (!currentUserId) {
          throw new Error("User ID not found in token");
        }

        setUserId(currentUserId);
        const cart = await cartService.getCartByUserId(currentUserId);
        setCartItems(cart.items);
        calculateTotals(cart.items);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Calculate order totals
  const calculateTotals = (items) => {
    const newSubtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
    setTotal(newSubtotal + delivery);
  };

  const removeFromCart = async (productId) => {
    try {
      if (!userId) throw new Error("User not authenticated");

      await cartService.removeItemFromCart({ userId, productId });
      setCartItems(cartItems.filter((item) => item.productId !== productId));
      calculateTotals(cartItems.filter((item) => item.productId !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      if (!userId) throw new Error("User not authenticated");

      await cartService.updateCartItem({
        userId,
        productId,
        quantity: newQuantity,
      });

      const updatedItems = cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );

      setCartItems(updatedItems);
      calculateTotals(updatedItems);
    } catch (err) {
      setError(err.message);
    }
  };

  const clearCart = async () => {
    try {
      if (!userId) throw new Error("User not authenticated");

      await cartService.clearCart(userId);
      setCartItems([]);
      setSubtotal(0);
      setTotal(delivery);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cart...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold">Cart</h1>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="ml-auto text-sm text-red-500 hover:text-red-700"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <Link
              to="/products"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-6">
              {cartItems.map((item) => (
                <div key={item.productId} className="border-b pb-6">
                  <div className="flex gap-4">
                    <div className="w-36 h-36 flex-shrink-0">
                      <img
                        src={item.image || "/api/placeholder/180/180"}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {item.productId?.name || "Product"}
                          </h3>
                          <div className="text-sm text-gray-600 mt-1">
                            <p>Variant: {item.variant || "Standard"}</p>
                            <p>Size: {item.size || "M"}</p>
                            <p>Color: {item.color || "Black"}</p>
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
                            onClick={() => removeFromCart(item.productId)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
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
                              updateQuantity(item.productId, item.quantity + 1)
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
                    className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition duration-200 block text-center"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6">
            <Link
              to={"/products"}
              className="flex items-center text-gray-600 hover:text-black"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
