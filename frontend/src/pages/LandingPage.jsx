import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  ChevronRight,
  Star,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

// Animation helper component
const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
            NEW
          </div>
        )}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2 transform transition-transform duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button className="w-full bg-white text-black py-2 rounded font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < product.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews})
          </span>
        </div>
        <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-900">${product.price}</p>
          {product.oldPrice && (
            <p className="text-sm text-gray-500 line-through">
              ${product.oldPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Banner Component
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    {
      title: "Summer Collection 2025",
      subtitle: "New Arrivals",
      description: "Discover the latest trends for the season",
      image: "/api/placeholder/1200/600",
      color: "bg-amber-50",
    },
    {
      title: "Special Offers",
      subtitle: "Limited Time",
      description: "Up to 40% off on selected items",
      image: "/api/placeholder/1200/600",
      color: "bg-emerald-50",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-96 overflow-hidden rounded-xl">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className={`flex h-full ${banner.color}`}>
            <div className="flex flex-col justify-center p-8 md:pl-16 w-full md:w-1/2">
              <span className="text-sm font-medium tracking-wider text-gray-600 mb-2">
                {banner.subtitle}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {banner.title}
              </h2>
              <p className="text-gray-600 mb-6">{banner.description}</p>
              <button className="bg-black text-white px-6 py-3 rounded-full max-w-xs flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                Shop Now
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="hidden md:block w-1/2">
              <img
                src={banner.image}
                alt={banner.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-black w-6" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Categories Component
const Categories = () => {
  const categories = [
    { name: "Clothing", image: "/api/placeholder/300/300" },
    { name: "Footwear", image: "/api/placeholder/300/300" },
    { name: "Accessories", image: "/api/placeholder/300/300" },
    { name: "Beauty", image: "/api/placeholder/300/300" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <FadeIn key={category.name} delay={200 * index}>
          <div className="relative overflow-hidden rounded-lg group">
            <div className="h-40 md:h-60 bg-gray-100">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <h3 className="text-white font-bold text-xl">{category.name}</h3>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-50" />
          </div>
        </FadeIn>
      ))}
    </div>
  );
};

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      content:
        "I absolutely love the quality of the products. The attention to detail and customer service is outstanding!",
      avatar: "/api/placeholder/64/64",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Loyal Customer",
      content:
        "The shipping is incredibly fast, and the packaging is eco-friendly. Will definitely shop here again!",
      avatar: "/api/placeholder/64/64",
    },
    {
      id: 3,
      name: "Emma Watson",
      role: "Style Blogger",
      content:
        "This has become my go-to store for all my fashion needs. The selection is amazing and always on trend.",
      avatar: "/api/placeholder/64/64",
    },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-8 text-center">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <FadeIn key={testimonial.id} delay={300 * index}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

// Newsletter Component
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-black text-white py-16 px-4 rounded-xl">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Join Our Newsletter</h2>
        <p className="mb-8 text-gray-300">
          Get 10% off your first order and stay updated with our latest arrivals
          and offers.
        </p>

        {isSubmitted ? (
          <div className="bg-green-900 bg-opacity-30 p-4 rounded-lg">
            <p className="text-green-300">
              Thank you for subscribing! Check your email for confirmation.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow rounded-full px-6 py-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="bg-white text-black font-medium rounded-full px-6 py-3 hover:bg-gray-200 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Main App Component
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample products data
  const featuredProducts = [
    {
      id: 1,
      name: "Minimalist White Sneakers",
      price: 89.99,
      rating: 4,
      reviews: 127,
      image: "/api/placeholder/400/300",
      isNew: true,
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      price: 129.99,
      oldPrice: 159.99,
      rating: 5,
      reviews: 84,
      image: "/api/placeholder/400/300",
    },
    {
      id: 3,
      name: "Oversized Cotton Tee",
      price: 34.99,
      rating: 4,
      reviews: 56,
      image: "/api/placeholder/400/300",
      isNew: true,
    },
    {
      id: 4,
      name: "Structured Crossbody Bag",
      price: 79.99,
      rating: 4,
      reviews: 42,
      image: "/api/placeholder/400/300",
    },
  ];

  const newArrivals = [
    {
      id: 5,
      name: "Linen Blend Shirt",
      price: 59.99,
      rating: 5,
      reviews: 18,
      image: "/api/placeholder/400/300",
      isNew: true,
    },
    {
      id: 6,
      name: "High-Rise Straight Jeans",
      price: 89.99,
      rating: 4,
      reviews: 34,
      image: "/api/placeholder/400/300",
      isNew: true,
    },
    {
      id: 7,
      name: "Knit Sweater Vest",
      price: 49.99,
      rating: 4,
      reviews: 27,
      image: "/api/placeholder/400/300",
      isNew: true,
    },
    {
      id: 8,
      name: "Leather Ankle Boots",
      price: 149.99,
      rating: 5,
      reviews: 63,
      image: "/api/placeholder/400/300",
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <section className="mb-16">
          <Banner />
        </section>

        {/* Categories */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Shop By Category</h2>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-black"
            >
              <Link to={"/category"}>View All</Link>
              
              <ChevronRight size={16} />
            </a>
          </div>
          <Categories />
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-black"
            >
              <Link to={"/products"}>View All</Link>
              
              <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <FadeIn key={product.id} delay={150 * index}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Promo Banner */}
        <section className="mb-16">
          <div className="relative h-64 overflow-hidden rounded-xl bg-gray-900">
            <img
              src="/api/placeholder/1200/400"
              alt="Special Offer"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              <span className="text-sm font-medium tracking-wider mb-2">
                LIMITED TIME OFFER
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                25% OFF SUMMER COLLECTION
              </h2>
              <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-black"
            >
               <Link to={"/products"}>View All</Link>
              <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <FadeIn key={product.id} delay={150 * index}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <Testimonials />
        </section>

        {/* Newsletter */}
        <section className="mb-16">
          <Newsletter />
        </section>
      </main>

      {/* Footer */}
    </div>
  );
}
