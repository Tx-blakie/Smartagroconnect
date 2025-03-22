import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FarmerDashboard = () => {
  const { t } = useTranslation();
  
  // Mock data - in a real application, this would come from API
  const recentCommodities = [
    { id: 1, name: 'Organic Tomatoes', category: 'Vegetables', price: 25.00, quantity: 50, status: 'Pending' },
    { id: 2, name: 'Fresh Apples', category: 'Fruits', price: 30.00, quantity: 100, status: 'Approved' },
    { id: 3, name: 'Organic Rice', category: 'Grains', price: 45.00, quantity: 25, status: 'Rejected' },
  ];

  return (
    <Container fluid className="my-4">
      <Row className="mb-4">
        <Col>
          <h2>{t('dashboard')}</h2>
          <p className="text-muted">{t('welcomeBack')}</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="h-100 text-center">
            <Card.Body>
              <Card.Title>{t('totalProducts')}</Card.Title>
              <h3 className="mb-3">5</h3>
              <Button as={Link} to="/farmer/manage-commodities" variant="outline-primary">{t('viewAll')}</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="h-100 text-center">
            <Card.Body>
              <Card.Title>{t('pendingApproval')}</Card.Title>
              <h3 className="mb-3">2</h3>
              <Button as={Link} to="/farmer/manage-commodities" variant="outline-warning">{t('viewPending')}</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 text-center">
            <Card.Body>
              <Card.Title>{t('approvedProducts')}</Card.Title>
              <h3 className="mb-3">3</h3>
              <Button as={Link} to="/farmer/manage-commodities" variant="outline-success">{t('viewApproved')}</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{t('recentCommodities')}</h5>
              <Button as={Link} to="/farmer/add-commodity" variant="primary" size="sm">{t('addNewCommodity')}</Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('name')}</th>
                    <th>{t('category')}</th>
                    <th>{t('price')} ($/kg)</th>
                    <th>{t('quantity')}</th>
                    <th>{t('status')}</th>
                    <th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCommodities.map((commodity, index) => (
                    <tr key={commodity.id}>
                      <td>{index + 1}</td>
                      <td>{commodity.name}</td>
                      <td>{commodity.category}</td>
                      <td>${commodity.price.toFixed(2)}</td>
                      <td>{commodity.quantity} kg</td>
                      <td>
                        <span className={`badge ${commodity.status === 'Approved' ? 'bg-success' : commodity.status === 'Pending' ? 'bg-warning' : 'bg-danger'}`}>
                          {commodity.status}
                        </span>
                      </td>
                      <td>
                        <Button as={Link} to={`/farmer/edit-commodity/${commodity.id}`} variant="outline-primary" size="sm" className="me-1">{t('edit')}</Button>
                        <Button variant="outline-danger" size="sm">{t('delete')}</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">{t('quickActions')}</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="mb-3 mb-md-0">
                  <Card className="text-center">
                    <Card.Body>
                      <div className="mb-3">
                        <i className="bi bi-plus-circle" style={{ fontSize: '3rem', color: '#28a745' }}></i>
                      </div>
                      <Card.Title className="mt-2">{t('addCommodity')}</Card.Title>
                      <Card.Text>{t('addNewCommodityDesc')}</Card.Text>
                      <Button as={Link} to="/farmer/add-commodity" variant="primary">{t('addNow')}</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="mb-3 mb-md-0">
                  <Card className="text-center">
                    <Card.Body>
                      <div className="mb-3">
                        <i className="bi bi-pencil-square" style={{ fontSize: '3rem', color: '#28a745' }}></i>
                      </div>
                      <Card.Title className="mt-2">{t('manageCommodities')}</Card.Title>
                      <Card.Text>{t('manageCommoditiesDesc', 'Edit or delete your existing products')}</Card.Text>
                      <Button as={Link} to="/farmer/manage-commodities" variant="primary">{t('manage')}</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="text-center">
                    <Card.Body>
                      <div className="mb-3">
                        <i className="bi bi-graph-up" style={{ fontSize: '3rem', color: '#28a745' }}></i>
                      </div>
                      <Card.Title className="mt-2">{t('viewStatistics')}</Card.Title>
                      <Card.Text>{t('checkPerformance')}</Card.Text>
                      <Button as={Link} to="/farmer/statistics" variant="primary">{t('viewStats')}</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmerDashboard; 