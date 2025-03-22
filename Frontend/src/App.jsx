import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import ProductManagement from "./pages/Admin/ProductManagement";
import Analytics from "./pages/Admin/Analytics";
import Settings from "./pages/Admin/Settings";

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

            {/* Non-Farmer Routes */}
            <Route
              path="/products"
              element={
                <div className="container mt-5 text-center">
                  <h2>Products Page</h2>
                  <p>This page will list all available products.</p>
                </div>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
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
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
