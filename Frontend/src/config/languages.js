// Language Configuration

// All supported languages in the application
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', direction: 'ltr' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', direction: 'ltr' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳', direction: 'ltr' },
];

// Languages that use right-to-left (RTL) text direction
export const RTL_LANGUAGES = [];

// Default language
export const DEFAULT_LANGUAGE = 'en';

// Get a language object by code
export const getLanguageByCode = (code) => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code) || SUPPORTED_LANGUAGES[0];
}; 