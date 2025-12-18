import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Brands from "../pages/Brands";
import Categories from "../pages/Categories";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Orders from "../pages/Orders";
import Checkout from "../pages/Checkout";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />

      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/brands" element={<Brands />} />
      <Route path="/categories" element={<Categories />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

