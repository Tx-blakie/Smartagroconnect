import React from "react";
import { Card } from "react-bootstrap";

const ProductManagement = () => {
  return (
    <div>
      <h2 className="mb-4">Product Management</h2>

      <Card className="admin-card">
        <Card.Body className="text-center p-5">
          <i className="bi bi-box fs-1 text-muted mb-3"></i>
          <h4>Product Management</h4>
          <p className="text-muted">
            This feature will be implemented soon. Here, admins will be able to
            view, approve, and manage all products on the platform.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductManagement;
