import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  name: string;
}

export default function Header({ name }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
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
    { id: 'about', label: 'Men haqimda', href: '#about' },
    { id: 'skills', label: 'Ko\'nikmalar', href: '#skills' },
    { id: 'projects', label: 'Loyihalar', href: '#projects' },
    { id: 'contact', label: 'Aloqa', href: '#contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with clean robotic icon */}
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            <a 
              href="#home" 
              onClick={() => handleNavClick('home')}
              className="font-mono font-bold tracking-[2px] text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors uppercase"
            >
              {name.toUpperCase().replace(/\s+/g, '_')}.SYS
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`font-mono text-xs tracking-wider uppercase transition-colors relative py-1 ${
                  activeTab === item.id 
                    ? 'text-cyan-400 font-semibold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                )}
              </a>
            ))}

            {/* Futuristic Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/50 px-2.5 py-1.5 rounded transition-all duration-300 ml-4 cursor-pointer"
              title={theme === 'dark' ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500 animate-[spin_6s_linear_infinite]" />
                  <span>Kunduzgi</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Tungi</span>
                </>
              )}
            </button>
          </nav>

          {/* Mobile navigation buttons */}
          <div className="flex items-center gap-2.5 md:hidden">
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
