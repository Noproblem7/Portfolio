import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, RotateCcw, Sliders, Check } from 'lucide-react';

interface ConfiguratorProps {
  name: string;
  title: string;
  bio: string;
  onSave: (data: { name: string; title: string; bio: string }) => void;
  onReset: () => void;
  onClose: () => void;
}

export default function Configurator({ name, title, bio, onSave, onReset, onClose }: ConfiguratorProps) {
  const [tempName, setTempName] = useState(name);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempBio, setTempBio] = useState(bio);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    onSave({
      name: tempName,
      title: tempTitle,
      bio: tempBio
    });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1500);
  };

  const handleResetToDefault = () => {
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-2xl z-10 space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-slate-100">
              Portfolio Ma'lumotlarini Sozlash
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="font-sans text-slate-400 text-xs leading-relaxed">
          Ushbu paneldan foydalanib, portfolio sahifasidagi ism, bio va unvonlarni o'zgartirishingiz va o'z ma'lumotlaringizni kiritishingiz mumkin! Ma'lumotlar brauzer keshida saqlanadi.
        </p>

        <div className="space-y-4">
          {/* Name input */}
          <div className="space-y-1.5">
            <label htmlFor="temp-name" className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest">
              Foydalanuvchi ismi
            </label>
            <input
              id="temp-name"
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full bg-slate-900 text-slate-200 border border-slate-850 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs outline-none transition-colors"
            />
          </div>

          {/* Title input */}
          <div className="space-y-1.5">
            <label htmlFor="temp-title" className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest">
              Mutaxassislik unvoni
            </label>
            <input
              id="temp-title"
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="w-full bg-slate-900 text-slate-200 border border-slate-850 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs outline-none transition-colors"
            />
          </div>

          {/* Bio text area */}
          <div className="space-y-1.5">
            <label htmlFor="temp-bio" className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest">
              Tanishtiruv matni (Bio)
            </label>
            <textarea
              id="temp-bio"
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              rows={4}
              className="w-full bg-slate-900 text-slate-200 border border-slate-850 focus:border-cyan-500 rounded-lg p-3 text-xs outline-none transition-colors resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Action Panel */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          {showSuccess ? (
            <div className="w-full bg-emerald-950/30 border border-emerald-900 text-emerald-400 rounded-xl py-2.5 flex items-center justify-center gap-2 font-mono text-xs">
              <Check className="w-4 h-4 animate-bounce" /> Saqlandi!
            </div>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-800/50 py-2 rounded-xl transition-all duration-300 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                Saqlash
              </button>
              <button
                onClick={handleResetToDefault}
                className="text-slate-400 hover:text-rose-400 bg-slate-900 hover:bg-rose-950/20 border border-slate-800 hover:border-rose-900 py-2 px-3 rounded-xl transition-all duration-300 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                title="Boshlang'ich holatga qaytarish"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Dastlabki holat
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
