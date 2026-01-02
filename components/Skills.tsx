import React from 'react';
import { SKILL_CATEGORIES, EDUCATION } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-swiss-black text-white relative overflow-hidden">
      
      {/* Abstract Background Shape */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-swiss-blue rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Skills Column */}
          <div>
            <h2 className="text-5xl font-display font-bold mb-12">
              Technical <span className="text-swiss-lime">Stack</span>
            </h2>
            
            <div className="space-y-6">
              {SKILL_CATEGORIES.map((category, idx) => (
                <div key={idx} className="border border-white/20 p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-6 font-display flex items-center gap-3">
                     <span className="w-3 h-3 bg-swiss-lime rounded-sm"></span>
                     {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <span key={skill} className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Stats */}
          <div id="education">
             <h2 className="text-5xl font-display font-bold mb-12">
              Education
            </h2>

            <div className="space-y-8">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-swiss-lime">
                  <h3 className="text-3xl font-display font-bold leading-tight mb-2">{edu.degree}</h3>
                  <p className="text-gray-400 text-lg mb-2">{edu.institution}</p>
                  <p className="font-mono text-sm text-swiss-lime uppercase tracking-widest bg-swiss-lime/10 inline-block px-2 py-1 rounded">
                    {edu.period}
                  </p>
                </div>
              ))}
            </div>

            {/* Big Bold Promo Box */}
            <div className="mt-16 bg-swiss-lime text-black p-10 rounded-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
               
               <h3 className="text-3xl font-display font-bold mb-2 relative z-10">Ready to collaborate?</h3>
               <p className="font-medium mb-6 relative z-10 max-w-xs">
                  Open for new opportunities!.
               </p>
               <a href={`mailto:me@blasmoreno.dev`} className="inline-block px-6 py-3 bg-black text-white font-bold rounded-full hover:scale-105 transition-transform">
                  Contact Me
               </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;