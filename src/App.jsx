import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import PaymentVerify from "./pages/PaymentVerify.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AssociationSection from "./pages/AssociationSection.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProductForm from "./pages/admin/ProductForm.jsx";
import Orders from "./pages/Orders.jsx";
import SellerDashboard from "./pages/SellerDashboard.jsx";

const App = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/seller" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
        <Route path="/our-story" element={<AssociationSection slug="our-story" />} />
        <Route path="/our-community" element={<AssociationSection slug="our-community" />} />
        <Route path="/birthdays" element={<AssociationSection slug="birthdays" />} />
        <Route path="/gallery" element={<AssociationSection slug="gallery" />} />
        <Route path="/where-are-they-now" element={<AssociationSection slug="where-are-they-now" />} />
        <Route path="/forms-documents" element={<AssociationSection slug="forms-documents" />} />
        <Route path="/always-commandos" element={<AssociationSection slug="always-commandos" />} />

        <Route path="/checkout" element={
          <ProtectedRoute><Checkout /></ProtectedRoute>
        } />
        <Route path="/payment/verify" element={
          <ProtectedRoute><PaymentVerify /></ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute adminOnly><Orders adminView /></ProtectedRoute>
        } />
        <Route path="/admin/products/new" element={
          <ProtectedRoute><ProductForm /></ProtectedRoute>
        } />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
