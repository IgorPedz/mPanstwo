import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import plTranslation from './locales/pl/translation.json';
import enTranslation from './locales/en/translation.json';
import deTranslation from './locales/de/translation.json';

const resources = {
  pl: { translation: plTranslation },
  en: { translation: enTranslation },
  de: { translation: deTranslation },
};

const getSavedLanguage = () => {
  const saved = localStorage.getItem('language');
  if (saved && Object.keys(resources).includes(saved)) {
    return saved;
  }

  const browserLang = navigator.language.split('-')[0];
  if (Object.keys(resources).includes(browserLang)) {
    return browserLang;
  }

  return 'pl'; 
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
