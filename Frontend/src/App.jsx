import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Layout components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay';
import ToastNotification from './components/ToastNotification/ToastNotification';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <LoadingOverlay />
      <ToastNotification />
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Non-Farmer Routes */}
          <Route path="/products" element={<div className="container mt-5 text-center"><h2>Products Page</h2><p>This page will list all available products.</p></div>} />
          <Route path="/login" element={<div className="container mt-5 text-center"><h2>Login Page</h2><p>This page will allow users to log in.</p></div>} />
          <Route path="/register" element={<div className="container mt-5 text-center"><h2>Register Page</h2><p>This page will allow users to register.</p></div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
