// src/LanguageContext.js
import React, { createContext, useState, useEffect } from 'react';
import i18n from '../i18n';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Dil durumu için localStorage anahtarını tanımlayın
  const localStorageKey = 'appLanguage';

  // localStorage'dan dil durumunu alın, yoksa varsayılan olarak 'en' kullanın
  const savedLanguage = localStorage.getItem(localStorageKey) || 'en';

  const [language, setLanguage] = useState(savedLanguage); // Dil durumu
  useEffect(() => {
    i18n.changeLanguage(language); // i18n dilini güncelle
    localStorage.setItem(localStorageKey, language); // localStorage'e dil durumunu kaydet
  }, [language]);

  const changeLanguage = (lng) => {
    setLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
