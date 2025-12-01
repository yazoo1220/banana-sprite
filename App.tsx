import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PromptInput from './components/PromptInput';
import SpriteDisplay from './components/SpriteDisplay';
import { generateSprite } from './services/geminiService';
import { GenerationStatus, Language } from './types';
import { TRANSLATIONS } from './constants';

function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [spriteResult, setSpriteResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('ja');

  // Initialize API Key (Pro Model requires user selection)
  useEffect(() => {
    const initKey = async () => {
      try {
        if (window.aistudio) {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          if (hasKey) {
            setApiKey(process.env.API_KEY || '');
          } else {
            setTimeout(async () => {
                 await window.aistudio.openSelectKey();
                 setApiKey(process.env.API_KEY || '');
            }, 500);
          }
        } else {
             // Check localStorage first
             const storedKey = localStorage.getItem('banana_sprite_api_key');
             if (storedKey) {
                 setApiKey(storedKey);
             } else if(process.env.API_KEY) {
                 setApiKey(process.env.API_KEY);
             }
        }
      } catch (e) {
        console.error("Error initializing API key:", e);
      }
    };
    initKey();
  }, []);

  const handleSelectKey = async () => {
    try {
        if (window.aistudio) {
            await window.aistudio.openSelectKey();
            setApiKey(process.env.API_KEY || '');
             // window.location.reload(); // Reload isn't strictly necessary if state updates, but good for clean slate
        } else {
            // Manual input for non-AI Studio environments
            const key = window.prompt(language === 'ja' ? "Gemini APIキーを入力してください" : "Please enter your Gemini API Key", apiKey);
            if (key) {
                setApiKey(key);
                localStorage.setItem('banana_sprite_api_key', key);
            }
        }
    } catch(e) {
        console.error("Failed to open key selector", e);
    }
  };

  const handleGenerate = async () => {
    if (!apiKey) {
      setErrorMsg(language === 'ja' ? "APIキーを選択してください。" : "Please select an API Key first.");
      await handleSelectKey();
      return;
    }
    if (!referenceImage) {
      setErrorMsg(language === 'ja' ? "キャラクター画像をアップロードしてください。" : "Please upload a character reference image.");
      return;
    }
    if (!prompt.trim()) {
      setErrorMsg(language === 'ja' ? "動きの説明を入力してください。" : "Please enter a movement description.");
      return;
    }

    setStatus(GenerationStatus.GENERATING_SPRITE);
    setErrorMsg(null);
    setSpriteResult(null);

    try {
      const currentKey = process.env.API_KEY || apiKey;
      
      const resultBase64 = await generateSprite(currentKey, referenceImage, prompt);
      setSpriteResult(resultBase64);
      setStatus(GenerationStatus.COMPLETED);
    } catch (err: any) {
      console.error(err);
      setStatus(GenerationStatus.ERROR);
      if (err.message && err.message.includes("Requested entity was not found")) {
         setErrorMsg(language === 'ja' ? "APIキーが無効か、プロジェクトが見つかりません。" : "API Key invalid or project not found. Please select a valid key.");
         await handleSelectKey();
      } else {
         setErrorMsg(err.message || (language === 'ja' ? "生成に失敗しました。" : "Failed to generate sprite sheet. Please try again."));
      }
    }
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-yellow-50/30">
      <Header language={language} setLanguage={setLanguage} onApiKeyClick={handleSelectKey} />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">
        
        {/* Intro / Status */}
        <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">{t.introTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                {t.introText}
            </p>
             {!apiKey && (
                 <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg inline-block">
                     <p className="text-red-800 text-sm mb-2">{t.apiKeyRequired}</p>
                     <button onClick={handleSelectKey} className="text-xs bg-red-100 px-3 py-1 rounded hover:bg-red-200 font-semibold text-red-900">
                         {t.selectKey}
                     </button>
                     <p className="text-xs text-gray-500 mt-2">
                        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-gray-800">{t.billingDocs}</a>
                     </p>
                 </div>
             )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-yellow-200 p-6 md:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ImageUploader 
              onImageSelected={setReferenceImage} 
              selectedImage={referenceImage} 
              language={language}
            />
            <PromptInput 
              prompt={prompt} 
              setPrompt={setPrompt} 
              disabled={status === GenerationStatus.GENERATING_SPRITE}
              language={language}
            />
          </div>

          {/* Action Area */}
          <div className="flex flex-col items-center justify-center pt-6 border-t border-gray-100">
            {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                    {errorMsg}
                </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={status === GenerationStatus.GENERATING_SPRITE || !referenceImage || !prompt}
              className={`
                relative px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-0.5 border-2 border-black
                ${(status === GenerationStatus.GENERATING_SPRITE || !referenceImage || !prompt)
                  ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed shadow-none'
                  : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-yellow-200'}
              `}
            >
              {status === GenerationStatus.GENERATING_SPRITE ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.generating}
                </span>
              ) : (
                t.generateBtn
              )}
            </button>
            <p className="text-xs text-gray-400 mt-2">{t.timeEst}</p>
            
            {/* Warnings */}
            <div className="mt-6 text-xs text-gray-500 bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-left space-y-1">
                <p className="flex items-start gap-1">
                    <span className="text-yellow-600">⚠️</span>
                    {t.noteGacha}
                </p>
                <p className="flex items-start gap-1">
                    <span className="text-yellow-600">⚠️</span>
                    {t.noteOverwrite}
                </p>
            </div>

          </div>
        </div>

        {/* Results */}
        {spriteResult && (
          <SpriteDisplay spriteSheetBase64={spriteResult} language={language} />
        )}

      </main>

      <footer className="bg-yellow-50 border-t border-yellow-200 py-6 text-center text-sm text-yellow-800">
         Banana Sprite Generator v1.2 &copy; 2025
      </footer>
    </div>
  );
}

export default App;