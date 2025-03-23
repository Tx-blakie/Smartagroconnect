import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import ToastNotification from "./components/ToastNotification/ToastNotification";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from './pages/Profile/Profile';

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import ProductManagement from "./pages/Admin/ProductManagement";
import Analytics from "./pages/Admin/Analytics";
import Settings from "./pages/Admin/Settings";

// Buyer Pages
import BuyerDashboard from "./pages/Buyer/BuyerDashboard.jsx";
import ProductCatalog from "./pages/Buyer/ProductCatalog.jsx";
import Cart from "./pages/Buyer/Cart.jsx";

// Helper Pages
import HelperDashboard from "./pages/Helper/HelperDashboard.jsx";
import AvailableRequests from "./pages/Helper/AvailableRequests.jsx";
import RequestDetail from "./pages/Helper/RequestDetail.jsx";

// Farmer Pages
import FarmerDashboard from "./pages/Farmer/FarmerDashboard.jsx";

// Protected route component
const PrivateRoute = ({ element }) => {
  const { currentUser } = useAuth();
  return currentUser ? element : <Navigate to="/login" />;
};

// Admin route component
const AdminRoute = ({ element }) => {
  const { currentUser, userRole } = useAuth();
  return currentUser && userRole === "admin" ? (
    element
  ) : (
    <Navigate to="/dashboard" />
  );
};

// Create role-specific route components
const BuyerRoute = ({ element }) => {
  const { currentUser, userRole } = useAuth();
  return currentUser && userRole === "buyer" ? (
    element
  ) : (
    <Navigate to="/dashboard" />
  );
};

const HelperRoute = ({ element }) => {
  const { currentUser, userRole } = useAuth();
  return currentUser && userRole === "helper" ? (
    element
  ) : (
    <Navigate to="/dashboard" />
  );
};

const FarmerRoute = ({ element }) => {
  const { currentUser, userRole } = useAuth();
  return currentUser && userRole === "farmer" ? (
    element
  ) : (
    <Navigate to="/dashboard" />
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <LoadingOverlay />
        <ToastNotification />
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Common Protected Routes */}
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            />
            <Route
              path="/products"
              element={<PrivateRoute element={<ProductCatalog />} />}
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={<AdminRoute element={<AdminDashboard />} />}
            >
              <Route index element={<Navigate to="/admin/users" replace />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Buyer Routes */}
            <Route
              path="/buyer"
              element={<BuyerRoute element={<BuyerDashboard />} />}
            />
            <Route
              path="/buyer/products"
              element={<BuyerRoute element={<ProductCatalog />} />}
            />
            <Route
              path="/buyer/cart"
              element={<BuyerRoute element={<Cart />} />}
            />

            {/* Helper Routes */}
            <Route
              path="/helper"
              element={<HelperRoute element={<HelperDashboard />} />}
            />
            <Route
              path="/helper/available-requests"
              element={<HelperRoute element={<AvailableRequests />} />}
            />
            <Route
              path="/helper/request/:requestId"
              element={<HelperRoute element={<RequestDetail />} />}
            />

            {/* Farmer Routes */}
            <Route
              path="/farmer"
              element={<FarmerRoute element={<FarmerDashboard />} />}
            />
            {/* Add more farmer-specific routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
