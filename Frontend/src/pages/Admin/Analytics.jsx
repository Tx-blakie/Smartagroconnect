import React from "react";
import { Card } from "react-bootstrap";

const Analytics = () => {
  return (
    <div>
      <h2 className="mb-4">Analytics</h2>

      <Card className="admin-card">
        <Card.Body className="text-center p-5">
          <i className="bi bi-graph-up fs-1 text-muted mb-3"></i>
          <h4>Platform Analytics</h4>
          <p className="text-muted">
            This feature will be implemented soon. Here, admins will be able to
            view platform statistics, user growth, transaction volume, and other
            key performance indicators.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Analytics;
