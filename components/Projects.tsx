import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import ProjectModal from './ProjectModal';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-20 border-b border-black pb-8">
           <h2 className="text-[10vw] md:text-8xl font-display font-bold text-swiss-black leading-none tracking-tighter">
              WORK<span className="text-swiss-lime">.</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {PROJECTS.map((project, index) => (
            <div 
                key={index} 
                className={`group ${index % 2 !== 0 ? 'md:translate-y-20' : ''} cursor-pointer`}
                onClick={() => setSelectedProject(project)}
            >
               
               {/* Card Image */}
               <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-swiss-gray mb-6">
                  <div className="absolute inset-0 bg-swiss-black/0 group-hover:bg-swiss-black/10 transition-colors z-10"></div>
                  
                  <img 
                    src={project.imagePlaceholder} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating Action Button */}
                  <div className="absolute bottom-6 right-6 z-20 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                     <ArrowUpRight className="w-6 h-6 text-black" />
                  </div>

                  {/* Glass overlay badge for Tech */}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2 max-w-[80%]">
                     {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/80 backdrop-blur text-xs font-bold rounded-full border border-white/50">
                           {tech}
                        </span>
                     ))}
                  </div>
               </div>

               {/* Text Info */}
               <div className="px-2">
                  <h3 className="text-3xl font-display font-bold text-swiss-black mb-2 group-hover:underline decoration-2 underline-offset-4 decoration-swiss-lime">
                     {project.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                     {project.description}
                  </p>
               </div>

            </div>
          ))}
        </div>
      </div>

      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
    </section>
  );
};

export default Projects;