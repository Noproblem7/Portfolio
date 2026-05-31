import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Configurator from './components/Configurator';
import { 
  INITIAL_PROFILE, 
  INITIAL_SKILLS, 
  INITIAL_PROJECTS, 
  SOCIAL_LINKS 
} from './data';

export default function App() {
  // Load personalized profile details from localStorage (lazy initialization prevents HMR/useEffect re-render loops)
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('robo_portfolio_profile_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Local storage initialization error", e);
    }
    return INITIAL_PROFILE;
  });

  const [showConfig, setShowConfig] = useState(false);

  const handleSaveProfile = (newData: { name: string; title: string; bio: string }) => {
    setProfile(newData);
    try {
      localStorage.setItem('robo_portfolio_profile_v1', JSON.stringify(newData));
    } catch (e) {
      console.error("Error saving customized profile", e);
    }
  };

  const handleResetProfile = () => {
    setProfile(INITIAL_PROFILE);
    try {
      localStorage.removeItem('robo_portfolio_profile_v1');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/35 selection:text-cyan-200">
      
      {/* Navigation section */}
      <Header 
        name={profile.name} 
        onOpenConfig={() => setShowConfig(true)} 
      />

      {/* Main layouts container */}
      <main className="flex-grow">
        {/* Intro Hero banner */}
        <Hero 
          name={profile.name} 
          title={profile.title} 
        />

        {/* Biography & Origins */}
        <About 
          bio={profile.bio} 
        />

        {/* Visual Skills checklist & Simulator command console */}
        <Skills 
          categories={INITIAL_SKILLS} 
        />

        {/* Robotics deliverables timeline */}
        <Projects 
          projects={INITIAL_PROJECTS} 
        />

        {/* Secure connection form & coordinates */}
        <Contact 
          socials={SOCIAL_LINKS} 
        />
      </main>

      {/* Footer credits bar */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="font-mono text-[10px] sm:text-xs text-slate-500">
            © {new Date().getFullYear()} {profile.name}. Barcha huquqlar himoyalangan.
          </p>
          <p className="font-mono text-[9px] sm:text-[10px] text-slate-600 uppercase tracking-widest">
            Loyihalashtirildi & Ishlab chiqildi // high-tech robotics specs
          </p>
        </div>
      </footer>

      {/* Configurator modal */}
      {showConfig && (
        <Configurator
          name={profile.name}
          title={profile.title}
          bio={profile.bio}
          onSave={handleSaveProfile}
          onReset={handleResetProfile}
          onClose={() => setShowConfig(false)}
        />
      )}
    </div>
  );
}
