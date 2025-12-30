import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen && !isAnimating) return null;

  if (!project) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden transform transition-all duration-300 ${
            isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-colors backdrop-blur-md"
        >
          <X className="w-6 h-6 text-black" />
        </button>

        {/* Content */}
        <div className="flex flex-col">
            {/* Image Section */}
            <div className="w-full h-64 sm:h-80 md:h-96 relative">
                 <img 
                    src={project.imagePlaceholder} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                 
                 <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
                        {project.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-sm font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>
                 </div>
            </div>

            {/* Details Section */}
            <div className="p-6 sm:p-8 space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-swiss-black mb-3">About the Project</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {project.links && project.links.length > 0 && (
                    <div>
                        <h3 className="text-xl font-bold text-swiss-black mb-3">Links</h3>
                         <div className="flex flex-wrap gap-4">
                            {project.links.map((link, idx) => (
                                <a 
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-swiss-lime hover:text-black transition-colors"
                                >
                                    {link.label.toLowerCase().includes('github') || link.label.toLowerCase().includes('code') ? (
                                        <Github className="w-5 h-5" />
                                    ) : (
                                        <ExternalLink className="w-5 h-5" />
                                    )}
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
