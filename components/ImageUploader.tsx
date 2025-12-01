import React, { useRef, useState } from 'react';
import { processInputImage } from '../services/imageUtils';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  selectedImage: string | null;
  language: Language;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, selectedImage, language }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const t = TRANSLATIONS[language];

  const handleFile = async (file: File) => {
    if (!file) return;
    try {
      const processedBase64 = await processInputImage(file);
      onImageSelected(processedBase64);
    } catch (e) {
      console.error("Error processing image:", e);
      alert("Failed to process image. Please try a valid PNG/JPG.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-gray-800 mb-2">
        {t.step1}
      </label>
      
      {!selectedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer min-h-[220px] ${
            dragActive ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 hover:border-yellow-400 hover:bg-yellow-50/50'
          }`}
          onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
          </div>
          <p className="text-base font-bold text-gray-900">{t.uploadText}</p>
          <p className="text-sm text-gray-500 mt-1">{t.uploadSubtext}</p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="flex gap-4 items-start p-4 border border-yellow-200 bg-yellow-50 rounded-xl">
            <div className="relative group border-2 border-white rounded-lg overflow-hidden bg-white shadow-sm w-32 h-32 flex-shrink-0">
                <img src={selectedImage} alt="Reference" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-white text-xs font-bold underline"
                    >
                        Change
                    </button>
                </div>
            </div>
            <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{t.refLoaded}</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {t.refProcessed}
                </p>
                <div className="flex gap-3 mt-3">
                    <button 
                        onClick={() => {
                            onImageSelected('');
                            if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="text-xs text-red-600 hover:text-red-700 font-bold border border-red-200 px-2 py-1 rounded bg-white"
                    >
                        {t.remove}
                    </button>
                </div>
            </div>
             <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                onChange={handleChange}
            />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;