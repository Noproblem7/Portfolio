import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Github, Linkedin, CheckCircle, Mail, AlertCircle, MessageSquare } from 'lucide-react';
import { SocialLink, ContactMessage } from '../types';

interface ContactProps {
  socials: SocialLink[];
}

export default function Contact({ socials }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [localMessages, setLocalMessages] = useState<ContactMessage[]>([]);

  // Load previously submitted messages from localStorage (to make it real!)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('robo_portfolio_messages');
      if (stored) {
        setLocalMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage error loading portfolio messages", e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      message,
      timestamp: new Date().toLocaleTimeString()
    };

    const updated = [...localMessages, newMessage];
    setLocalMessages(updated);
    try {
      localStorage.setItem('robo_portfolio_messages', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Trigger mailto email action
    const mailtoUrl = `mailto:mtilavoldiyev9@gmail.com?subject=${encodeURIComponent("Portfolio orqali xabar: " + name)}&body=${encodeURIComponent("Kimdan: " + name + " (" + email + ")\n\nXabar:\n" + message)}`;
    window.location.href = mailtoUrl;

    // Success state triggering animation
    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');

    setTimeout(() => {
      setStatus('idle');
    }, 4000);
  };

  const handleClearInbox = () => {
    setLocalMessages([]);
    localStorage.removeItem('robo_portfolio_messages');
  };

  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Send':
        return <Send className="w-4 h-4" />;
      case 'Github':
        return <Github className="w-4 h-4" />;
      case 'Linkedin':
        return <Linkedin className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="section-title justify-center">04 // ALOQA</h2>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mt-1">
            Bog'lanish & Muloqot
          </h3>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans font-light">
            Savollaringiz bormi yoki yangi robototexnika loyihasini muhokama qilmoqchimisiz? Menga yozing!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Social link addresses & info details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel neon-border-cyan p-6 sm:p-8">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-xl"></div>
              
              <h4 className="font-display font-bold text-sm tracking-wider uppercase text-slate-200 mb-4">
                Aloqa Ma'lumotlari
              </h4>
              
              <div className="space-y-4 font-mono text-xs sm:text-sm text-slate-400">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Email: mtilavoldiyev9@gmail.com</span>
                </div>
                <div>Status: Yangi loyihalar uchun ochiq</div>
              </div>

              <div className="h-[1px] bg-slate-900 my-6"></div>

              <h5 className="font-display font-semibold text-xs text-slate-300 uppercase tracking-wider mb-4">
                Ijtimoiy Tarmoqlar
              </h5>
              
              <div className="flex flex-wrap gap-3">
                {socials.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyber inline-flex items-center gap-2"
                  >
                    {renderSocialIcon(link.icon)}
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>

            {/* Simulated Inbox overlay for client-side feedback verification */}
            {localMessages.length > 0 && (
              <div className="glass-panel neon-border-green p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <h4 className="font-display font-bold text-xs tracking-wider uppercase text-slate-200">
                      Kelgan Xabarlar ({localMessages.length})
                    </h4>
                  </div>
                  <button 
                    onClick={handleClearInbox}
                    className="font-mono text-[9px] text-rose-450 hover:underline cursor-pointer"
                  >
                    Tozalash
                  </button>
                </div>
                
                <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                  {localMessages.map((msg) => (
                    <div key={msg.id} className="bg-slate-950/90 border border-slate-900 p-3 rounded-lg font-mono text-[10px] space-y-1">
                      <div className="flex justify-between text-cyan-400 font-semibold mb-1">
                        <span>{msg.name}</span>
                        <span className="text-slate-500 text-[9px]">{msg.timestamp}</span>
                      </div>
                      <div className="text-slate-300 leading-normal font-sans pr-1 line-clamp-2">{msg.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Digital secure message sending box */}
          <div className="lg:col-span-7">
            <form 
              onSubmit={handleSubmit}
              className="glass-panel neon-border-cyan p-6 sm:p-8 space-y-6"
            >
              <h4 className="font-display font-bold text-sm tracking-wider uppercase text-slate-200">
                Xabar qoldirish
              </h4>

              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name-input" className="block font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">
                    To'liq ismingiz
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masalan: Muhammadaziz Tilavoldiyev"
                    className="w-full bg-slate-950/80 text-slate-100 border border-cyan-500/20 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,242,255,0.15)] rounded px-4 py-3 text-sm outline-none transition-all duration-300 font-sans font-light"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email-input" className="block font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">
                    Elektron pochta manzilingiz
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masalan: example@gmail.com"
                    className="w-full bg-slate-950/80 text-slate-100 border border-cyan-500/20 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,242,255,0.15)] rounded px-4 py-3 text-sm outline-none transition-all duration-300 font-sans font-light"
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="msg-input" className="block font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">
                    Sizning xabaringiz
                  </label>
                  <textarea
                    id="msg-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Loyiha yoki o'zaro hamkorlik haqida yozing..."
                    rows={4}
                    className="w-full bg-slate-950/80 text-slate-100 border border-cyan-500/20 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,242,255,0.15)] rounded px-4 py-3 text-sm outline-none transition-all duration-300 font-sans font-light resize-none"
                    required
                  />
                </div>
              </div>

              {/* Status Notifications */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-900/50 p-3 rounded-xl"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    Xabar muvaffaqiyatli yuborildi! (U pastdagi xabarlar jurnaliga qo'shildi)
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-xs font-mono text-rose-400 bg-rose-950/20 border border-rose-900/50 p-3 rounded-xl"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Iltimos barcha maydonlarni to'g'ri to'ldiring!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit trigger button */}
              <button
                type="submit"
                className="btn-cyber w-full !py-3 font-semibold inline-flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Xabarni yuborish
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
