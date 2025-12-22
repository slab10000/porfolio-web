import React from 'react';
import { EXPERIENCES } from '../constants';
import LiquidGlassCard from './LiquidGlassCard';

const Experience: React.FC = () => {
  // Generate random pattern of words
  const generateRandomPattern = (count: number): string => {
    const words = ['Android', 'Robotics', 'TeamLeader'];
    let pattern = '';
    for (let i = 0; i < count; i++) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      pattern += randomWord;
    }
    return pattern;
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-20 border-b border-black pb-8">
           <h2 className="text-[10vw] md:text-8xl font-display font-bold text-swiss-black leading-none tracking-tighter">
              EXPERIENCE<span className="text-swiss-lime">.</span>
           </h2>
        </div>

      </div>

      {/* Green Section with Background Pattern */}
      <div className="relative overflow-hidden bg-swiss-lime py-24">
        {/* Large Background Text - Repeating Pattern */}
        <div className="absolute inset-0 z-0 overflow-hidden experience-bg-pattern">
          <div className="experience-bg-text-container">
            {Array(15).fill(null).map((_, i) => (
              <div key={i} className="experience-bg-text-row">
                <span className="font-display font-black text-black/10 select-none pointer-events-none experience-bg-text">
                  {generateRandomPattern(50)}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            {EXPERIENCES.map((exp, index) => (
              <LiquidGlassCard 
                key={index} 
                className="group py-12 px-8 rounded-3xl transition-all duration-500 ease-out"
              >
                 {/* Header Row */}
                 <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-12">
                     <h3 className="text-4xl font-display font-bold text-swiss-black mb-2 md:mb-0">
                        {exp.company}
                     </h3>
                     {exp.totalPeriod && (
                         <span className="font-display font-bold text-xl text-swiss-black">
                             {exp.totalPeriod}
                         </span>
                     )}
                 </div>

                 {/* Roles List */}
                 <div className="ml-2 md:ml-4">
                    {exp.roles.map((role, rIndex) => (
                        <div 
                          key={rIndex} 
                          className={`relative pl-20 md:pl-24 ${rIndex !== exp.roles.length - 1 ? 'pb-16' : ''}`}
                        >
                           {/* Connecting Line (Yellow) - Only if not last item */}
                           {rIndex !== exp.roles.length - 1 && (
                               <div className="absolute left-[1.375rem] top-14 bottom-2 w-1 bg-swiss-lime/80 rounded-full"></div>
                           )}

                           {/* Hollow Circle - Thicker & Custom Color - No Numbers */}
                           <div className="absolute left-0 top-0 w-12 h-12 rounded-full border-[6px] border-[#d6fe51] bg-transparent flex items-center justify-center z-10 shadow-sm">
                           </div>
                           
                           <div className="pt-1">
                               <h4 className="text-2xl font-display font-bold text-gray-800">
                                  {role.title} <span className="text-gray-600 font-normal mx-2">|</span> <span className="text-gray-700 text-xl font-medium">{role.period}</span>
                               </h4>
                               <p className="text-gray-800 mt-2 leading-relaxed font-light text-xl max-w-4xl">
                                  {role.description}
                               </p>
                           </div>
                        </div>
                    ))}
                 </div>
              </LiquidGlassCard>
            ))}
            
            {/* Closing Border */}
            <div className="border-t border-black/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;