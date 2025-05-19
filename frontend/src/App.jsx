import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import AdminDashboard from "./components/seller/AdminDashboard";
import AdminProduct from "./components/seller/AdminProduct";
import AdminOrders from "./components/seller/AdminOrders";
import LandingPage from "./pages/LandingPage";
import Profile from "./components/user/Profile";
import Products from "./components/product/Products";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishListPage";
import InvoicePage from "./pages/InvoicePage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Navbar and Footer */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/invoice" element={<InvoicePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/user-profile" element={<Profile />} />
              <Route path="/products" element={<Products />} />
              <Route path="/admin-products" element={<AdminProduct />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin-orders" element={<AdminOrders />} />
            </Routes>
            <Footer />
          </>
        } />

        {/* Auth routes without Navbar and Footer */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;