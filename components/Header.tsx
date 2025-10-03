
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9.5a18.03 18.03 0 01-5.694-9.5m11.258 9.5a18.023 18.023 0 01-5.694-9.5m0-7.5a18.025 18.025 0 015.694 9.5m-11.258 0a18.025 18.025 0 015.694-9.5" />
  </svg>
);

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.AR : Language.EN);
  };

  return (
    <header className="bg-slate-900/70 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <svg className="h-8 w-8 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <h1 className="text-xl font-bold text-white">{t('appName')}</h1>
          </div>
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200"
            aria-label="Toggle language"
          >
            <GlobeIcon />
            <span className="font-medium">{language === Language.EN ? 'العربية' : 'English'}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
