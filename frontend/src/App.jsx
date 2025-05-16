import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import AdminDashboard from "./components/seller/AdminDashboard";
import AdminProduct from "./components/seller/AdminProduct";
import AdminOrders from "./components/seller/AdminOrders";
import CardList from "./components/CardList";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>      
      <Routes>
        <Route path="/temp" element={<CardList/>}></Route>
        <Route path="/" element={<LandingPage/>}></Route>
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
