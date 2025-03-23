import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const RequestDetail = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      <h2>Request Details</h2>
      <p>Request ID: {requestId}</p>
      
      <Card className="my-4">
        <Card.Body className="text-center">
          <p>This page is under development. Detailed request information will be shown here.</p>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RequestDetail; 