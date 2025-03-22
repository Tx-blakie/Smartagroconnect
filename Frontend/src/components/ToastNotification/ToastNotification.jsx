import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useLanguage } from '../../contexts/LanguageContext';

const ToastNotification = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const { currentLanguage, supportedLanguages } = useLanguage();

  useEffect(() => {
    if (currentLanguage) {
      const languageName = supportedLanguages.find(lang => lang.code === currentLanguage)?.name || currentLanguage;
      setMessage(`Language changed to ${languageName}`);
      setShow(true);
      
      // Auto-hide the toast after 3 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [currentLanguage, supportedLanguages]);

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast 
        show={show} 
        onClose={() => setShow(false)} 
        bg="success" 
        text="white"
        delay={3000}
        autohide
      >
        <Toast.Header closeButton>
          <strong className="me-auto">Language</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification; 