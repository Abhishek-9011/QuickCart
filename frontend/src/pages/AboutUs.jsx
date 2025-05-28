import React from 'react';
import { 
  ShoppingBag, 
  Truck, 
  Headphones, 
  Award, 
  User
} from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-fadeInUp">
            <ShoppingBag className="mx-auto mb-6 h-16 w-16" />
            <h1 className="text-5xl font-bold mb-6">About ShopFlow</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're passionate about delivering exceptional shopping experiences through innovative technology, 
              quality products, and outstanding customer service.
            </p>
          </div>
        </div>
      </div>

      {/* Company Introduction */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-slideInLeft bg-white rounded-2xl shadow-lg p-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Founded in 2020, ShopFlow emerged from a simple vision: to make online shopping effortless, 
              enjoyable, and accessible to everyone. What started as a small team of e-commerce enthusiasts 
              has grown into a thriving platform serving thousands of customers worldwide.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that great products deserve great experiences. That's why we've built our platform 
              with cutting-edge technology, partnered with trusted suppliers, and assembled a dedicated team 
              committed to your satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-slideInUp bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Truck className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Fast Shipping</h3>
              <p className="text-gray-600 leading-relaxed">
                Lightning-fast delivery with free shipping on orders over $50. 
                Most orders arrive within 2-3 business days.
              </p>
            </div>
            <div className="animate-slideInUp bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{animationDelay: '0.2s'}}>
              <Headphones className="h-12 w-12 text-purple-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our customer service team is always here to help. Reach out anytime 
                via chat, email, or phone.
              </p>
            </div>
            <div className="animate-slideInUp bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{animationDelay: '0.4s'}}>
              <Award className="h-12 w-12 text-green-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Quality Products</h3>
              <p className="text-gray-600 leading-relaxed">
                Every product is carefully selected and tested to meet our high standards. 
                30-day money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-fadeInUp text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <User className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Sarah Johnson</h3>
              <p className="text-blue-600 font-semibold mb-4">CEO & Founder</p>
              <p className="text-gray-600">
                Visionary leader with 10+ years in e-commerce and a passion for customer experience.
              </p>
            </div>
            <div className="animate-fadeInUp text-center" style={{animationDelay: '0.2s'}}>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <User className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Mike Chen</h3>
              <p className="text-purple-600 font-semibold mb-4">CTO</p>
              <p className="text-gray-600">
                Tech innovator ensuring our platform stays cutting-edge and user-friendly.
              </p>
            </div>
            <div className="animate-fadeInUp text-center" style={{animationDelay: '0.4s'}}>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <User className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Emily Rodriguez</h3>
              <p className="text-green-600 font-semibold mb-4">Head of Customer Success</p>
              <p className="text-gray-600">
                Dedicated to ensuring every customer has an amazing experience with us.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;