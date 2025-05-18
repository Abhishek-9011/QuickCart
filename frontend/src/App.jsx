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

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>      
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/user-profile" element={<Profile/>}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/admin-products" element={<AdminProduct />}></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/admin-orders" element={<AdminOrders/>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>

  );
}

export default App;
