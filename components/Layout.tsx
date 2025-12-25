import React, { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';
import Snowfall from './Snowfall';

interface LayoutProps {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Layout: React.FC<LayoutProps> = ({ lang, setLang, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Enforce Dark Theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    setTheme('dark');
  }, [setTheme]);

  const toggleLang = () => setLang(lang === 'ru' ? 'en' : 'ru');

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-2 py-1 mx-2 font-bold text-sm tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 group ${
      isActive 
        ? 'text-white' 
        : 'text-[#cccccc] hover:text-white'
    }`;

  const LinkUnderline = ({ active }: { active: boolean }) => (
    <div className={`absolute bottom-[-24px] left-0 w-full h-[4px] bg-mc-green transition-transform duration-300 ease-out ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
  );

  return (
    <div className="min-h-screen flex flex-col relative bg-[#121212] text-white">
      <Snowfall />

      <nav className="fixed top-0 w-full z-50 bg-[#000000] h-20 flex items-center shadow-lg border-b border-[#222]">
        <div className="container mx-auto px-4 flex justify-between items-center h-full">
          <div className="flex items-center gap-8">
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#3C8527] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                 <span className="font-display font-bold text-white text-2xl mb-1">O</span>
              </div>
              <span className="font-display text-xl text-white tracking-widest uppercase hidden sm:block group-hover:text-gray-200 transition-colors">
                OPTICRAFT
              </span>
            </NavLink>

            <div className="hidden md:flex items-center">
              <NavLink to="/" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    {TRANSLATIONS.home[lang]}
                    <LinkUnderline active={isActive} />
                  </>
                )}
              </NavLink>
              <NavLink to="/downloads" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    {TRANSLATIONS.downloads[lang]}
                    <LinkUnderline active={isActive} />
                  </>
                )}
              </NavLink>
              <NavLink to="/info" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    {TRANSLATIONS.info[lang]}
                    <LinkUnderline active={isActive} />
                  </>
                )}
              </NavLink>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={toggleLang} className="text-[#cccccc] hover:text-white flex items-center gap-1 font-bold text-sm tracking-widest transition-colors duration-200 uppercase">
                <Globe size={16} /> {lang.toUpperCase()}
            </button>
          </div>

          <button 
            className="md:hidden text-white p-2 transition-transform active:scale-90"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className={`md:hidden absolute top-20 left-0 w-full bg-[#121212] border-t border-[#333] transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col p-6 gap-6">
            <Link to="/" className="text-xl font-bold text-white uppercase" onClick={() => setIsMenuOpen(false)}>
              {TRANSLATIONS.home[lang]}
            </Link>
            <Link to="/downloads" className="text-xl font-bold text-white uppercase" onClick={() => setIsMenuOpen(false)}>
              {TRANSLATIONS.downloads[lang]}
            </Link>
            <Link to="/info" className="text-xl font-bold text-white uppercase" onClick={() => setIsMenuOpen(false)}>
              {TRANSLATIONS.info[lang]}
            </Link>
            <button onClick={toggleLang} className="text-[#888] font-bold text-left uppercase">{lang.toUpperCase()}</button>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-20 relative z-10 overflow-hidden">
        <div key={location.pathname} className="page-enter">
            <Outlet context={{ lang }} />
        </div>
      </main>

      <footer className="bg-[#000000] text-[#888888] py-16 relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex flex-col gap-4 max-w-md">
                <span className="font-display text-white text-2xl tracking-widest uppercase">OPTICRAFT</span>
                <div className="text-sm">
                    <p>{TRANSLATIONS.footer_disclaimer[lang]}</p>
                    <p className="mt-2 text-xs opacity-50">{TRANSLATIONS.warning[lang]}</p>
                </div>
            </div>
            
            <div className="flex flex-col gap-2">
                <h4 className="font-bold text-white uppercase mb-2">{TRANSLATIONS.community[lang]}</h4>
                <a href="https://t.me/opticraftsu" target="_blank" rel="noreferrer" className="hover:text-mc-green transition-colors duration-200">Telegram</a>
            </div>
        </div>
        <div className="container mx-auto px-4 mt-16 text-center text-xs opacity-40">
            &copy; {new Date().getFullYear()} OptiCraft. {TRANSLATIONS.footer_rights[lang]}
        </div>
      </footer>
    </div>
  );
};

export default Layout;