import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ size = 'default' }) => {
  const fontSize = size === 'large' ? '2.5rem' : size === 'small' ? '1.5rem' : '2rem';
  
  return (
    <Link to="/" className="text-decoration-none d-flex align-items-center">
      <span className="me-2" style={{ fontSize }}>
        <i className="bi bi-flower3" style={{ color: '#28a745' }}></i>
      </span>
      <span className="fw-bold" style={{ 
        fontSize: size === 'large' ? '1.8rem' : size === 'small' ? '1.2rem' : '1.5rem',
        color: '#333' 
      }}>
        <span style={{ color: '#28a745' }}>Smart</span>AgroConnect
      </span>
    </Link>
  );
};

export default Logo; 