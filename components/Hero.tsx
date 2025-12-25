import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { ArrowDownLeft, Asterisk } from 'lucide-react';
import MacBook3D from './MacBook3D';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-40 overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* 3D MacBook Model - Bottom Left */}
      <MacBook3D />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Tagline */}
        <div className="flex items-center gap-4 mb-8">
           <div className="px-3 py-1 rounded-full border border-black text-xs font-bold uppercase tracking-widest bg-swiss-lime">
               A human in the loop
           </div>
           <div className="h-px bg-black/10 flex-grow"></div>
           <div className="text-xs font-mono text-gray-500">
              EST. 2025
           </div>
        </div>

        {/* Massive Typography */}
        <div className="relative">
           <h1 className="text-[12vw] leading-[0.85] font-display font-bold text-swiss-black tracking-tighter uppercase mb-6">
              Blas <br/>
              <span className="relative z-10">Moreno</span>
           </h1>
           
           {/* Abstract 3D Glass Element Floating over text */}
           <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] md:w-[400px] md:h-[400px] animate-float-slow pointer-events-none z-0">
              <div className="relative w-full h-full">
                 <div className="absolute inset-0 bg-gradient-to-br from-swiss-lime to-swiss-blue opacity-80 rounded-full blur-3xl"></div>
                 <div className="absolute inset-4 bg-white/30 backdrop-blur-xl rounded-full border border-white/50 shadow-2xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent transform rotate-45"></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Grid moved down significantly to clear abstract elements */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-48 items-end">
           <div className="md:col-span-7">
              <p className="text-2xl md:text-3xl font-light leading-tight text-gray-800 max-w-2xl">
                 An <span className="font-medium bg-swiss-gray px-1">AI Engineer</span> and roboticist orchestrating the convergence of digital intelligence and physical systems.
              </p>
           </div>
           <div className="md:col-span-5 flex flex-col items-start md:items-end mt-12 md:mt-0">
              <div className="flex gap-4">
                 <a href="#projects" className="group flex items-center gap-2 px-8 py-8 bg-swiss-black text-white rounded-full hover:bg-swiss-blue transition-colors duration-300">
                    <span className="font-display font-bold text-lg">View Projects</span>
                    <ArrowDownLeft className="group-hover:rotate-45 transition-transform duration-300" />
                 </a>
              </div>
           </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-40 left-0 w-full overflow-hidden py-4 border-y border-black/5 bg-white/50 backdrop-blur-sm">
           <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(6)].map((_, i) => (
                 <div key={i} className="flex items-center mx-8">
                    <span className="text-4xl font-display font-bold text-transparent text-outline uppercase">AI Architecture</span>
                    <Asterisk className="w-8 h-8 mx-6 text-swiss-lime" />
                    <span className="text-4xl font-display font-bold text-swiss-black uppercase">Software Engineering</span>
                    <Asterisk className="w-8 h-8 mx-6 text-swiss-blue" />
                    <span className="text-4xl font-display font-bold text-transparent text-outline uppercase">Robotics</span>
                    <Asterisk className="w-8 h-8 mx-6 text-swiss-lime" />
                 </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;