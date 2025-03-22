import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import './Profile.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const Profile = () => {
  const { t } = useTranslation();
  const { currentUser, userRole, token, fetchUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    district: '',
    taluka: '',
    village: '',
    pincode: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Load user profile data
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Set initial profile data from current user
    setProfileData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      state: currentUser.state || '',
      district: currentUser.district || '',
      taluka: currentUser.taluka || '',
      village: currentUser.village || '',
      pincode: currentUser.pincode || '',
    });
  }, [currentUser, navigate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.put(`${API_URL}/users/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setSuccess('Profile updated successfully');
      await fetchUserProfile(); // Refresh user data
      setIsEditing(false);
    } catch (err) {
      console.error('Profile update error:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Role-specific fields
  const renderRoleSpecificFields = () => {
    switch (userRole) {
      case 'farmer':
        return (
          <Form.Group className="mb-3">
            <Form.Label>Agriculture Certificate</Form.Label>
            <div>
              {currentUser.agricultureCertificate ? (
                <div className="d-flex align-items-center">
                  <i className="bi bi-file-earmark-check text-success me-2"></i>
                  <span>Certificate uploaded</span>
                </div>
              ) : (
                <div className="text-muted">No certificate uploaded</div>
              )}
            </div>
          </Form.Group>
        );
      case 'buyer':
        return (
          <Form.Group className="mb-3">
            <Form.Label>GST Number</Form.Label>
            <Form.Control
              type="text"
              name="gstNumber"
              value={profileData.gstNumber || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter GST number"
            />
          </Form.Group>
        );
      case 'helper':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                name="qualification"
                value={profileData.qualification || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter qualification"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expertise</Form.Label>
              <Form.Control
                type="text"
                name="expertise"
                value={profileData.expertise || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter area of expertise"
              />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="profile-card">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{t('profile')}</h2>
                {!isEditing ? (
                  <Button 
                    variant="outline-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    <i className="bi bi-pencil me-1"></i>
                    {t('edit')}
                  </Button>
                ) : (
                  <Button 
                    variant="outline-secondary"
                    onClick={() => {
                      setIsEditing(false);
                      // Reset form to current user data
                      setProfileData({
                        name: currentUser.name || '',
                        email: currentUser.email || '',
                        phone: currentUser.phone || '',
                        state: currentUser.state || '',
                        district: currentUser.district || '',
                        taluka: currentUser.taluka || '',
                        village: currentUser.village || '',
                        pincode: currentUser.pincode || '',
                      });
                    }}
                  >
                    <i className="bi bi-x me-1"></i>
                    {t('cancel')}
                  </Button>
                )}
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    value={userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : ''}
                    disabled
                    readOnly
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={true} // Email can't be changed
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={profileData.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>District</Form.Label>
                      <Form.Control
                        type="text"
                        name="district"
                        value={profileData.district}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Taluka</Form.Label>
                      <Form.Control
                        type="text"
                        name="taluka"
                        value={profileData.taluka}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Village</Form.Label>
                      <Form.Control
                        type="text"
                        name="village"
                        value={profileData.village}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        value={profileData.pincode}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                {renderRoleSpecificFields()}
                
                {isEditing && (
                  <div className="d-grid mt-4">
                    <Button 
                      type="submit" 
                      variant="primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" className="me-2" />
                          {t('saving')}...
                        </>
                      ) : (
                        t('saveChanges')
                      )}
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile; 