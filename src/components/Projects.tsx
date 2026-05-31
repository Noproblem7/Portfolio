import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, X, CheckCircle } from 'lucide-react';
import { Project } from '../types';
import ProjectIllustration from './ProjectIllustration';
import { useLanguage } from '../LanguageContext';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 bg-slate-950 border-t border-slate-900 relative transition-colors duration-300">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="section-title justify-center">{t('projects_subtitle')}</h2>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mt-1">
            {t('projects_title')}
          </h3>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans font-light leading-relaxed">
            {t('projects_desc')}
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel neon-border-cyan p-5 flex flex-col h-full transition-all duration-300 relative group"
            >
              {/* Image illustration slot using high-tech SVGs */}
              <div className="mb-5 rounded-xl overflow-hidden">
                <ProjectIllustration type={project.imagePlaceholder} />
              </div>

              {/* Card Meta Content */}
              <div className="flex-1 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="mt-2 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-3">
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.techTags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="skills-tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="btn-cyber flex-1 !py-1 text-[11px] cursor-pointer"
                    >
                      {t('projects_btn_details')}
                    </button>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cyber btn-cyber-green !p-2 shrink-0 flex items-center justify-center cursor-pointer"
                      title={t('projects_github_title')}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Side Drawer for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel neon-border-cyan relative w-full max-w-lg p-6 sm:p-8 overflow-y-auto max-h-[85vh] z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full text-slate-400 hover:text-slate-100 bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase">
                    {t('projects_modal_subtitle')}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-slate-100 mt-1">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-900 bg-slate-950">
                  <ProjectIllustration type={selectedProject.imagePlaceholder} />
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-bold text-xs tracking-wider uppercase text-cyan-400 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                    {t('projects_modal_desc_title')}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {selectedProject.details}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-xs text-slate-350">
                    {t('projects_modal_tech_title')}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.techTags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="skills-tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyber flex-1 inline-flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    <Github className="w-4 h-4" />
                    {t('projects_modal_source')}
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn-cyber btn-cyber-green px-5 cursor-pointer text-xs"
                  >
                    {t('projects_modal_close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
