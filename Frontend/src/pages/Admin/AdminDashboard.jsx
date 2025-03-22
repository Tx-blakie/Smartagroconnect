import React, { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("users");

  // Redirect if not admin
  React.useEffect(() => {
    if (!currentUser || userRole !== "admin") {
      navigate("/dashboard");
    }
  }, [currentUser, userRole, navigate]);

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
    navigate(`/admin/${selectedKey}`);
  };

  return (
    <Container fluid className="admin-dashboard p-0">
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={2} className="admin-sidebar">
          <div className="sidebar-header">
            <h3>Admin Panel</h3>
          </div>
          <Nav
            className="flex-column"
            activeKey={activeKey}
            onSelect={handleSelect}
          >
            <Nav.Link as={Link} to="/admin/users" eventKey="users">
              <i className="bi bi-people me-2"></i> Users
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/products" eventKey="products">
              <i className="bi bi-box me-2"></i> Products
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/analytics" eventKey="analytics">
              <i className="bi bi-graph-up me-2"></i> Analytics
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/settings" eventKey="settings">
              <i className="bi bi-gear me-2"></i> Settings
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard" className="mt-auto">
              <i className="bi bi-arrow-left me-2"></i> Back to Dashboard
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={10} className="admin-content">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
