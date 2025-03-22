import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";

const UserManagement = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    isVerified: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${api.defaults.baseURL}/users/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  // Handle opening edit modal
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified || false,
    });
    setShowEditModal(true);
  };

  // Handle opening delete modal
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Update user
  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      setError(null);

      await axios.put(
        `${api.defaults.baseURL}/users/admin/users/${selectedUser._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Refresh user list
      await fetchUsers();
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      setError(null);

      await axios.delete(
        `${api.defaults.baseURL}/users/admin/users/${selectedUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh user list
      await fetchUsers();
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "danger";
      case "farmer":
        return "success";
      case "buyer":
        return "primary";
      case "helper":
        return "info";
      default:
        return "secondary";
    }
  };

  return (
    <div>
      <h2 className="mb-4">User Management</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="admin-card mb-4">
        <Card.Body>
          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="farmer">Farmer</option>
                  <option value="buyer">Buyer</option>
                  <option value="helper">Helper</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2} className="text-end">
              <Button
                variant="outline-primary"
                onClick={fetchUsers}
                disabled={loading}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>Refresh
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="admin-card admin-table">
        <Card.Body>
          {loading ? (
            <div className="text-center p-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading users...</p>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Badge bg={getRoleBadgeColor(user.role)}>
                          {user.role}
                        </Badge>
                      </td>
                      <td>
                        {user.isVerified ? (
                          <Badge bg="success">Verified</Badge>
                        ) : (
                          <Badge bg="warning" text="dark">
                            Unverified
                          </Badge>
                        )}
                      </td>
                      <td className="action-buttons">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEditClick(user)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteClick(user)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      {searchTerm || filterRole !== "all" ? (
                        <p>No users match your search criteria.</p>
                      ) : (
                        <p>No users found in the system.</p>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="admin-form">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="admin">Admin</option>
                <option value="farmer">Farmer</option>
                <option value="buyer">Buyer</option>
                <option value="helper">Helper</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Verified User"
                name="isVerified"
                checked={formData.isVerified}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateUser}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete User Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete the user:{" "}
            <strong>{selectedUser?.name}</strong>?
          </p>
          <p className="text-danger">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteUser}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;
