import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import Logo from '../Logo/Logo';

const AppNavbar = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, isLoading, supportedLanguages } = useLanguage();

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">{t('home')}</Nav.Link>
            <Nav.Link as={Link} to="/about">{t('aboutUs')}</Nav.Link>
            <Nav.Link as={Link} to="/products">{t('products')}</Nav.Link>
          </Nav>
          <Nav>
            {/* Language Dropdown */}
            <NavDropdown 
              title={
                <span>
                  {isLoading ? (
                    <Spinner animation="border" size="sm" className="me-1" />
                  ) : (
                    <>
                      {supportedLanguages.find(lang => lang.code === currentLanguage)?.flag || '🌐'} 
                      {t('language')}
                    </>
                  )}
                </span>
              } 
              id="language-nav-dropdown"
              className="me-3"
            >
              {supportedLanguages.map((lang) => (
                <NavDropdown.Item 
                  key={lang.code} 
                  onClick={() => handleLanguageChange(lang.code)}
                  active={currentLanguage === lang.code}
                >
                  <span className="me-2">{lang.flag}</span>
                  {lang.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link as={Link} to="/login">{t('login')}</Nav.Link>
            <Nav.Link as={Link} to="/register">{t('register')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar; 