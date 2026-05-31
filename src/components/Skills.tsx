import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Cpu, Wrench, Terminal } from 'lucide-react';
import { SkillCategory } from '../types';
import RoboConsole from './RoboConsole';
import { useLanguage } from '../LanguageContext';

interface SkillsProps {
  categories: SkillCategory[];
}

export default function Skills({ categories }: SkillsProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { t } = useLanguage();

  // Helper mapping string to Lucide icon component
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-teal-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-indigo-400" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-slate-950 border-t border-slate-900 relative transition-colors duration-300">
      {/* Decorative vector overlays */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="section-title justify-center">{t('skills_subtitle')}</h2>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mt-1">
            {t('skills_title')}
          </h3>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans font-light leading-relaxed">
            {t('skills_desc')}
          </p>
        </div>

        {/* Master layout grid: Skills Categories side-by-side with RoboConsole simulation terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Interactive Progress Bars */}
          <div className="lg:col-span-7 space-y-8">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="glass-panel neon-border-cyan p-6"
              >
                {/* Visual glow backdrop */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-xl"></div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-950 rounded border border-slate-900">
                    {renderIcon(category.icon)}
                  </div>
                  <h4 className="font-mono font-bold text-xs tracking-wider uppercase text-cyan-400">
                    {category.title}
                  </h4>
                </div>

                {/* Progress indicators */}
                <div className="space-y-5">
                  {category.items.map((skill, sIdx) => (
                    <div 
                      key={sIdx}
                      className="space-y-2 cursor-help relative group"
                      onMouseEnter={() => setActiveItem(skill.name)}
                      onMouseLeave={() => setActiveItem(null)}
                    >
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                      </div>
                      
                      {/* Bar wrapper */}
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-950">
                        <motion.div 
                          key={`${skill.name}-${sIdx}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: sIdx * 0.1 }}
                          className={`h-full rounded-full bg-gradient-to-r ${
                            category.icon === 'Code' 
                              ? 'from-cyan-500 to-blue-500' 
                              : category.icon === 'Cpu'
                              ? 'from-teal-500 to-emerald-500'
                              : 'from-indigo-500 to-cyan-500'
                          }`}
                        />
                      </div>

                      {/* Tooltip detail description on Hover */}
                      {skill.details && (
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-0 right-0 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg p-2 text-[10px] leading-relaxed transition-all duration-300 z-15 shadow-xl pointer-events-none">
                          {skill.details}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Robo-Terminal controller sandbox simulation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel neon-border-green p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <h4 className="font-display font-bold text-sm tracking-wider uppercase text-slate-200">
                  {t('skills_sim_title')}
                </h4>
              </div>
              <p className="font-sans text-slate-400 text-xs leading-relaxed">
                {t('skills_sim_desc')}
              </p>
              
              <RoboConsole />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
