import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Sun, Moon } from 'lucide-react';
import { useLanguage, Language } from '../LanguageContext';

interface HeaderProps {
  name: string;
}

export default function Header({ name }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const { language, setLanguage, t } = useLanguage();
  
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    }
    return 'dark'; // default to dark
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const menuItems = [
    { id: 'about', label: t('nav_about'), href: '#about' },
    { id: 'skills', label: t('nav_skills'), href: '#skills' },
    { id: 'projects', label: t('nav_projects'), href: '#projects' },
    { id: 'contact', label: t('nav_contact'), href: '#contact' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with clean robotic icon */}
          <div className="flex items-center gap-3">
            <a 
              href="#home" 
              onClick={() => handleNavClick('home')}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
              aria-label="Home"
            >
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 sm:gap-10">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`font-mono text-sm sm:text-base tracking-widest uppercase transition-all duration-300 relative py-2 px-1 ${
                  activeTab === item.id 
                    ? 'text-cyan-400 font-bold' 
                    : 'text-slate-400 hover:text-slate-150 hover:scale-105'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></span>
                )}
              </a>
            ))}

            {/* Language Selector */}
            <div className="flex items-center bg-slate-900/60 border border-slate-800 rounded-md p-1 gap-1.5 ml-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase rounded transition-all duration-300 cursor-pointer ${
                    language === lang.code
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 font-black'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Futuristic Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest uppercase bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/50 px-3.5 py-2 rounded-md transition-all duration-300 ml-3 cursor-pointer"
              title={theme === 'dark' ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500 animate-[spin_6s_linear_infinite]" />
                  <span>KUNDUZGI</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span>TUNGI</span>
                </>
              )}
            </button>
          </nav>

          {/* Mobile navigation buttons */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Language Selector for Mobile */}
            <div className="flex items-center bg-slate-900/60 border border-slate-850 rounded p-0.5 gap-0.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-1.5 py-0.5 text-[9px] font-mono tracking-wider uppercase rounded transition-all duration-300 cursor-pointer ${
                    language === lang.code
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 font-bold'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-850 rounded cursor-pointer transition-colors"
              title={theme === 'dark' ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900 border border-slate-850 rounded cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 animate-[fadeIn_0.2s_ease-out]">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`block px-4 py-3 rounded text-sm font-mono uppercase tracking-wider ${
                  activeTab === item.id 
                    ? 'bg-cyan-950/40 text-cyan-400 font-semibold border-l-2 border-cyan-400' 
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
