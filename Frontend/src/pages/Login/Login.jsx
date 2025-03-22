import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Tabs, Tab } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../config/firebase';
import './Login.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [emailForm, setEmailForm] = useState({
    email: '',
    password: '',
  });
  const [phoneForm, setPhoneForm] = useState({
    phoneNumber: '',
    otp: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Setup recaptcha when component mounts
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
    });
  }, []);
  
  const handleEmailInputChange = (e) => {
    const { name, value } = e.target;
    setEmailForm({
      ...emailForm,
      [name]: value
    });
  };
  
  const handlePhoneInputChange = (e) => {
    const { name, value } = e.target;
    setPhoneForm({
      ...phoneForm,
      [name]: value
    });
  };
  
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    if (!emailForm.email.trim() || !emailForm.password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(emailForm.email, emailForm.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  const handleSendOTP = async () => {
    if (!phoneForm.phoneNumber.trim()) {
      setError('Please enter a phone number');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Format phone number (ensure it has country code)
      let formattedPhone = phoneForm.phoneNumber;
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+91' + formattedPhone; // Default to India country code
      }
      
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError('Failed to send OTP: ' + (err.message || 'Unknown error'));
      
      // Reset reCAPTCHA
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
      
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOTP = async () => {
    if (!phoneForm.otp.trim()) {
      setError('Please enter the OTP');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      await confirmationResult.confirm(phoneForm.otp);
      navigate('/dashboard');
      
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError('Invalid OTP: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="login-card">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Login</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-4"
              >
                <Tab eventKey="email" title="Email & Password">
                  <Form onSubmit={handleEmailLogin}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email"
                        value={emailForm.email}
                        onChange={handleEmailInputChange}
                        placeholder="Enter email" 
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        name="password"
                        value={emailForm.password}
                        onChange={handleEmailInputChange}
                        placeholder="Enter password" 
                      />
                    </Form.Group>
                    
                    <Button 
                      className="w-100 mt-3" 
                      variant="primary" 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </Form>
                </Tab>
                
                <Tab eventKey="phone" title="Phone Number">
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="phoneNumber"
                        value={phoneForm.phoneNumber}
                        onChange={handlePhoneInputChange}
                        placeholder="Enter phone number (with country code)" 
                        disabled={otpSent}
                      />
                    </Form.Group>
                    
                    {!otpSent ? (
                      <Button 
                        className="w-100" 
                        variant="primary" 
                        onClick={handleSendOTP}
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send OTP'}
                      </Button>
                    ) : (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>OTP</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="otp"
                            value={phoneForm.otp}
                            onChange={handlePhoneInputChange}
                            placeholder="Enter OTP" 
                          />
                        </Form.Group>
                        
                        <div className="d-flex justify-content-between">
                          <Button 
                            variant="outline-secondary" 
                            onClick={() => {
                              setOtpSent(false);
                              setPhoneForm({...phoneForm, otp: ''});
                            }}
                            disabled={loading}
                          >
                            Change Number
                          </Button>
                          
                          <Button 
                            variant="primary" 
                            onClick={handleVerifyOTP}
                            disabled={loading}
                          >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                          </Button>
                        </div>
                      </>
                    )}
                  </Form>
                </Tab>
              </Tabs>
              
              <div className="text-center mt-3">
                Don't have an account? <Link to="/register">Register</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container"></div>
    </Container>
  );
};

export default Login; 