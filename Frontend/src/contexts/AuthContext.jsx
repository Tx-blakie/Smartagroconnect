import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  
  // Register a new user
  async function signup(email, password, userData) {
    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        ...userData,
        email,
        password
      });
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setCurrentUser(response.data);
        setUserRole(response.data.role);
        setUserProfile(response.data);
      }
      
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }
  
  // Login with email and password
  async function login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/users/login`, { 
        email, 
        password 
      });
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setCurrentUser(response.data);
        setUserRole(response.data.role);
        setUserProfile(response.data);
      }
      
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  
  // Logout
  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    setUserRole(null);
    setUserProfile(null);
  }
  
  // Fetch user profile
  async function fetchUserProfile() {
    if (!token) return null;
    
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data) {
        setCurrentUser(response.data);
        setUserRole(response.data.role);
        setUserProfile(response.data);
        return response.data;
      }
      
      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      
      // If token is invalid or expired, logout
      if (error.response && error.response.status === 401) {
        logout();
      }
      
      return null;
    }
  }
  
  // Check auth status on load
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token) {
        await fetchUserProfile();
      }
      setLoading(false);
    };
    
    checkAuthStatus();
  }, [token]);
  
  const value = {
    currentUser,
    userRole,
    userProfile,
    token,
    signup,
    login,
    logout,
    fetchUserProfile
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext; 