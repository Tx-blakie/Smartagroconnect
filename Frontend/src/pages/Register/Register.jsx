import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaTractor, FaShoppingCart, FaHandsHelping } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    pincode: '',
    state: '',
    district: '',
    taluka: '',
    address: '',
    panCard: null,
    cancelledCheque: null,
    agricultureCertificate: null,
    gstNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const panCardRef = useRef();
  const cancelledChequeRef = useRef();
  const agricultureCertificateRef = useRef();
  
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };
  
  const validateForm = () => {
    // Reset error
    setError('');
    
    // Basic validation
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.password) return 'Password is required';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    if (!formData.pincode.trim()) return 'Pincode is required';
    if (!formData.state.trim()) return 'State is required';
    if (!formData.district.trim()) return 'District is required';
    if (!formData.address.trim()) return 'Address is required';
    
    // Role-specific validation
    if (selectedRole === 'farmer' && !formData.agricultureCertificate) {
      return 'Agriculture Certificate is required for farmers';
    }
    
    if (selectedRole === 'buyer' && !formData.gstNumber.trim()) {
      return 'GST Number is required for buyers';
    }
    
    // Common validation for all roles
    if (!formData.panCard) return 'PAN Card is required';
    if (!formData.cancelledCheque) return 'Cancelled Cheque is required';
    
    return null;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    try {
      setLoading(true);
      
      // Create FormData object for file uploads
      const formDataObj = new FormData();
      
      // Add text fields
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('password', formData.password);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('role', selectedRole);
      formDataObj.append('pincode', formData.pincode);
      formDataObj.append('state', formData.state);
      formDataObj.append('district', formData.district);
      formDataObj.append('taluka', formData.taluka);
      formDataObj.append('village', formData.address); // Change address to village to match backend
      
      // Add role-specific fields
      if (selectedRole === 'buyer') {
        formDataObj.append('gstNumber', formData.gstNumber);
      }
      
      // Add files
      if (formData.panCard) {
        formDataObj.append('panCard', formData.panCard);
      }
      if (formData.cancelledCheque) {
        formDataObj.append('cancelledCheque', formData.cancelledCheque);
      }
      if (selectedRole === 'farmer' && formData.agricultureCertificate) {
        formDataObj.append('agricultureCertificate', formData.agricultureCertificate);
      }
      
      // Call signup with email, password, and the FormData object
      const userData = await signup(formData.email, formData.password, formDataObj);
      
      // Redirect to login page on success
      if (userData) {
        navigate('/login');
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError('Failed to create an account: ' + (err.response?.data?.message || err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="register-card">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Register</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              {/* Role Selection */}
              <div className="role-selector mb-4">
                <Row className="justify-content-center">
                  <Col xs={4} md={3}>
                    <div 
                      className={`role-card ${selectedRole === 'farmer' ? 'active' : ''}`}
                      onClick={() => handleRoleSelect('farmer')}
                    >
                      <FaTractor size={28} />
                      <div className="mt-2">Farmer</div>
                    </div>
                  </Col>
                  <Col xs={4} md={3}>
                    <div 
                      className={`role-card ${selectedRole === 'buyer' ? 'active' : ''}`}
                      onClick={() => handleRoleSelect('buyer')}
                    >
                      <FaShoppingCart size={28} />
                      <div className="mt-2">Buyer</div>
                    </div>
                  </Col>
                  <Col xs={4} md={3}>
                    <div 
                      className={`role-card ${selectedRole === 'helper' ? 'active' : ''}`}
                      onClick={() => handleRoleSelect('helper')}
                    >
                      <FaHandsHelping size={28} />
                      <div className="mt-2">Helper</div>
                    </div>
                  </Col>
                </Row>
              </div>
              
              <Form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name" 
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number" 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email" 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password" 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm password" 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Pincode" 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State" 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>District</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="District" 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Taluka</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="taluka"
                        value={formData.taluka}
                        onChange={handleInputChange}
                        placeholder="Taluka" 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter full address" 
                    rows={3}
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>PAN Card</Form.Label>
                      <Form.Control 
                        type="file" 
                        name="panCard"
                        onChange={handleFileChange}
                        ref={panCardRef}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Cancelled Cheque</Form.Label>
                      <Form.Control 
                        type="file" 
                        name="cancelledCheque"
                        onChange={handleFileChange}
                        ref={cancelledChequeRef}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                {selectedRole === 'farmer' && (
                  <Form.Group className="mb-3">
                    <Form.Label>Agriculture Certificate</Form.Label>
                    <Form.Control 
                      type="file" 
                      name="agricultureCertificate"
                      onChange={handleFileChange}
                      ref={agricultureCertificateRef}
                    />
                  </Form.Group>
                )}
                
                {selectedRole === 'buyer' && (
                  <Form.Group className="mb-3">
                    <Form.Label>GST Number</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleInputChange}
                      placeholder="Enter GST Number" 
                    />
                  </Form.Group>
                )}
                
                <Button 
                  className="w-100 mt-3" 
                  variant="primary" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </Form>
              
              <div className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register; 