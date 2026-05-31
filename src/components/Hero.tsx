import React from 'react';
import { motion } from 'motion/react';
import { Bot, ArrowRight, MessageSquare, Terminal } from 'lucide-react';

interface HeroProps {
  name: string;
  title: string;
}

export default function Hero({ name, title }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-cyber-grid py-20 px-4">
      {/* Decorative radial gradients for glowing ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-950/25 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-950/25 rounded-full filter blur-[100px] pointer-events-none"></div>
      
      {/* Absolute high-tech glowing grids lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">


        {/* Major heading */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-100"
          >
            Salom, men <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 neon-text-cyan">{name}</span>.
          </motion.h1>

          {/* Subheading - Robototexnika muhandisi va innovatsion yechimlar yaratuvchisi */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-lg sm:text-xl md:text-2xl text-slate-350 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {title}
          </motion.p>
        </div>

        {/* Buttons / Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4"
        >
          <a
            href="#projects"
            className="btn-cyber w-full sm:w-auto inline-flex items-center gap-2"
          >
            Loyihalarimni ko'rish
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#contact"
            className="btn-cyber btn-cyber-green w-full sm:w-auto inline-flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Men bilan bog'lanish
          </a>
        </motion.div>

        {/* Futuristic Dashboard/Console summary banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-10 max-w-lg mx-auto"
        >
          <div className="grid grid-cols-3 gap-4 border border-slate-900 bg-slate-950/70 backdrop-blur px-6 py-4 rounded-xl text-center">
            <div>
              <div className="font-mono text-2xl font-bold text-cyan-400">1+</div>
              <div className="font-sans text-[10px] text-slate-500 uppercase tracking-widest mt-1">Yillik Tajriba</div>
            </div>
            <div className="border-x border-slate-900">
              <div className="font-mono text-2xl font-bold text-emerald-400">3+</div>
              <div className="font-sans text-[10px] text-slate-500 uppercase tracking-widest mt-1">Real Loyihalar</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold text-blue-400">100%</div>
              <div className="font-sans text-[10px] text-slate-500 uppercase tracking-widest mt-1">Ixtisoslik</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Tech decorative angle layout styling */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
    </section>
  );
}
