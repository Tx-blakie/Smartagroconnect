import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-light py-4 mt-auto">
      <Container fluid>
        <Row className="justify-content-between">
          <Col md={4} className="mb-3 mb-md-0">
            <Logo size="small" />
            <p className="text-muted mt-2">
              {t('heroSubtitle')}
            </p>
          </Col>
          <Col md={2} className="mb-3 mb-md-0">
            <h5>{t('home')}</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none text-muted">{t('home')}</Link></li>
              <li><Link to="/about" className="text-decoration-none text-muted">{t('aboutUs')}</Link></li>
              <li><Link to="/products" className="text-decoration-none text-muted">{t('products')}</Link></li>
            </ul>
          </Col>
        
          <Col md={3}>
            <h5>Contact</h5>
            <address className="text-muted">
              <p>Email: contact@smartagroconnect.com</p>
              <p>Phone: +91 7984380930</p>
            </address>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center text-muted">
            <p>&copy; {currentYear} {t('appName')}. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 