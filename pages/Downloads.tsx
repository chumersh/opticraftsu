import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Search, Download, Calendar, Box, Layers, Hammer, Lock, ExternalLink, AlertTriangle } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { GAME_VERSIONS } from '../versions';
import { Language } from '../types';
import MinecraftButton from '../components/ui/MinecraftButton';

interface ContextType {
  lang: Language;
}

const Downloads: React.FC = () => {
  const { lang } = useOutletContext<ContextType>();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'versions' | 'launcher'>('versions');
  
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const filteredVersions = GAME_VERSIONS.filter(v => 
    v.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (url: string) => {
    setRedirectUrl(url);
    setIsRedirecting(true);
  };

  const confirmDownload = () => {
    if (redirectUrl) {
        window.open(redirectUrl, '_blank');
    }
    setIsRedirecting(false);
    setRedirectUrl(null);
  };

  const cancelDownload = () => {
      setIsRedirecting(false);
      setRedirectUrl(null);
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

        {/* Модальное окно перенаправления */}
        {isRedirecting && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={cancelDownload} />
                <div className="relative z-10 bg-[#1e1e1e] border-2 border-mc-green p-8 max-w-md w-full shadow-[0_0_60px_rgba(60,133,39,0.4)] animate-fade-up">
                    <div className="flex flex-col items-center text-center gap-6">
                        <div className="relative">
                            <div className="w-20 h-20 bg-[#252525] rounded-full flex items-center justify-center border-2 border-[#333]">
                                <AlertTriangle size={32} className="text-mc-green animate-pulse" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white uppercase tracking-widest mb-2">
                                {TRANSLATIONS.redirect_title[lang]}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {TRANSLATIONS.redirect_desc[lang]}
                            </p>
                        </div>
                        
                        <div className="flex flex-col w-full gap-3 mt-2">
                            <MinecraftButton 
                                onClick={confirmDownload}
                                className="w-full justify-center"
                                icon={<ExternalLink size={18} />}
                            >
                                {TRANSLATIONS.redirect_btn[lang]}
                            </MinecraftButton>
                            <button 
                                onClick={cancelDownload}
                                className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors py-2"
                            >
                                {TRANSLATIONS.redirect_cancel[lang]}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <div className="mb-16 text-center">
                 <h2 className="text-5xl md:text-6xl font-display text-white mb-6 uppercase tracking-widest drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                    {TRANSLATIONS.downloads[lang]}
                </h2>
                <div className="w-40 h-1.5 bg-mc-green mx-auto shadow-neon"></div>
            </div>

            {/* Выбор метода установки */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div 
                    onClick={() => setActiveTab('versions')}
                    className={`relative p-8 border-2 cursor-pointer transition-all duration-300 ${
                        activeTab === 'versions' 
                        ? 'bg-[#222] border-mc-green shadow-neon scale-[1.02]' 
                        : 'bg-[#151515] border-[#333] hover:border-gray-600 hover:bg-[#1a1a1a]'
                    }`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <Layers size={48} className={activeTab === 'versions' ? 'text-mc-green' : 'text-gray-600'} />
                        {activeTab === 'versions' && <div className="w-3 h-3 bg-mc-green shadow-neon animate-pulse"></div>}
                    </div>
                    <h3 className={`text-2xl font-bold uppercase tracking-widest ${activeTab === 'versions' ? 'text-white' : 'text-gray-500'}`}>
                        {lang === 'ru' ? 'Версии' : 'Versions'}
                    </h3>
                </div>

                <div className="relative p-8 border-2 border-[#252525] bg-[#0f0f0f] opacity-60 cursor-not-allowed group overflow-hidden transition-all duration-300">
                    <div className="absolute top-4 right-4 bg-yellow-600/20 border border-yellow-600/50 text-yellow-500 text-xs font-bold px-3 py-1 uppercase tracking-wider flex items-center gap-2">
                        <Hammer size={12} /> WIP
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <Box size={48} className="text-gray-800" />
                        <Lock size={20} className="text-gray-800" />
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-widest text-gray-800">
                        Launcher
                    </h3>
                </div>
            </div>

            {activeTab === 'versions' && (
                <div className="animate-fade-up">
                    {/* Поиск */}
                    <div className="max-w-md mx-auto relative mb-12">
                        <input
                            type="text"
                            placeholder={TRANSLATIONS.search_placeholder[lang]}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#111] border-2 border-[#333] text-white pl-12 pr-4 py-4 focus:outline-none focus:border-mc-green focus:shadow-neon transition-all duration-300 font-bold uppercase tracking-widest text-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
                    </div>

                    {/* Список версий */}
                    <div className="flex flex-col gap-6">
                        {filteredVersions.length > 0 ? (
                        filteredVersions.map((ver, index) => (
                            <div 
                                key={ver.id}
                                style={{ animationDelay: `${index * 50}ms` }}
                                className="animate-fade-up bg-[#1a1a1a] group border-l-4 border-transparent hover:border-mc-green hover:shadow-neon-hover hover:bg-[#202020] transition-all duration-300 flex flex-col md:flex-row items-center relative overflow-hidden shadow-xl"
                            >
                                <div className="p-8 flex-1 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                                    <h3 className="text-4xl font-display font-bold text-white uppercase group-hover:text-mc-green transition-colors duration-300 drop-shadow-lg min-w-[160px]">
                                        {ver.version}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-6">
                                        <span className={`text-xs font-bold uppercase px-4 py-2 tracking-widest transition-all duration-300 ${ver.type === 'stable' ? 'bg-mc-green text-white shadow-neon' : 'bg-orange-600 text-white'}`}>
                                            {ver.type}
                                        </span>
                                        <span className="text-gray-500 text-sm font-bold uppercase tracking-widest flex items-center gap-2 border-l border-[#333] pl-6">
                                            <Calendar size={18} /> {ver.releaseDate}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-[#111] p-8 w-full md:w-auto md:min-w-[240px] flex items-center justify-center border-t md:border-t-0 md:border-l border-[#222] group-hover:border-[#333] transition-colors duration-300 self-stretch">
                                    <MinecraftButton 
                                        variant="secondary" 
                                        onClick={() => handleDownload(ver.downloadUrl)}
                                        className="w-full text-sm group-hover:bg-mc-green group-hover:text-white group-hover:shadow-neon transition-all duration-300"
                                        icon={<Download size={20} />}
                                    >
                                        {TRANSLATIONS.btn_download_action[lang]}
                                    </MinecraftButton>
                                </div>
                            </div>
                        ))
                        ) : (
                        <div className="text-center py-32 bg-[#151515] border border-[#333] animate-fade-up">
                            <p className="text-2xl font-bold text-gray-700 uppercase tracking-widest">{TRANSLATIONS.no_results[lang]}</p>
                        </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default Downloads;