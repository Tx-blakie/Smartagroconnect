import React from "react";
import { Card } from "react-bootstrap";

const Settings = () => {
  return (
    <div>
      <h2 className="mb-4">Settings</h2>

      <Card className="admin-card">
        <Card.Body className="text-center p-5">
          <i className="bi bi-gear fs-1 text-muted mb-3"></i>
          <h4>Admin Settings</h4>
          <p className="text-muted">
            This feature will be implemented soon. Here, admins will be able to
            configure platform settings, notification preferences, and other
            system parameters.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Settings;
