import React from 'react';
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Gamepad2, 
  Book, 
  Car, 
  Heart, 
  Dumbbell,
  Camera,
  Watch,
  Headphones,
  Gift
} from 'lucide-react';

const Category = ({ categories = defaultCategories, title = "Shop by Category" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Simulate framer motion with CSS transitions and React state
  const [hoveredCard, setHoveredCard] = React.useState(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection across all categories
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={category.id}
                className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 cursor-pointer transition-all duration-300 ${
                  isHovered ? 'transform -translate-y-2 scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Gradient Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon Container */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center transform transition-transform duration-300 ${
                    isHovered ? 'scale-110 rotate-3' : ''
                  }`}>
                    <IconComponent 
                      size={28} 
                      className="text-white drop-shadow-sm" 
                    />
                  </div>

                  {/* Category Name */}
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </h3>

                  {/* Product Count */}
                  <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                    {category.productCount} items
                  </p>

                  {/* Optional Description */}
                  {category.description && (
                    <p className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Categories
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

// Default categories data
const defaultCategories = [
  {
    id: 1,
    name: "Electronics",
    icon: Smartphone,
    productCount: 1250,
    gradient: "from-blue-500 to-blue-600",
    description: "Latest tech"
  },
  {
    id: 2,
    name: "Fashion",
    icon: Shirt,
    productCount: 2180,
    gradient: "from-pink-500 to-rose-600",
    description: "Trendy styles"
  },
  {
    id: 3,
    name: "Home & Garden",
    icon: Home,
    productCount: 890,
    gradient: "from-green-500 to-emerald-600",
    description: "Cozy living"
  },
  {
    id: 4,
    name: "Gaming",
    icon: Gamepad2,
    productCount: 640,
    gradient: "from-purple-500 to-indigo-600",
    description: "Epic games"
  },
  {
    id: 5,
    name: "Books",
    icon: Book,
    productCount: 3200,
    gradient: "from-amber-500 to-orange-600",
    description: "Knowledge hub"
  },
  {
    id: 6,
    name: "Automotive",
    icon: Car,
    productCount: 480,
    gradient: "from-gray-600 to-gray-700",
    description: "Car essentials"
  },
  {
    id: 7,
    name: "Health & Beauty",
    icon: Heart,
    productCount: 1560,
    gradient: "from-red-500 to-pink-600",
    description: "Self care"
  },
  {
    id: 8,
    name: "Sports",
    icon: Dumbbell,
    productCount: 720,
    gradient: "from-teal-500 to-cyan-600",
    description: "Stay active"
  },
  {
    id: 9,
    name: "Photography",
    icon: Camera,
    productCount: 340,
    gradient: "from-slate-600 to-slate-700",
    description: "Capture moments"
  },
  {
    id: 10,
    name: "Watches",
    icon: Watch,
    productCount: 280,
    gradient: "from-yellow-500 to-amber-600",
    description: "Timeless style"
  },
  {
    id: 11,
    name: "Audio",
    icon: Headphones,
    productCount: 420,
    gradient: "from-indigo-500 to-purple-600",
    description: "Pure sound"
  },
  {
    id: 12,
    name: "Gifts",
    icon: Gift,
    productCount: 950,
    gradient: "from-emerald-500 to-teal-600",
    description: "Perfect picks"
  }
];

export default Category;