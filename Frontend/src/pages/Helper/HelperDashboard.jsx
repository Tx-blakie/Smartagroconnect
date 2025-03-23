import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Card, Container, Row, Col, Badge, ProgressBar } from "react-bootstrap";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const HelperDashboard = () => {
  const { currentUser, userRole, token } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [activeRequests, setActiveRequests] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [stats, setStats] = useState({
    completionRate: 0,
    averageRating: 0,
    totalEarnings: 0,
    requestsCompleted: 0
  });

  // Redirect if not helper
  useEffect(() => {
    if (!currentUser || userRole !== "helper") {
      navigate("/dashboard");
    }
  }, [currentUser, userRole, navigate]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchHelperData = async () => {
      // In a real application, these would be actual API calls
      // For now, we'll use mock data
      
      // Simulating API delay
      setTimeout(() => {
        // Mock data
        setActiveRequests([
          {
            _id: "12345",
            title: "Harvest assistance needed",
            description: "Need help with corn harvesting on my 2-acre farm",
            farmer: { firstName: "John", lastName: "Doe" },
            status: "in-progress",
            progress: 65,
            dueDate: new Date().setDate(new Date().getDate() + 7)
          },
          {
            _id: "67890",
            title: "Irrigation system setup",
            description: "Looking for help to install drip irrigation system",
            farmer: { firstName: "Jane", lastName: "Smith" },
            status: "assigned",
            progress: 20,
            dueDate: new Date().setDate(new Date().getDate() + 14)
          }
        ]);
        
        setPendingPayments([
          {
            _id: "p12345",
            request: { _id: "r12345", title: "Pest control assistance" },
            farmer: { firstName: "Mike", lastName: "Johnson" },
            amount: 120,
            completionDate: new Date().setDate(new Date().getDate() - 5)
          }
        ]);
        
        setStats({
          completionRate: 87,
          averageRating: 4.7,
          totalEarnings: 950,
          requestsCompleted: 12
        });
        
        setLoading(false);
      }, 1000);
    };

    fetchHelperData();
  }, [token]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'assigned':
        return <Badge bg="info">Assigned</Badge>;
      case 'in-progress':
        return <Badge bg="primary">In Progress</Badge>;
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading dashboard...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2>Helper Dashboard</h2>
      <p className="text-muted">Welcome back, {currentUser?.firstName || "Helper"}!</p>
      
      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center h-100 border-primary">
            <Card.Body>
              <div className="mb-2">
                <i className="bi bi-star-fill text-warning" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3>{stats.averageRating.toFixed(1)} / 5.0</h3>
              <Card.Title>Rating</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 border-success">
            <Card.Body>
              <div className="mb-2">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3>{stats.requestsCompleted}</h3>
              <Card.Title>Completed</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 border-info">
            <Card.Body>
              <div className="mb-2">
                <i className="bi bi-percent text-info" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3>{stats.completionRate}%</h3>
              <Card.Title>Completion Rate</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 border-warning">
            <Card.Body>
              <div className="mb-2">
                <i className="bi bi-currency-dollar text-warning" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3>${stats.totalEarnings.toFixed(2)}</h3>
              <Card.Title>Earnings</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Active Requests */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Active Requests</h3>
          <Button 
            as={Link} 
            to="/helper/requests" 
            variant="outline-primary" 
            size="sm"
          >
            View All Requests
          </Button>
        </div>
        
        {activeRequests.length > 0 ? (
          <Row>
            {activeRequests.map(request => (
              <Col key={request._id} md={4} className="mb-3">
                <Card className="h-100 border-primary">
                  <Card.Header className="d-flex justify-content-between">
                    <span>Request #{request._id.substring(0, 6)}</span>
                    {getStatusBadge(request.status)}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{request.title}</Card.Title>
                    <Card.Text>
                      {request.description.substring(0, 120)}...
                    </Card.Text>
                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">Progress:</small>
                      <ProgressBar 
                        now={request.progress || 0} 
                        label={`${request.progress || 0}%`} 
                        variant="primary" 
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">
                        Farmer: {request.farmer.firstName} {request.farmer.lastName}
                      </small>
                      <small className="text-muted">
                        Due: {new Date(request.dueDate).toLocaleDateString()}
                      </small>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <Button 
                      as={Link} 
                      to={`/helper/request/${request._id}`} 
                      variant="primary" 
                      className="w-100"
                    >
                      Manage Request
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Card body className="text-center">
            <p className="mb-2">You don't have any active requests.</p>
            <Button as={Link} to="/helper/available-requests" variant="primary">
              Find Available Requests
            </Button>
          </Card>
        )}
      </div>
      
      {/* Pending Payments */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Pending Payments</h3>
          <Button 
            as={Link} 
            to="/helper/payments" 
            variant="outline-primary" 
            size="sm"
          >
            View All Payments
          </Button>
        </div>

        {pendingPayments.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Request</th>
                  <th>Farmer</th>
                  <th>Completion Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingPayments.map(payment => (
                  <tr key={payment._id}>
                    <td>
                      <Link to={`/helper/request/${payment.request._id}`}>
                        {payment.request.title}
                      </Link>
                    </td>
                    <td>{payment.farmer.firstName} {payment.farmer.lastName}</td>
                    <td>{new Date(payment.completionDate).toLocaleDateString()}</td>
                    <td className="text-success fw-bold">${payment.amount.toFixed(2)}</td>
                    <td>
                      <Badge bg="warning">Pending</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Card body className="text-center">
            <p>You don't have any pending payments.</p>
          </Card>
        )}
      </div>
      
      {/* Call to Action */}
      <Card className="bg-light border-0 mb-4">
        <Card.Body className="text-center">
          <h4>Looking for more work?</h4>
          <p>Browse available assistance requests in your area</p>
          <Button as={Link} to="/helper/available-requests" variant="success">
            Find Available Requests
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HelperDashboard; 