import React from 'react';
import { PRESETS, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface PromptInputProps {
  prompt: string;
  setPrompt: (val: string) => void;
  disabled: boolean;
  language: Language;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, disabled, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-gray-800 mb-2">
        {t.step2}
      </label>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setPrompt(preset.prompt)}
            disabled={disabled}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white hover:bg-yellow-100 hover:text-yellow-900 text-gray-700 border border-gray-300 hover:border-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {preset.label[language]}
          </button>
        ))}
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={disabled}
        placeholder={t.placeholder}
        className="w-full p-4 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm min-h-[160px] bg-yellow-50 text-gray-900 leading-relaxed font-mono"
      />
    </div>
  );
};

export default PromptInput;