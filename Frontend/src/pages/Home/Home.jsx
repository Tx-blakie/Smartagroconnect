import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  return (  
    <>
      {/* Hero Section */}
      <div className="bg-light py-5">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h1>{t('heroTitle')}</h1>
              <p className="lead mb-4">
                {t('heroSubtitle')}
              </p>
              <div className="d-flex gap-2">
                <Button as={Link} to="/products" variant="primary" size="lg">
                  {t('browseProducts')}
                </Button>
                {!currentUser && (
                  <Button as={Link} to="/register" variant="outline-primary" size="lg">
                    {t('signUpToday')}
                  </Button>
                )}
              </div>
            </Col>
            <Col md={6}>
              <img 
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1991&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Natural products showcase" 
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container fluid className="py-5">
        <Row className="text-center mb-5">
          <Col>
            <h2>{t('whyChoose')}</h2>
            <p className="lead text-muted">{t('revolutionizing')}</p>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <i className="bi bi-cash-coin" style={{ fontSize: '3rem', color: '#28a745' }}></i>
                </div>
                <Card.Title>{t('fairPricing')}</Card.Title>
                <Card.Text>
                  {t('fairPricingDesc')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <i className="bi bi-flower1" style={{ fontSize: '3rem', color: '#28a745' }}></i>
                </div>
                <Card.Title>{t('verifiedProducts')}</Card.Title>
                <Card.Text>
                  {t('verifiedProductsDesc')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <i className="bi bi-truck" style={{ fontSize: '3rem', color: '#28a745' }}></i>
                </div>
                <Card.Title>{t('directDelivery')}</Card.Title>
                <Card.Text>
                  {t('directDeliveryDesc')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* How It Works Section */}
      <div className="bg-light py-5">
        <Container fluid>
          <Row className="text-center mb-5">
            <Col>
              <h2>{t('howItWorks')}</h2>
              <p className="lead text-muted">{t('simpleProcess')}</p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-4 text-center">
              <div className="bg-white rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                <i className="bi bi-basket" style={{ fontSize: '2.5rem', color: '#28a745' }}></i>
              </div>
              <h5 className="mt-3">{t('farmersListProducts')}</h5>
              <p>{t('farmersListProductsDesc')}</p>
            </Col>
            <Col md={3} className="mb-4 text-center">
              <div className="bg-white rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                <i className="bi bi-patch-check" style={{ fontSize: '2.5rem', color: '#28a745' }}></i>
              </div>
              <h5 className="mt-3">{t('qualityVerification')}</h5>
              <p>{t('qualityVerificationDesc')}</p>
            </Col>
            <Col md={3} className="mb-4 text-center">
              <div className="bg-white rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                <i className="bi bi-cart" style={{ fontSize: '2.5rem', color: '#28a745' }}></i>
              </div>
              <h5 className="mt-3">{t('consumersShop')}</h5>
              <p>{t('consumersShopDesc')}</p>
            </Col>
            <Col md={3} className="mb-4 text-center">
              <div className="bg-white rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                <i className="bi bi-house-heart" style={{ fontSize: '2.5rem', color: '#28a745' }}></i>
              </div>
              <h5 className="mt-3">{t('farmToTable')}</h5>
              <p>{t('farmToTableDesc')}</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Call to Action - only shown to users who are not logged in */}
      {!currentUser && (
        <Container fluid className="py-5">
          <Row className="text-center">
            <Col md={8} className="mx-auto">
              <h2>{t('readyToJoin')}</h2>
              <p className="lead mb-4">{t('readyToJoinDesc')}</p>
              <div className="d-flex gap-3 justify-content-center">
                <Button as={Link} to="/register" variant="success" size="lg">
                  {t('signUpToday')}
                </Button>
                <Button as={Link} to="/about" variant="outline-success" size="lg">
                  {t('learnMore')}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home; 