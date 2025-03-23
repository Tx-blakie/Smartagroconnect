import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const BuyerDashboard = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    cartItems: 0
  });

  // Redirect if not buyer
  useEffect(() => {
    if (!currentUser || userRole !== "buyer") {
      navigate("/dashboard");
    }
  }, [currentUser, userRole, navigate]);

  // Fetch dashboard data
  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setRecommendedProducts([
        {
          _id: "p1",
          name: "Organic Fertilizer",
          description: "Premium quality organic fertilizer for all crops",
          imageUrl: "https://via.placeholder.com/150",
          price: 29.99,
          category: "Fertilizers"
        },
        {
          _id: "p2",
          name: "Irrigation System",
          description: "Complete drip irrigation kit for small farms",
          imageUrl: "https://via.placeholder.com/150",
          price: 149.99,
          category: "Equipment"
        },
        {
          _id: "p3",
          name: "Heirloom Tomato Seeds",
          description: "Pack of 100 organic heirloom tomato seeds",
          imageUrl: "https://via.placeholder.com/150",
          price: 12.99,
          category: "Seeds"
        }
      ]);
      
      setRecentOrders([
        {
          _id: "o1",
          orderedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          items: [{ product: "Irrigation Tools", quantity: 2 }],
          totalAmount: 79.98,
          status: "delivered"
        },
        {
          _id: "o2",
          orderedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          items: [{ product: "Pest Control Kit", quantity: 1 }],
          totalAmount: 45.50,
          status: "processing"
        }
      ]);
      
      setStats({
        totalOrders: 12,
        pendingOrders: 2,
        cartItems: 3
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Welcome, {currentUser?.firstName || 'Buyer'}</h2>
          <p className="text-muted">Browse and purchase agricultural products with ease.</p>
        </Col>
      </Row>

      {/* Quick Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center h-100 border-primary">
            <Card.Body>
              <div className="mb-2">
                <i className="bi bi-bag-check text-primary" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3>{stats.totalOrders}</h3>
              <Card.Title>Total Orders</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100 border-warning">
            <Card.Body>
              <div className="mb-2">
                <i className="bi bi-hourglass-split text-warning" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3>{stats.pendingOrders}</h3>
              <Card.Title>Pending Orders</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100 border-success">
            <Card.Body>
              <div className="mb-2">
                <i className="bi bi-cart text-success" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3>{stats.cartItems}</h3>
              <Card.Title>Cart Items</Card.Title>
              {stats.cartItems > 0 && (
                <Button 
                  as={Link} 
                  to="/buyer/cart" 
                  variant="success" 
                  size="sm" 
                  className="mt-2"
                >
                  View Cart
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recommended Products */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Recommended Products</h3>
          <Button 
            as={Link} 
            to="/buyer/products" 
            variant="outline-primary" 
            size="sm"
          >
            View All Products
          </Button>
        </div>
        
        <Row>
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map(product => (
              <Col key={product._id} md={4} className="mb-3">
                <Card className="h-100">
                  <Card.Img 
                    variant="top" 
                    src={product.imageUrl} 
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Badge bg="info" className="mb-2">{product.category}</Badge>
                    <Card.Text>
                      {product.description.substring(0, 100)}...
                    </Card.Text>
                    <h5 className="text-primary">${product.price.toFixed(2)}</h5>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between">
                    <Button 
                      as={Link} 
                      to={`/buyer/product/${product._id}`} 
                      variant="outline-primary" 
                      size="sm"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card body className="text-center">
                <p className="mb-2">No recommended products available yet.</p>
                <Button as={Link} to="/buyer/products" variant="primary">
                  Browse All Products
                </Button>
              </Card>
            </Col>
          )}
        </Row>
      </div>

      {/* Recent Orders */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Recent Orders</h3>
          <Button 
            as={Link} 
            to="/buyer/orders" 
            variant="outline-primary" 
            size="sm"
          >
            View All Orders
          </Button>
        </div>

        {recentOrders.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order._id}>
                    <td>#{order._id.substring(0, 8)}</td>
                    <td>{new Date(order.orderedAt).toLocaleDateString()}</td>
                    <td>{order.items.length}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>
                      <Badge bg={
                        order.status === 'delivered' ? 'success' :
                        order.status === 'shipping' ? 'info' :
                        order.status === 'processing' ? 'warning' :
                        order.status === 'cancelled' ? 'danger' : 'secondary'
                      }>
                        {order.status}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        as={Link} 
                        to={`/buyer/order/${order._id}`} 
                        variant="outline-secondary" 
                        size="sm"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Card body className="text-center">
            <p className="mb-2">You haven't placed any orders yet.</p>
            <Button as={Link} to="/buyer/products" variant="primary">
              Start
            </Button>
          </Card>
        )}
      </div>
    </Container>
  );
};

export default BuyerDashboard; 