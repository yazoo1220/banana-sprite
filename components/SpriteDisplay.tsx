import React, { useEffect, useRef, useState } from 'react';
import { sliceSpriteSheet, generateGifBlob } from '../services/imageUtils';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface SpriteDisplayProps {
  spriteSheetBase64: string | null;
  language: Language;
}

const SpriteDisplay: React.FC<SpriteDisplayProps> = ({ spriteSheetBase64, language }) => {
  const [frames, setFrames] = useState<string[]>([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isProcessingGif, setIsProcessingGif] = useState(false);
  const animationRef = useRef<number | null>(null);
  const t = TRANSLATIONS[language];

  // Parse sprite sheet when it arrives
  useEffect(() => {
    if (!spriteSheetBase64) {
      setFrames([]);
      setGifUrl(null);
      return;
    }

    const process = async () => {
      try {
        setIsProcessingGif(true);
        const sliced = await sliceSpriteSheet(spriteSheetBase64);
        setFrames(sliced);
        
        // Generate GIF immediately after slicing
        const img = new Image();
        img.onload = async () => {
            const w = img.width / 4;
            const h = img.height / 4;
            const blob = await generateGifBlob(sliced, w, h);
            setGifUrl(blob);
            setIsProcessingGif(false);
        };
        img.src = spriteSheetBase64;
      } catch (err) {
        console.error("Error processing sprite sheet:", err);
        setIsProcessingGif(false);
      }
    };
    process();
  }, [spriteSheetBase64]);

  // Animation Loop
  useEffect(() => {
    if (frames.length === 0) return;

    const animate = () => {
      setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
      // 100ms = 10fps
      animationRef.current = window.setTimeout(animate, 100);
    };

    animate();

    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [frames]);

  if (!spriteSheetBase64) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-yellow-400 overflow-hidden mt-8">
      <div className="p-4 border-b border-yellow-200 bg-yellow-100 flex justify-between items-center">
        <h2 className="font-bold text-yellow-900 text-lg">{t.results}</h2>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Full Sprite Sheet */}
        <div className="flex flex-col items-center">
            <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">{t.spriteSheet}</h3>
            <div className="relative border-2 border-gray-100 bg-white shadow-sm p-1 rounded-lg">
                <img 
                    src={spriteSheetBase64} 
                    alt="Full Sprite Sheet" 
                    className="max-w-full h-auto max-h-[400px]" 
                />
            </div>
            <a 
                href={spriteSheetBase64}
                download="sprite_sheet.png"
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-bold shadow-md hover:shadow-lg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {t.downloadPng}
            </a>
        </div>

        {/* Right: Animation Preview */}
        <div className="flex flex-col items-center">
            <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">{t.preview}</h3>
            <div className="w-64 h-64 bg-white border-2 border-gray-100 shadow-sm rounded-lg flex items-center justify-center relative overflow-hidden">
                 {/* Checkerboard pattern for transparency indication */}
                 <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '10px 10px'
                 }}></div>

                 {frames.length > 0 && (
                    <img 
                        src={frames[currentFrameIndex]} 
                        alt="Animation Frame" 
                        className="w-full h-full object-contain relative z-10" 
                    />
                 )}
            </div>
            
            <div className="mt-4 w-full">
                {isProcessingGif ? (
                    <button disabled className="w-full px-4 py-3 bg-gray-100 text-gray-400 rounded-xl text-sm font-bold cursor-wait">
                        Generating GIF...
                    </button>
                ) : gifUrl ? (
                    <a 
                        href={gifUrl}
                        download="animation.gif"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-colors text-sm font-bold shadow-md hover:shadow-lg"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                         </svg>
                        {t.downloadGif}
                    </a>
                ) : (
                    <button disabled className="w-full px-4 py-3 bg-gray-100 text-gray-400 rounded-xl text-sm font-medium">
                        GIF Not Available
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SpriteDisplay;