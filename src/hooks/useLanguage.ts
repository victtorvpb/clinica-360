import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'pt';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language as Language;

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    // Garantir que a seleção seja salva no localStorage
    localStorage.setItem('i18nextLng', language);
  };

  const getLanguageFlag = (language: Language) => {
    const flags = {
      pt: '🇧🇷',
      en: '🇺🇸'
    };
    return flags[language];
  };

  const getLanguageName = (language: Language) => {
    const names = {
      pt: 'Português',
      en: 'English'
    };
    return names[language];
  };

  const availableLanguages: Language[] = ['pt', 'en'];

  return {
    currentLanguage,
    changeLanguage,
    getLanguageFlag,
    getLanguageName,
    availableLanguages
  };
}; 
