import React from "react";
import CrudProducts from './pages/ProductCRUD';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from "./pages/dashboard";
import Analytics from "./pages/analytics";

import OrderPage from "./pages/OrderPage";

import VendorProfile from "./pages/adminProfile";
import AddRecommendation from "./pages/recommendations";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<CrudProducts />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />

        <Route path="/order" element={<OrderPage />} />

        <Route path="/profile" element={<VendorProfile />} />
        <Route path="/recommendation" element={<AddRecommendation />} />
      </Routes>
  );
}

export default App;
