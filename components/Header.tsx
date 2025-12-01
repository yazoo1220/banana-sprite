import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onApiKeyClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, onApiKeyClick }) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="bg-yellow-400 border-b-2 border-black sticky top-0 z-50 shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white border-2 border-black rounded-xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            🍌
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none">
              BANANA SPRITE
            </h1>
            <span className="text-xs font-bold text-yellow-900 mt-0.5">v1.2</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <nav className="hidden md:block text-sm font-bold text-yellow-900">
            {t.subtitle}
           </nav>
           
           <div className="flex gap-2">
             {/* API Key Button */}
             <button
               onClick={onApiKeyClick}
               className="flex items-center justify-center w-8 h-8 bg-black text-yellow-400 rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
               title={t.selectKey}
             >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                 <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c-1.067.322-2.02 1.01-2.529 1.975l-1.08 2.055a6.75 6.75 0 0 1-.037-5.46.75.75 0 0 0-1.025-1.096A8.25 8.25 0 0 0 3.224 10.635l9.36 9.36a.75.75 0 0 0 1.06-1.06l-1.258-1.259a4.5 4.5 0 0 1 6.364-6.364l1.259 1.259a.75.75 0 0 0 1.06-1.061l-9.359-9.359ZM19.5 22.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" clipRule="evenodd" />
               </svg>
             </button>

             {/* Language Toggle */}
             <div className="flex bg-yellow-300 rounded-lg p-1 border border-yellow-500">
               <button 
                 onClick={() => setLanguage('en')}
                 className={`px-2 py-1 text-xs font-bold rounded ${language === 'en' ? 'bg-white shadow-sm text-black' : 'text-yellow-800 hover:text-black'}`}
               >
                 EN
               </button>
               <button 
                 onClick={() => setLanguage('ja')}
                 className={`px-2 py-1 text-xs font-bold rounded ${language === 'ja' ? 'bg-white shadow-sm text-black' : 'text-yellow-800 hover:text-black'}`}
               >
                 JP
               </button>
             </div>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;