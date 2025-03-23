import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

const AvailableRequests = () => {
  return (
    <Container className="my-5">
      <h2>Available Requests</h2>
      <p>Find and apply for assistance requests in your area.</p>
      
      <Card className="my-4">
        <Card.Body className="text-center">
          <p>This page is under development. Check back soon for available assistance requests.</p>
          <Button variant="primary">Refresh</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AvailableRequests; 