import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Lightbulb, GraduationCap, PenTool } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface AboutProps {
  bio: string;
}

export default function About({ bio }: AboutProps) {
  const { t } = useLanguage();

  const achievements = [
    {
      icon: Cpu,
      title: t('about_area1_title'),
      description: t('about_area1_desc')
    },
    {
      icon: Lightbulb,
      title: t('about_area2_title'),
      description: t('about_area2_desc')
    },
    {
      icon: PenTool,
      title: t('about_area3_title'),
      description: t('about_area3_desc')
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-950 border-t border-slate-900 relative transition-colors duration-300">
      {/* Subtle layout vectors */}
      <div className="absolute top-10 right-10 width-32 height-32 bg-cyan-950/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <h2 className="section-title">{t('about_subtitle')}</h2>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            {t('about_title')}
          </h3>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Journey description columns split */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="font-display text-lg sm:text-xl font-semibold text-slate-200">
                {t('about_intro_headline')}
              </h4>
              <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed">
                {bio}
              </p>
            </motion.div>

            {/* Quick stats grid inside bio */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass-panel neon-border-cyan p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <GraduationCap className="w-4 h-4 text-cyan-455 text-cyan-400" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300">
                    {t('about_stat_field_title')}
                  </span>
                </div>
                <p className="text-[10px] text-slate-450 font-sans leading-normal">
                  {t('about_stat_field_desc')}
                </p>
              </div>

              <div className="glass-panel p-4" style={{ borderLeft: '3px solid #00ff9d' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300">
                    {t('about_stat_level_title')}
                  </span>
                </div>
                <p className="text-[10px] text-slate-450 font-sans leading-normal">
                  {t('about_stat_level_desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Graphical/Interactive highlight of accomplishments */}
          <div className="lg:col-span-5 space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel neon-border-cyan p-6 space-y-6"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-xl"></div>
              <h5 className="font-mono text-xs text-cyan-500 tracking-widest uppercase">
                {t('about_areas_title')}
              </h5>

              <div className="space-y-4">
                {achievements.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={idx} className="flex gap-4 items-start group">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-colors shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <h6 className="font-display font-semibold text-xs sm:text-sm text-slate-200">
                          {item.title}
                        </h6>
                        <p className="font-sans text-xs text-slate-450 leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
