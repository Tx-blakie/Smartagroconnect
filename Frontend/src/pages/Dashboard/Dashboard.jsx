import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { currentUser, userRole, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Render role-specific dashboard content
  const renderRoleContent = () => {
    switch (userRole) {
      case "farmer":
        return (
          <div className="role-content">
            <h3>Farmer Dashboard</h3>
            <Row className="mt-4">
              <Col md={4}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <Card.Title>My Products</Card.Title>
                    <Card.Text>
                      Manage your agricultural products and inventory
                    </Card.Text>
                    <Button variant="primary">View Products</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <Card.Title>Orders</Card.Title>
                    <Card.Text>
                      View and manage incoming orders from buyers
                    </Card.Text>
                    <Button variant="primary">View Orders</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <Card.Title>Analytics</Card.Title>
                    <Card.Text>
                      View your sales analytics and performance
                    </Card.Text>
                    <Button variant="primary">View Analytics</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );

      case "buyer":
        return (
          <div className="role-content">
            <h3>Buyer Dashboard</h3>
            <Row className="mt-4">
              <Col md={4}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <Card.Title>Browse Products</Card.Title>
                    <Card.Text>
                      Browse and purchase agricultural products
                    </Card.Text>
                    <Button variant="primary">Shop Now</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <Card.Title>My Orders</Card.Title>
                    <Card.Text>
                      View your order history and track current orders
                    </Card.Text>
                    <Button variant="primary">View Orders</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <Card.Title>Saved Items</Card.Title>
                    <Card.Text>View and manage your saved products</Card.Text>
                    <Button variant="primary">View Saved</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );

      case "helper":
        return (
          <div className="role-content">
            <h3>Helper Dashboard</h3>
            <Row className="mt-4">
              <Col md={4}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <Card.Title>Assist Farmers</Card.Title>
                    <Card.Text>
                      Provide assistance to farmers with their queries
                    </Card.Text>
                    <Button variant="primary">View Requests</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <Card.Title>Knowledge Base</Card.Title>
                    <Card.Text>
                      Access agricultural resources and guidelines
                    </Card.Text>
                    <Button variant="primary">Access Knowledge</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <Card.Title>Communication</Card.Title>
                    <Card.Text>Communicate with farmers and buyers</Card.Text>
                    <Button variant="primary">Open Chat</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );

      case "admin":
        return (
          <div className="role-content">
            <h3>Admin Dashboard</h3>
            <Row className="mt-4">
              <Col md={4}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <Card.Title>User Management</Card.Title>
                    <Card.Text>Manage all users of the platform</Card.Text>
                    <Button variant="primary" as={Link} to="/admin/users">
                      Manage Users
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <Card.Title>Product Verification</Card.Title>
                    <Card.Text>Verify and manage product listings</Card.Text>
                    <Button variant="primary" as={Link} to="/admin/products">
                      View Products
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <Card.Title>Platform Analytics</Card.Title>
                    <Card.Text>View comprehensive platform analytics</Card.Text>
                    <Button variant="primary" as={Link} to="/admin/analytics">
                      View Analytics
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );

      default:
        return (
          <div className="role-content">
            <h3>Welcome to Smart AgroConnect</h3>
            <p>Your role has not been assigned yet. Please contact support.</p>
          </div>
        );
    }
  };

  return (
    <Container className="py-5">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          {userProfile && (
            <p>
              Welcome, {userProfile.name} ({userRole})
            </p>
          )}
        </div>
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="dashboard-content mt-4">{renderRoleContent()}</div>
    </Container>
  );
};

export default Dashboard;
