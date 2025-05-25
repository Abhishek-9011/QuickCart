import { useState } from 'react';
import { 
  CreditCard, 
  Truck, 
  ClipboardCheck, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  ShieldCheck,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample data from CartPage
const sampleCartItems = [
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

// Step progress indicator
const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, name: "Shipping" },
    { id: 2, name: "Payment" },
    { id: 3, name: "Review" },
    { id: 4, name: "Confirmation" }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
              ${currentStep >= step.id 
                ? 'bg-indigo-600 border-indigo-600 text-white' 
                : 'border-gray-300 text-gray-400'}`}
            >
              {currentStep > step.id ? (
                <CheckCircle size={16} />
              ) : (
                step.id
              )}
            </div>
            <span className={`mt-2 text-sm ${currentStep >= step.id ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className={`hidden sm:block absolute h-0.5 w-full ${currentStep > index + 1 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Order Summary Component (Simplified from CartSummary)
const OrderSummary = ({ cartItems, showDetails = false }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10.00;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      {showDetails && (
        <div className="mb-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center py-2">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-gray-200 my-4"></div>
        </div>
      )}
      
      <div className="space-y-3">
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
    </div>
  );
};

// Shipping Form Component
const ShippingForm = ({ shippingInfo, setShippingInfo, goToNextStep }) => {
  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToNextStep();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Truck className="text-indigo-600 mr-2" size={24} />
        <h2 className="text-xl font-medium text-gray-900">Shipping Information</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={shippingInfo.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={shippingInfo.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingInfo.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingInfo.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={shippingInfo.zipCode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={shippingInfo.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="pt-4 flex justify-between">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Return to Cart</span>
          </button>
          
          <button
            type="submit"
            className="bg-indigo-600 text-white font-medium py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center"
          >
            <span>Continue to Payment</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

// Payment Form Component
const PaymentForm = ({ paymentInfo, setPaymentInfo, goToNextStep, goToPreviousStep }) => {
  const handleChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToNextStep();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <CreditCard className="text-indigo-600 mr-2" size={24} />
        <h2 className="text-xl font-medium text-gray-900">Payment Details</h2>
      </div>
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-md p-3 mb-6 flex items-start">
        <ShieldCheck className="text-indigo-600 mr-2 flex-shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-indigo-800">
          Your payment information is encrypted and secure. We never store your full credit card details.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            value={paymentInfo.cardholderName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center">
                CVV
                <Info size={14} className="ml-1 text-gray-400" title="3-digit code on back of card" />
              </span>
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handleChange}
              placeholder="123"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 my-6"></div>
        
        <div>
          <label htmlFor="billingAddress" className="flex items-center">
            <input
              type="checkbox"
              id="billingAddress"
              name="sameAsShipping"
              checked={paymentInfo.sameAsShipping}
              onChange={() => setPaymentInfo({...paymentInfo, sameAsShipping: !paymentInfo.sameAsShipping})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Billing address same as shipping</span>
          </label>
        </div>
        
        <div className="pt-4 flex justify-between">
          <button
            type="button"
            onClick={goToPreviousStep}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Back to Shipping</span>
          </button>
          
          <button
            type="submit"
            className="bg-indigo-600 text-white font-medium py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center"
          >
            <span>Review Order</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

// Order Review Component
const OrderReview = ({ cartItems, shippingInfo, paymentInfo, goToNextStep, goToPreviousStep }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <ClipboardCheck className="text-indigo-600 mr-2" size={24} />
        <h2 className="text-xl font-medium text-gray-900">Review Your Order</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Shipping Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-800">{shippingInfo.firstName} {shippingInfo.lastName}</p>
            <p className="text-gray-600">{shippingInfo.address}</p>
            <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
            <p className="text-gray-600 mt-2">Email: {shippingInfo.email}</p>
            <p className="text-gray-600">Phone: {shippingInfo.phone}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Payment Method</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-800">
              <span>{paymentInfo.cardholderName}</span>
              <span className="ml-2 text-gray-500">
                •••• •••• •••• {paymentInfo.cardNumber.slice(-4)}
              </span>
            </p>
            <p className="text-gray-600 mt-1">Expires: {paymentInfo.expiryDate}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Order Items</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="pt-6 mt-4 flex justify-between">
        <button
          onClick={goToPreviousStep}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Back to Payment</span>
        </button>
        
        <button
          onClick={goToNextStep}
          className="bg-indigo-600 text-white font-medium py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center"
        >
          <span>Place Order</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Order Confirmation Component
const OrderConfirmation = ({ orderNumber }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 rounded-full p-3">
          <CheckCircle className="text-green-600" size={40} />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
      
      <div className="bg-gray-50 py-4 px-6 rounded-md inline-block mb-6">
        <p className="text-sm text-gray-500">Order Number</p>
        <p className="text-lg font-medium text-gray-900">{orderNumber}</p>
      </div>
      
      <p className="text-gray-600 mb-8">
        A confirmation email has been sent to your email address with all the details of your order.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to={"/invoice"} className="bg-indigo-600 text-white font-medium py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-200">
          Generate Invoice
        </Link>
        <button className="border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-md hover:bg-gray-50 transition duration-200">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

// Main Checkout Page Component
export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems] = useState(sampleCartItems);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    phone: ""
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    sameAsShipping: true
  });
  const [orderNumber, setOrderNumber] = useState("");
  
  const goToNextStep = () => {
    if (currentStep === 3) {
      // Generate random order number when placing order
      setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    }
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };
  
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShippingForm 
            shippingInfo={shippingInfo}
            setShippingInfo={setShippingInfo}
            goToNextStep={goToNextStep}
          />
        );
      case 2:
        return (
          <PaymentForm 
            paymentInfo={paymentInfo}
            setPaymentInfo={setPaymentInfo}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 3:
        return (
          <OrderReview 
            cartItems={cartItems}
            shippingInfo={shippingInfo}
            paymentInfo={paymentInfo}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 4:
        return (
          <OrderConfirmation orderNumber={orderNumber} />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <CheckoutSteps currentStep={currentStep} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {renderStepContent()}
          </div>
          
          <div>
            <OrderSummary 
              cartItems={cartItems} 
              showDetails={currentStep < 4} 
            />
            
            {currentStep < 4 && (
              <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600">
                  Our customer service team is available 24/7 to assist you with any questions.
                </p>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
                  Contact Support
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}