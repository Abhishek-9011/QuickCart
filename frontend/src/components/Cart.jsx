import { useState } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Trash2, 
  ArrowRight, 
  Plus, 
  Minus, 
  ChevronLeft,
  Menu,
  Search,
  User
} from 'lucide-react';

// Sample data for cart and wishlist items
const initialCartItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 129.99,
    quantity: 1,
    image: "/api/placeholder/200/200"
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 249.95,
    quantity: 2,
    image: "/api/placeholder/200/200"
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    price: 199.99,
    quantity: 1,
    image: "/api/placeholder/200/200"
  }
];

const initialWishlistItems = [
  {
    id: 4,
    name: "Ultra HD 4K Monitor 27\"",
    price: 349.99,
    image: "/api/placeholder/200/200"
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    price: 39.95,
    image: "/api/placeholder/200/200"
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    image: "/api/placeholder/200/200"
  }
];

// Navbar Component
const Navbar = ({ activePage, setActivePage }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Menu className="h-6 w-6 text-gray-700 md:hidden" />
            <span className="font-bold text-xl text-indigo-600">ShopEase</span>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <button className={`font-medium ${activePage === 'cart' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'}`} onClick={() => setActivePage('cart')}>
              Cart
            </button>
            <button className={`font-medium ${activePage === 'wishlist' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'}`} onClick={() => setActivePage('wishlist')}>
              Wishlist
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 text-gray-600" />
            <User className="h-5 w-5 text-gray-600" />
            <div className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </div>
            <div className="relative">
              <Heart className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </div>
          </div>
        </div>
        
        <div className="md:hidden flex space-x-6 pb-4 justify-center">
          <button className={`font-medium ${activePage === 'cart' ? 'text-indigo-600' : 'text-gray-600'}`} onClick={() => setActivePage('cart')}>
            Cart
          </button>
          <button className={`font-medium ${activePage === 'wishlist' ? 'text-indigo-600' : 'text-gray-600'}`} onClick={() => setActivePage('wishlist')}>
            Wishlist
          </button>
        </div>
      </div>
    </nav>
  );
};

// Cart Item Component
const CartItem = ({ item, removeFromCart, updateQuantity, moveToWishlist }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
        <div className="ml-0 sm:ml-4 mt-2 sm:mt-0 text-center sm:text-left">
          <h3 className="font-medium text-gray-800">{item.name}</h3>
          <p className="text-indigo-600 font-medium">${item.price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center">
        <div className="flex items-center border rounded mb-4 sm:mb-0 sm:mr-6">
          <button 
            className="px-2 py-1 text-gray-600 hover:bg-gray-100" 
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          >
            <Minus size={16} />
          </button>
          <span className="px-4 py-1">{item.quantity}</span>
          <button 
            className="px-2 py-1 text-gray-600 hover:bg-gray-100" 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="p-1 rounded-full hover:bg-gray-100" 
            onClick={() => moveToWishlist(item)}
            title="Move to Wishlist"
          >
            <Heart size={20} className="text-gray-500 hover:text-pink-500" />
          </button>
          <button 
            className="p-1 rounded-full hover:bg-gray-100" 
            onClick={() => removeFromCart(item.id)}
            title="Remove"
          >
            <Trash2 size={20} className="text-gray-500 hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Cart Summary Component
const CartSummary = ({ cartItems }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10.00;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-800 font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (7%)</span>
          <span className="text-gray-800 font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-gray-900 font-medium">Total</span>
            <span className="text-indigo-600 font-bold">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button className="w-full bg-indigo-600 text-white font-medium py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center">
        Proceed to Checkout
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};

// Wishlist Item Component
const WishlistItem = ({ item, removeFromWishlist, moveToCart }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
        <div className="ml-0 sm:ml-4 mt-2 sm:mt-0 text-center sm:text-left">
          <h3 className="font-medium text-gray-800">{item.name}</h3>
          <p className="text-indigo-600 font-medium">${item.price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button 
          className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 flex items-center transition duration-200"
          onClick={() => moveToCart(item)}
        >
          <ShoppingCart size={18} className="mr-1" />
          <span>Add to Cart</span>
        </button>
        <button 
          className="p-2 text-gray-500 hover:text-red-500 rounded-md hover:bg-gray-100"
          onClick={() => removeFromWishlist(item.id)}
          title="Remove"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

// Empty State Components
const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <ShoppingCart size={64} className="text-gray-300 mb-4" />
    <h3 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h3>
    <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition duration-200">
      Continue Shopping
    </button>
  </div>
);

const EmptyWishlist = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <Heart size={64} className="text-gray-300 mb-4" />
    <h3 className="text-xl font-medium text-gray-700 mb-2">Your wishlist is empty</h3>
    <p className="text-gray-500 mb-6">Save items you like for later by adding them to your wishlist.</p>
    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition duration-200">
      Explore Products
    </button>
  </div>
);

// Cart Page Component
const CartPage = ({ cartItems, wishlistItems, setCartItems, setWishlistItems }) => {
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };
  
  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? {...item, quantity: newQuantity} : item
    ));
  };
  
  const moveToWishlist = (item) => {
    const newItem = {...item};
    delete newItem.quantity;
    
    if (!wishlistItems.some(wishItem => wishItem.id === item.id)) {
      setWishlistItems([...wishlistItems, newItem]);
    }
    removeFromCart(item.id);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <span className="ml-2 text-gray-500 text-sm">({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
      </div>
      
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {cartItems.map(item => (
                <CartItem 
                  key={item.id} 
                  item={item}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  moveToWishlist={moveToWishlist}
                />
              ))}
            </div>
            
            <div className="mt-6">
              <button className="flex items-center text-indigo-600 hover:text-indigo-800">
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
          
          <div>
            <CartSummary cartItems={cartItems} />
          </div>
        </div>
      )}
    </div>
  );
};

// Wishlist Page Component
const WishlistPage = ({ wishlistItems, cartItems, setWishlistItems, setCartItems }) => {
  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };
  
  const moveToCart = (item) => {
    const newItem = {...item, quantity: 1};
    
    if (!cartItems.some(cartItem => cartItem.id === item.id)) {
      setCartItems([...cartItems, newItem]);
    }
    removeFromWishlist(item.id);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        <span className="ml-2 text-gray-500 text-sm">({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})</span>
      </div>
      
      {wishlistItems.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {wishlistItems.map(item => (
            <WishlistItem 
              key={item.id} 
              item={item} 
              removeFromWishlist={removeFromWishlist}
              moveToCart={moveToCart}
            />
          ))}
        </div>
      )}
      
      <div className="mt-6">
        <button className="flex items-center text-indigo-600 hover:text-indigo-800">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [activePage, setActivePage] = useState('cart');
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      {activePage === 'cart' ? (
        <CartPage 
          cartItems={cartItems} 
          wishlistItems={wishlistItems}
          setCartItems={setCartItems}
          setWishlistItems={setWishlistItems}
        />
      ) : (
        <WishlistPage 
          wishlistItems={wishlistItems}
          cartItems={cartItems}
          setWishlistItems={setWishlistItems}
          setCartItems={setCartItems}
        />
      )}
    </div>
  );
}