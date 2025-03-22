import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useLanguage } from '../../contexts/LanguageContext';

const LoadingOverlay = () => {
  const { isLoading, currentLanguage, supportedLanguages } = useLanguage();

  if (!isLoading) return null;

  const targetLanguage = supportedLanguages.find(lang => lang.code === currentLanguage)?.name || currentLanguage;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(5px)'
      }}
    >
      <div className="text-center">
        <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-2 font-weight-bold">Translating to {targetLanguage}...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay; 