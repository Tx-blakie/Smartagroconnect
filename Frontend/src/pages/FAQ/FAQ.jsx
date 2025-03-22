import React from 'react';
import { Container, Row, Col, Accordion, Form, Button } from 'react-bootstrap';

const FAQ = () => {
  return (
    <Container fluid className="my-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1>Frequently Asked Questions</h1>
          <p className="lead">Find answers to common questions about Smart AgroConnect</p>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col md={8}>
          <div className="mb-4">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search questions..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </div>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is Smart AgroConnect?</Accordion.Header>
              <Accordion.Body>
                Smart AgroConnect is a digital marketplace that connects farmers directly with buyers, 
                eliminating intermediaries and ensuring fair prices. Our platform enables farmers to 
                list their agricultural products and allows buyers to purchase directly from them, 
                creating a more efficient and transparent agricultural supply chain.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>How do I create an account?</Accordion.Header>
              <Accordion.Body>
                Creating an account is simple! Click on the "Sign Up" button in the top right corner 
                of the homepage. Fill in your details, select your account type (Farmer or Buyer), 
                and confirm your email. Once verified, you can start using the platform right away.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>How can farmers list their products?</Accordion.Header>
              <Accordion.Body>
                After creating a Farmer account and logging in, navigate to your dashboard and click 
                on "Add Commodity". Fill in the product details including name, description, price, 
                quantity, and upload high-quality images. Submit your listing for approval. Once 
                approved, your products will be visible to buyers on the marketplace.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>How does the buying process work?</Accordion.Header>
              <Accordion.Body>
                Buyers can browse through available products, filter by category, and view detailed 
                information. When ready to purchase, simply add items to your cart and proceed to checkout. 
                You can choose your preferred payment method and delivery option. Once the payment is 
                confirmed, farmers are notified to prepare the order for delivery.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Is there a fee for using Smart AgroConnect?</Accordion.Header>
              <Accordion.Body>
                Basic listing and buying features are completely free. However, we offer premium features 
                such as promoted listings, advanced analytics, and priority support which require a 
                subscription. Additionally, a small transaction fee may be charged on completed purchases 
                to maintain the platform.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>How are payments handled?</Accordion.Header>
              <Accordion.Body>
                Smart AgroConnect uses a secure escrow payment system. When a buyer places an order, 
                the payment is held by the platform until the buyer confirms receipt of the products. 
                This ensures both parties are protected during the transaction. Once the buyer confirms 
                receipt, the funds are released to the farmer.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>What if I receive damaged or low-quality products?</Accordion.Header>
              <Accordion.Body>
                If you receive products that are damaged or not as described, you can initiate a dispute 
                through our platform within 48 hours of delivery. Provide details and supporting images. 
                Our customer service team will review the case and work to resolve it fairly. Depending 
                on the situation, you may be eligible for a refund or replacement.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>How is the delivery handled?</Accordion.Header>
              <Accordion.Body>
                Smart AgroConnect partners with reliable logistics providers to ensure safe and timely 
                delivery of agricultural products. Farmers are responsible for properly packaging their 
                products, while the platform coordinates pickup and delivery. Buyers can track their 
                orders in real-time through the platform.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <div className="p-4 bg-light rounded">
            <h3>Didn't find your answer?</h3>
            <p>Contact our support team for further assistance.</p>
            <Button variant="primary" href="/contact">Contact Support</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQ; 