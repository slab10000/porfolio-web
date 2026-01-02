import React, { useEffect, useState, useRef } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const historyStatePushed = useRef(false);

  // Function to highlight technology keywords in text
  const highlightTechKeywords = (text: string, techStack: string[]): React.ReactNode => {
    if (!text) return text;

    // Create a comprehensive list of technology keywords
    const techKeywords = [
      ...techStack,
      // Common technology terms that might appear in descriptions
      'React', 'TypeScript', 'JavaScript', 'Python', 'Kotlin', 'Java', 'C++',
      'PyTorch', 'TensorFlow', 'ML', 'Machine Learning',
      'Docker', 'ROS', 'ROS2', '5G', 'Edge Computing',
      'Jetpack Compose', 'Android', 'MVVM', 'Clean Architecture',
      'Hilt', 'Room', 'Navigation Compose', 'Glance', 'Material Design',
      'Vite', 'Tailwind CSS', 'Radix UI', 'Framer Motion',
      'Node.js', 'Vercel', 'Serverless Functions', 'OpenAI API',
      'Embedded Systems', 'Telemetry', 'C++',
      'Transformer', 'Neural Networks', 'Deep Learning',
      'Git', 'GitHub', 'CI/CD'
    ];

    // Sort by length (longest first) to match longer phrases first
    const sortedKeywords = techKeywords
      .filter((keyword, index, self) => self.indexOf(keyword) === index) // Remove duplicates
      .sort((a, b) => b.length - a.length);

    // Create regex pattern with word boundaries
    const pattern = new RegExp(
      `\\b(${sortedKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
      'gi'
    );

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    // Reset regex
    pattern.lastIndex = 0;
    
    while ((match = pattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Add highlighted match
      parts.push(
        <span key={match.index} className="bg-swiss-lime text-black font-semibold px-1 rounded">
          {match[0]}
        </span>
      );
      
      lastIndex = pattern.lastIndex;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? <>{parts}</> : text;
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      // Add class to hide navbar on mobile
      document.body.classList.add('modal-open-mobile');
      // Push state to history so back button closes modal
      window.history.pushState({ modalOpen: true }, '');
      historyStatePushed.current = true;
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open-mobile');
      // Clean up history state if modal closes normally (not via back button)
      if (historyStatePushed.current) {
        // Replace the modal state with the current URL to clean up history
        if (window.history.state && (window.history.state as any).modalOpen) {
          window.history.replaceState(null, '', window.location.href);
        }
        historyStatePushed.current = false;
      }
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open-mobile');
    };
  }, [isOpen]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isOpen && historyStatePushed.current) {
        // Close modal when back button is pressed
        historyStatePushed.current = false;
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose]);

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
    <>
      <style>{`
        .project-modal-container {
          height: 100dvh;
          padding-top: max(env(safe-area-inset-top), 0px);
          padding-bottom: max(env(safe-area-inset-bottom), 0px);
        }
        @media (min-width: 768px) {
          .project-modal-container {
            height: calc(100vh - 8rem) !important;
            max-height: 85vh;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
      <div 
        className={`fixed inset-0 z-[100] flex items-center md:items-start justify-center p-0 md:p-6 md:pt-24 transition-opacity duration-300 ${
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
        className={`project-modal-container relative w-full md:w-full md:max-w-4xl bg-white rounded-none md:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 flex flex-col ${
            isOpen ? 'scale-100 translate-y-0' : 'scale-100 translate-y-0 md:scale-95 md:translate-y-8'
        }`}
        style={{
          boxSizing: 'border-box',
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-colors backdrop-blur-md"
        >
          <X className="w-6 h-6 text-black" />
        </button>

        {/* Content */}
        <div className="flex flex-col h-full">
            {/* Image Section */}
            <div className="w-full h-64 sm:h-80 md:h-96 relative flex-shrink-0">
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

            {/* Scrollable Details Section */}
            <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
                <div>
                    <h3 className="text-xl font-bold text-swiss-black mb-3">About the Project</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {highlightTechKeywords(project.modalDescription || project.description, project.techStack)}
                    </p>
                </div>
            </div>

            {/* Fixed Links Section */}
            {project.links && project.links.length > 0 && (
                <div className="p-6 sm:p-8 border-t border-gray-100 bg-white flex-shrink-0 z-10">
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
    </>
  );
};

export default ProjectModal;
