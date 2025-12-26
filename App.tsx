import React from 'react';
import Background from './components/StarBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-swiss-black font-sans selection:bg-swiss-lime selection:text-black">
      <Background />
      <Navbar />
      
      <main className="relative z-10 flex flex-col gap-0">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
      </main>

      <footer className="relative z-10 bg-swiss-gray py-12 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
             <p className="font-display font-bold text-2xl text-swiss-black tracking-tight">
               BLAS<span className="px-1.5 py-0.5 rounded" style={{ backgroundColor: '#d6fe51', color: '#000000' }}>.DEV</span>
             </p>
             <p className="text-gray-500 text-sm mt-1">
               Engineered in Indiana & Madrid.
             </p>
          </div>
          
          <div className="flex gap-6">
             <a href="#" className="text-gray-500 hover:text-black font-medium">LinkedIn</a>
             <a href="#" className="text-gray-500 hover:text-black font-medium">GitHub</a>
             <a href="#" className="text-gray-500 hover:text-black font-medium">Email</a>
          </div>

          <p className="text-gray-400 text-xs font-mono">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;