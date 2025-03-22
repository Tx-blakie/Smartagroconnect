import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ManageCommodities = () => {
  const { t } = useTranslation();
  
  // Mock data - in a real application, this would come from API
  const initialCommodities = [
    { id: 1, name: 'Organic Tomatoes', category: 'Vegetables', price: 25.00, quantity: 50, status: 'Pending', dateAdded: '2023-03-15' },
    { id: 2, name: 'Fresh Apples', category: 'Fruits', price: 30.00, quantity: 100, status: 'Approved', dateAdded: '2023-03-10' },
    { id: 3, name: 'Organic Rice', category: 'Grains', price: 45.00, quantity: 25, status: 'Rejected', dateAdded: '2023-03-08' },
    { id: 4, name: 'Honey', category: 'Other', price: 120.00, quantity: 10, status: 'Approved', dateAdded: '2023-03-05' },
    { id: 5, name: 'Fresh Milk', category: 'Dairy', price: 35.00, quantity: 20, status: 'Approved', dateAdded: '2023-03-01' },
  ];

  const [commodities, setCommodities] = useState(initialCommodities);
  const [filteredCommodities, setFilteredCommodities] = useState(initialCommodities);
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle filter change
  const handleFilterChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    
    if (status === 'all') {
      setFilteredCommodities(commodities.filter(commodity => 
        commodity.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredCommodities(commodities.filter(commodity => 
        commodity.status === status && 
        commodity.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (filterStatus === 'all') {
      setFilteredCommodities(commodities.filter(commodity => 
        commodity.name.toLowerCase().includes(term.toLowerCase())
      ));
    } else {
      setFilteredCommodities(commodities.filter(commodity => 
        commodity.status === filterStatus && 
        commodity.name.toLowerCase().includes(term.toLowerCase())
      ));
    }
  };

  // Show delete confirmation modal
  const handleShowDeleteModal = (commodity) => {
    setSelectedCommodity(commodity);
    setDeleteModalShow(true);
  };

  // Delete commodity
  const handleDeleteCommodity = () => {
    if (selectedCommodity) {
      const updatedCommodities = commodities.filter(c => c.id !== selectedCommodity.id);
      setCommodities(updatedCommodities);
      setFilteredCommodities(
        filterStatus === 'all' 
          ? updatedCommodities.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
          : updatedCommodities.filter(c => c.status === filterStatus && c.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setDeleteModalShow(false);
    }
  };

  return (
    <Container fluid className="my-4">
      <Row className="mb-4">
        <Col>
          <h2>{t('manageCommodities')}</h2>
          <p className="text-muted">{t('manageCommoditiesDesc', 'View, edit, or delete your agricultural products.')}</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder={`${t('search')} ${t('manageCommodities').toLowerCase()}...`}
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Select value={filterStatus} onChange={handleFilterChange}>
              <option value="all">{t('allStatus', 'All Status')}</option>
              <option value="Pending">{t('pending', 'Pending')}</option>
              <option value="Approved">{t('approved', 'Approved')}</option>
              <option value="Rejected">{t('rejected', 'Rejected')}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{t('yourCommodities', 'Your Commodities')}</h5>
              <Button as={Link} to="/farmer/add-commodity" variant="primary" size="sm">{t('addNewCommodity')}</Button>
            </Card.Header>
            <Card.Body>
              {filteredCommodities.length > 0 ? (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>{t('name')}</th>
                      <th>{t('category')}</th>
                      <th>{t('price')} ($/kg)</th>
                      <th>{t('quantity')}</th>
                      <th>{t('status')}</th>
                      <th>{t('dateAdded', 'Date Added')}</th>
                      <th>{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommodities.map(commodity => (
                      <tr key={commodity.id}>
                        <td>{commodity.name}</td>
                        <td>{commodity.category}</td>
                        <td>${commodity.price.toFixed(2)}</td>
                        <td>{commodity.quantity} kg</td>
                        <td>
                          <Badge bg={
                            commodity.status === 'Approved' 
                              ? 'success' 
                              : commodity.status === 'Pending' 
                                ? 'warning' 
                                : 'danger'
                          }>
                            {commodity.status}
                          </Badge>
                        </td>
                        <td>{commodity.dateAdded}</td>
                        <td>
                          <Button 
                            as={Link} 
                            to={`/farmer/edit-commodity/${commodity.id}`} 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-1"
                            disabled={commodity.status === 'Approved'}
                          >
                            {t('edit')}
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleShowDeleteModal(commodity)}
                            disabled={commodity.status === 'Approved'}
                          >
                            {t('delete')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p className="mb-0">{t('noMatchingCommodities', 'No commodities found matching your filters.')}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('confirmDelete', 'Confirm Delete')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('deleteConfirmationText', 'Are you sure you want to delete')} <strong>{selectedCommodity?.name}</strong>? {t('actionCannotBeUndone', 'This action cannot be undone.')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalShow(false)}>
            {t('cancel')}
          </Button>
          <Button variant="danger" onClick={handleDeleteCommodity}>
            {t('delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageCommodities; 