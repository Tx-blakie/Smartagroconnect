import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container fluid className="my-5">
      {/* About Us Header */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1>About Our Natural Products Marketplace</h1>
          <p className="lead text-muted">Connecting you with premium quality natural products from sustainable sources</p>
        </Col>
      </Row>

      {/* Mission Section */}
      <Row className="mb-5 align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <h2>Our Mission</h2>
          <p>
            We're on a mission to revolutionize the natural products marketplace by creating a transparent platform that connects conscious consumers with verified sustainable producers.
          </p>
          <p>
            We believe that producers deserve fair compensation for their commitment to quality and sustainability, while consumers deserve access to authentic natural products at reasonable prices.
          </p>
          <p>
            Through our platform, we aim to promote environmental responsibility, ethical sourcing practices, and bring transparency to the natural products supply chain.
          </p>
        </Col>
        <Col md={6}>
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
            alt="Natural products display"
            className="img-fluid rounded"
          />
        </Col>
      </Row>

      {/* Our Story */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 bg-light">
            <Card.Body className="p-5">
              <h2 className="mb-4">Our Story</h2>
              <p>
                Our marketplace was founded by a group of natural product enthusiasts and technology innovators who saw the challenges faced by quality-focused producers in reaching consumers directly.
              </p>
              <p>
                We noticed that while dedicated producers worked tirelessly to create exceptional natural products, they often received unfair prices due to multiple layers of distribution. Meanwhile, consumers were paying premium prices for products that weren't always authentic or of the best quality.
              </p>
              <p>
                This inspired us to create a platform that bridges this gap, providing producers with direct market access and consumers with verified natural products at fair prices.
              </p>
              <p>
                Starting with just a handful of producers in one region, we've since grown to connect hundreds of natural product creators with thousands of conscious consumers across the country.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Team Section */}
      <Row className="mb-5">
        <Col className="text-center mb-4">
          <h2>Our Team</h2>
          <p className="lead text-muted">Meet the people behind our natural products marketplace</p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={3} className="mb-4">
          <Card className="h-100">
            <Card.Img variant="top" src="https://via.placeholder.com/300x300?text=Priya" />
            <Card.Body className="text-center">
              <Card.Title>Priya Ladola</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">MCA Student</Card.Subtitle>
              <Card.Text>
                Passionate about web development and creating user-friendly interfaces for digital platforms.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="h-100">
            <Card.Img variant="top" src="https://via.placeholder.com/300x300?text=Parv" />
            <Card.Body className="text-center">
              <Card.Title>Parv Somani</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">MCA Student</Card.Subtitle>
              <Card.Text>
                Skilled in backend development with expertise in database management and API integration.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="h-100">
            <Card.Img variant="top" src="https://via.placeholder.com/300x300?text=Vyom" />
            <Card.Body className="text-center">
              <Card.Title>Vyom Korat</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">MCA Student</Card.Subtitle>
              <Card.Text>
                Focuses on system architecture and implementing advanced features for enhanced user experience.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="h-100">
            <Card.Img variant="top" src="https://via.placeholder.com/300x300?text=Vaidehi" />
            <Card.Body className="text-center">
              <Card.Title>Vaidehi Dave</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">MCA Student</Card.Subtitle>
              <Card.Text>
                Specializes in UI/UX design and ensuring the platform is accessible and intuitive for all users.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Values Section */}
      <Row className="mb-5">
        <Col className="text-center mb-4">
          <h2>Our Values</h2>
          <p className="lead text-muted">The principles that guide everything we do</p>
        </Col>
      </Row>

      <Row>
        <Col md={3} className="mb-4 text-center">
          <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style={{ width: '100px', height: '100px' }}>
            <i className="bi bi-heart" style={{ fontSize: '2.5rem', color: '#28a745' }}></i>
          </div>
          <h4>Integrity</h4>
          <p>We operate with honesty, transparency, and fairness in all our dealings.</p>
        </Col>
        <Col md={3} className="mb-4 text-center">
          <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style={{ width: '100px', height: '100px' }}>
            <i className="bi bi-recycle" style={{ fontSize: '2.5rem', color: '#28a745' }}></i>
          </div>
          <h4>Sustainability</h4>
          <p>We champion environmentally responsible production and business practices.</p>
        </Col>
        <Col md={3} className="mb-4 text-center">
          <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style={{ width: '100px', height: '100px' }}>
            <i className="bi bi-people" style={{ fontSize: '2.5rem', color: '#28a745' }}></i>
          </div>
          <h4>Community</h4>
          <p>We build meaningful connections between producers and conscious consumers.</p>
        </Col>
        <Col md={3} className="mb-4 text-center">
          <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style={{ width: '100px', height: '100px' }}>
            <i className="bi bi-lightning" style={{ fontSize: '2.5rem', color: '#28a745' }}></i>
          </div>
          <h4>Innovation</h4>
          <p>We constantly seek better ways to bring natural products to our community.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default About; 