import React, { createContext, useState, useEffect, useContext } from 'react';
import i18n from '../i18n';
import { SUPPORTED_LANGUAGES, RTL_LANGUAGES, DEFAULT_LANGUAGE, getLanguageByCode } from '../config/languages';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [textDirection, setTextDirection] = useState('ltr');

  const changeLanguage = async (language) => {
    if (language === currentLanguage) return;
    
    setIsLoading(true);
    try {
      // Use the standard i18n changeLanguage method instead
      await i18n.changeLanguage(language);
      
      setCurrentLanguage(language);
      
      // Update text direction based on language
      const isRtl = RTL_LANGUAGES.includes(language);
      setTextDirection(isRtl ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
      
      // Save preferences to localStorage
      localStorage.setItem('preferredLanguage', language);
      localStorage.setItem('textDirection', isRtl ? 'rtl' : 'ltr');
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // Add a small delay to ensure transitions feel smooth
    }
  };

  // Initialize with preferred language and direction from localStorage if available
  useEffect(() => {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    const savedDirection = localStorage.getItem('textDirection');
    
    if (savedDirection) {
      setTextDirection(savedDirection);
      document.documentElement.setAttribute('dir', savedDirection);
    }
    
    if (preferredLanguage && preferredLanguage !== currentLanguage) {
      changeLanguage(preferredLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage, 
      isLoading,
      textDirection,
      isRtl: textDirection === 'rtl',
      supportedLanguages: SUPPORTED_LANGUAGES,
      currentLanguageDetails: getLanguageByCode(currentLanguage)
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext; 