import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const FarmerDashboard = () => {
  const { currentUser, token } = useAuth();
  const [crops, setCrops] = useState([]);
  const [requests, setRequests] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        // Fetch crops
        const cropsResponse = await axios.get(`${API_URL}/farmer/crops`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCrops(cropsResponse.data);

        // Fetch assistance requests
        const requestsResponse = await axios.get(`${API_URL}/farmer/requests`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(requestsResponse.data);

        // Fetch weather data (if location is available)
        if (currentUser?.location) {
          const weatherResponse = await axios.get(`${API_URL}/weather`, {
            params: { 
              lat: currentUser.location.latitude,
              lon: currentUser.location.longitude
            },
            headers: { Authorization: `Bearer ${token}` }
          });
          setWeatherData(weatherResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching farmer data:', error);
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, [token, currentUser]);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  return (
    <div className="container my-4">
      <h2>Welcome, {currentUser?.firstName || 'Farmer'}</h2>
      
      {/* Weather Widget */}
      {weatherData && (
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col md={4} className="text-center">
                <h3>{weatherData.current.temp}°C</h3>
                <img 
                  src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} 
                  alt="Weather icon" 
                />
                <p>{weatherData.current.weather[0].description}</p>
              </Col>
              <Col md={8}>
                <h4>Weather Forecast</h4>
                <div className="d-flex overflow-auto">
                  {weatherData.daily.slice(1, 6).map((day, index) => (
                    <div key={index} className="text-center mx-2">
                      <p>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                      <img 
                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                        alt="Weather icon" 
                      />
                      <p>{Math.round(day.temp.max)}°C / {Math.round(day.temp.min)}°C</p>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
      
      {/* Dashboard Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <i className="bi bi-sprout fs-1 text-success"></i>
              <h3>{crops.length}</h3>
              <Card.Title>Active Crops</Card.Title>
              <Button as={Link} to="/farmer/crops" variant="outline-primary" className="mt-2">
                Manage Crops
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <i className="bi bi-people fs-1 text-info"></i>
              <h3>{requests.length}</h3>
              <Card.Title>Assistance Requests</Card.Title>
              <Button as={Link} to="/farmer/requests" variant="outline-primary" className="mt-2">
                View Requests
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <i className="bi bi-cart fs-1 text-warning"></i>
              <h3>Market</h3>
              <Card.Title>Access Products</Card.Title>
              <Button as={Link} to="/products" variant="outline-primary" className="mt-2">
                Shop Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Recent Crops */}
      <h3 className="mb-3">Your Crops</h3>
      <Row className="mb-4">
        {crops.length > 0 ? (
          crops.slice(0, 3).map(crop => (
            <Col key={crop._id} md={4} className="mb-3">
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src={crop.imageUrl || '/placeholders/crop.jpg'} 
                  style={{ height: '160px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{crop.name}</Card.Title>
                  <Badge bg="info" className="mb-2">{crop.category}</Badge>
                  <Card.Text>
                    Planted: {new Date(crop.plantingDate).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text>
                    Status: <Badge bg="success">{crop.status}</Badge>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Expected harvest: {new Date(crop.expectedHarvestDate).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Card body>
              <p className="mb-0">You haven't added any crops yet. Start tracking your crops now!</p>
              <Button as={Link} to="/farmer/crops/add" variant="primary" className="mt-2">
                Add Crop
              </Button>
            </Card>
          </Col>
        )}
      </Row>
      
      {/* Recent Assistance Requests */}
      <h3 className="mb-3">Recent Assistance Requests</h3>
      <Row>
        {requests.length > 0 ? (
          requests.slice(0, 3).map(request => (
            <Col key={request._id} md={4} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{request.title}</Card.Title>
                  <Card.Text>{request.description.substring(0, 100)}...</Card.Text>
                  <Badge 
                    bg={
                      request.status === 'pending' ? 'warning' : 
                      request.status === 'assigned' ? 'info' : 
                      request.status === 'completed' ? 'success' : 'secondary'
                    }
                    className="mb-2"
                  >
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Badge>
                </Card.Body>
                <Card.Footer>
                  <Button 
                    as={Link} 
                    to={`/farmer/request/${request._id}`} 
                    variant="outline-primary" 
                    size="sm"
                  >
                    View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Card body>
              <p className="mb-0">You haven't created any assistance requests yet.</p>
              <Button as={Link} to="/farmer/request/new" variant="primary" className="mt-2">
                Create Request
              </Button>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default FarmerDashboard; 