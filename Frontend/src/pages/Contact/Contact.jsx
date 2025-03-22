import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { BiMap, BiPhone, BiEnvelope } from 'react-icons/bi';

const Contact = () => {
  return (
    <Container fluid className="my-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1>Contact Us</h1>
          <p className="lead">Have questions or feedback? Get in touch with our team.</p>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        <Col md={4} className="mb-4 mb-md-0">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-4">
              <h3 className="mb-4">Get In Touch</h3>
              
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <BiMap className="text-primary me-2" size={24} />
                  <h5 className="mb-0">Address</h5>
                </div>
                <p className="ms-4 mb-0">123 AgroTech Lane,<br />Bangalore, Karnataka 560001,<br />India</p>
              </div>
              
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <BiPhone className="text-primary me-2" size={24} />
                  <h5 className="mb-0">Phone</h5>
                </div>
                <p className="ms-4 mb-0">+91 98765 43210</p>
              </div>
              
              <div>
                <div className="d-flex align-items-center mb-3">
                  <BiEnvelope className="text-primary me-2" size={24} />
                  <h5 className="mb-0">Email</h5>
                </div>
                <p className="ms-4 mb-0">support@smartagroconnect.com</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h3 className="mb-4">Send us a Message</h3>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" placeholder="Your name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Your email" />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="Message subject" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Your message" />
                </Form.Group>
                
                <div className="d-grid d-md-flex justify-content-md-end">
                  <Button variant="primary" type="submit" size="lg">
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-5">
        <Col>
          <div className="bg-light p-4 rounded">
            <h3 className="mb-4">Frequently Asked Questions</h3>
            
            <div className="mb-4">
              <h5>How do I create an account?</h5>
              <p>You can create an account by clicking on the "Sign Up" button at the top right corner of the homepage. Fill in your details and select your account type (Farmer or Buyer).</p>
            </div>
            
            <div className="mb-4">
              <h5>How can I list my agricultural products?</h5>
              <p>Once you've created a Farmer account and logged in, navigate to your dashboard. From there, you can click on "Add Commodity" to list your products.</p>
            </div>
            
            <div className="mb-4">
              <h5>Is there a fee for using Smart AgroConnect?</h5>
              <p>Basic listing and buying features are free. However, premium features such as promoted listings and advanced analytics may require a subscription.</p>
            </div>
            
            <div>
              <h5>How do payments work?</h5>
              <p>Smart AgroConnect uses a secure escrow system. Buyers pay into the platform, and funds are released to farmers once the buyer confirms receipt of goods.</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact; 