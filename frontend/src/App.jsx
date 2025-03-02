import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import AdminDashboard from "./components/AdminDashboard";
import AdminProduct from "./components/AdminProduct";
import AdminOrders from "./components/AdminOrders";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>      
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
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
