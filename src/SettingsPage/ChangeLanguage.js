import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../contexts/LanguageContext';
import ukFlag from '../assets/UK Flag.png';
import trFlag from '../assets/TurkeyFlag.png';
import './changeLanguage.css';

const ChangeLanguage = () => {
  const { changeLanguage } = useContext(LanguageContext);
  const { i18n } = useTranslation();

  const changeToEnglish = () => changeLanguage('en');
  const changeToTurkish = () => changeLanguage('tr');

  return (
    <div className="language-selector">
      <button
        className={`language-button ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={changeToEnglish}
        disabled={i18n.language === 'en'}
      >
        <img src={ukFlag} alt="English" />
        English
      </button>
      <button
        className={`language-button ${i18n.language === 'tr' ? 'active' : ''}`}
        onClick={changeToTurkish}
        disabled={i18n.language === 'tr'}
      >
        <img src={trFlag} alt="Türkçe" />
        Türkçe
      </button>
    </div>
  );
};

export default ChangeLanguage;
