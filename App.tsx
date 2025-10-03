
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatInterface from './components/ChatInterface';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8">
                <div className="text-center w-full max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-sky-300">
                        {t('heroTitle')}
                    </h1>
                    <p className="mt-4 text-lg text-slate-300">
                        {t('heroSubtitle')}
                    </p>
                </div>
                <div className="mt-8 w-full flex-1 flex flex-col">
                   <ChatInterface />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
