import { Trash2, ShoppingCart, Heart } from 'lucide-react';

const WishlistPage = () => {
  // Sample wishlist data
  const wishlistItems = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      image: 'https://via.placeholder.com/80',
      inStock: true,
    },
    {
      id: 2,
      name: 'Smart Watch Series 5',
      price: 199.99,
      image: 'https://via.placeholder.com/80',
      inStock: true,
    },
    {
      id: 3,
      name: 'Limited Edition Sneakers',
      price: 149.99,
      image: 'https://via.placeholder.com/80',
      inStock: false,
    },
  ];

  const removeItem = (id) => {
    // Implement remove item logic
    console.log(`Remove item ${id} from wishlist`);
  };

  const moveToCart = (id) => {
    // Implement move to cart logic
    console.log(`Move item ${id} to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">Wishlist</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Saved Items ({wishlistItems.length})</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              Continue Shopping
            </button>
          </div>
          
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="mx-auto h-12 w-12 text-gray-400" strokeWidth={1} />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
              <p className="mt-1 text-gray-500">Save items you love to buy them later</p>
              <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium transition duration-200">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-red-500 hover:bg-red-50"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <h3 className="text-md font-medium text-gray-800">{item.name}</h3>
                  <p className="text-lg font-semibold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                  <div className="mt-4 flex justify-between items-center">
                    {item.inStock ? (
                      <span className="text-sm text-green-600">In Stock</span>
                    ) : (
                      <span className="text-sm text-red-600">Out of Stock</span>
                    )}
                    <button 
                      onClick={() => moveToCart(item.id)}
                      disabled={!item.inStock}
                      className={`flex items-center gap-1 py-2 px-3 rounded-md font-medium text-sm ${item.inStock ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                      <ShoppingCart size={16} />
                      {item.inStock ? 'Add to Cart' : 'Notify Me'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WishlistPage;