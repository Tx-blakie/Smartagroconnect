import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay';
import ToastNotification from './components/ToastNotification/ToastNotification';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';

// Protected route component
const PrivateRoute = ({ element }) => {
  const { currentUser } = useAuth();
  return currentUser ? element : <Navigate to="/login" />;
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
            <Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
