import React from 'react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/experience-bg.png')" }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
           <h2 className="text-6xl font-display font-bold text-swiss-black tracking-tighter">
              Selected <br/> Experience
           </h2>
           <div className="text-right">
              <p className="font-mono text-sm text-gray-500 uppercase tracking-widest mt-4 md:mt-0">
                 Career Timeline <br/> 2018 — Present
              </p>
           </div>
        </div>

        <div className="flex flex-col gap-8">
          {EXPERIENCES.map((exp, index) => (
            <div key={index} className="group glassmorphism-premium py-12 px-8 rounded-3xl transition-all duration-500 ease-out">
               {/* Header Row */}
               <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-12">
                   <h3 className="text-3xl font-display font-bold text-swiss-black mb-2 md:mb-0">
                      {exp.company}
                   </h3>
                   {exp.totalPeriod && (
                       <span className="font-display font-bold text-lg text-swiss-black">
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
                         <div className="absolute left-0 top-0 w-12 h-12 rounded-full border-[6px] border-[#d6fe51] bg-white flex items-center justify-center z-10 shadow-sm">
                         </div>
                         
                         <div className="pt-1">
                             <h4 className="text-xl font-display font-bold text-gray-800">
                                {role.title} <span className="text-gray-600 font-normal mx-2">|</span> <span className="text-gray-700 text-lg font-medium">{role.period}</span>
                             </h4>
                             <p className="text-gray-800 mt-2 leading-relaxed font-light text-lg max-w-4xl">
                                {role.description}
                             </p>
                         </div>
                      </div>
                  ))}
               </div>
            </div>
          ))}
          
          {/* Closing Border */}
          <div className="border-t border-black/10"></div>
        </div>

      </div>
    </section>
  );
};

export default Experience;