import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to the Portal",
      "home": "Home",
      "admin": "Admin",
      "docs": "Docs"
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue sur le Portail",
      "home": "Accueil",
      "admin": "Administration",
      "docs": "Documentation"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
