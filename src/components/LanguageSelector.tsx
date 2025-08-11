import React, { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

interface LanguageSelectorProps {
  dropdownDirection?: 'left' | 'right';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  dropdownDirection = 'right' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    currentLanguage,
    changeLanguage,
    getLanguageFlag,
    getLanguageName,
    availableLanguages,
  } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        title="Selecionar idioma / Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{getLanguageFlag(currentLanguage)}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 ${
            dropdownDirection === 'left' ? 'right-0' : 'left-0'
          }`}>
            {availableLanguages.map((language) => (
              <button
                key={language}
                onClick={() => {
                  changeLanguage(language);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  currentLanguage === language
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700"
                }`}
              >
                <span className="text-lg">{getLanguageFlag(language)}</span>
                <span className="text-sm font-medium">
                  {getLanguageName(language)}
                </span>
                {currentLanguage === language && (
                  <div className="ml-auto w-2 h-2 bg-primary-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
