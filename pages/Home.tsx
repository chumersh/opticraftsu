import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Download, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';
import MinecraftButton from '../components/ui/MinecraftButton';

interface ContextType {
  lang: Language;
}

const Home: React.FC = () => {
  const { lang } = useOutletContext<ContextType>();

  return (
    <div className="flex flex-col">
      <section className="relative h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#121212]">
        <div className="absolute inset-0 bg-[#0a0a0a]">
            {/* Radial gradient mask */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#000] to-[#000] opacity-80 z-10 pointer-events-none"></div>
            
            {/* Moving Grid - Increased Opacity for Visibility */}
            <div className="absolute inset-0 opacity-40 bg-grid-moving z-0"></div>
        </div>
        
        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="animate-fade-up">
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 uppercase tracking-widest drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                Minecraft <span className="text-mc-green relative inline-block">
                    Bedrock
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-mc-green shadow-[0_0_10px_#3C8527]"></span>
                </span>
             </h1>
             <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                {TRANSLATIONS.subtitle[lang]}
             </p>

             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <MinecraftButton 
                  to="/downloads"
                  className="w-full sm:w-auto text-lg px-12 py-4 shadow-[0_0_20px_rgba(60,133,39,0.4)] hover:shadow-[0_0_30px_rgba(60,133,39,0.6)]"
                  icon={<Download size={24} />}
                >
                  {TRANSLATIONS.btn_download[lang]}
                </MinecraftButton>
                
                <MinecraftButton 
                  variant="outline"
                  to="/info"
                  className="w-full sm:w-auto text-lg px-12 py-4 border-2"
                  icon={<ArrowRight size={24} />}
                >
                  {TRANSLATIONS.info[lang]}
                </MinecraftButton>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;