import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { TRANSLATIONS, FAQ_ITEMS } from '../constants';
import { Language } from '../types';

interface ContextType {
  lang: Language;
}

const Info: React.FC = () => {
  const { lang } = useOutletContext<ContextType>();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-[#121212] min-h-screen py-16 relative overflow-hidden">
        {/* Анимированный фон сетки */}
        <div className="absolute inset-0 z-0 opacity-30 bg-grid-moving"></div>
        
        {/* Парящие частицы */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute bg-mc-green opacity-5 blur-3xl animate-pulse-slow"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 400 + 200}px`,
                        height: `${Math.random() * 400 + 200}px`,
                        animationDelay: `${i * 1}s`,
                    }}
                />
            ))}
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display text-white mb-6 uppercase tracking-widest drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                    {TRANSLATIONS.faq_title[lang]}
                </h2>
                <div className="w-40 h-1.5 bg-mc-green mx-auto shadow-neon"></div>
            </div>

            <div className="flex flex-col gap-6">
                {FAQ_ITEMS.map((item, index) => (
                <div 
                    key={item.id} 
                    style={{ animationDelay: `${index * 100}ms` }}
                    className={`animate-fade-up bg-[#1a1a1a] border-l-4 transition-all duration-300 shadow-xl group ${openId === item.id ? 'border-mc-green shadow-neon-hover' : 'border-transparent hover:border-gray-600'}`}
                >
                    <button
                        onClick={() => toggleAccordion(item.id)}
                        className="w-full flex justify-between items-center p-6 md:p-8 text-left focus:outline-none hover:bg-[#202020] transition-colors"
                    >
                        <div className="flex items-center gap-6">
                            <div className={`hidden md:flex w-12 h-12 items-center justify-center rounded-sm transition-colors duration-300 ${openId === item.id ? 'bg-mc-green/20 text-mc-green' : 'bg-[#111] text-gray-600 group-hover:text-gray-400'}`}>
                                <HelpCircle size={24} />
                            </div>
                            <span className={`font-bold text-lg md:text-xl uppercase tracking-wider transition-colors duration-300 ${openId === item.id ? 'text-mc-green' : 'text-white group-hover:text-gray-200'}`}>
                                {item.question[lang]}
                            </span>
                        </div>
                        
                        <div className={`transform transition-transform duration-300 ${openId === item.id ? 'rotate-180 text-mc-green' : 'text-gray-500 group-hover:text-white'}`}>
                            <ChevronDown size={28} />
                        </div>
                    </button>
                    
                    <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#151515] ${
                            openId === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="p-6 md:p-8 text-gray-300 leading-relaxed border-t border-[#222] text-base md:text-lg font-light">
                            {item.answer[lang]}
                        </div>
                    </div>
                </div>
                ))}
            </div>

            {/* Support Link */}
            <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <div className="inline-block p-8 bg-[#1a1a1a] border border-[#333] shadow-lg max-w-md w-full">
                    <p className="text-gray-400 mb-6 uppercase tracking-widest text-sm font-bold">
                        {lang === 'ru' ? 'Не нашли ответ?' : 'Didn\'t find an answer?'}
                    </p>
                    <a 
                        href="https://t.me/opticraftsu" 
                        target="_blank"
                        rel="noreferrer" 
                        className="inline-flex items-center justify-center px-8 py-3 bg-[#353535] hover:bg-mc-green text-white font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-neon w-full md:w-auto"
                    >
                        {lang === 'ru' ? 'Написать в поддержку' : 'Contact Support'}
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Info;