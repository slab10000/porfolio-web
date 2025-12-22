import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-white pointer-events-none overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-60"></div>
      
      {/* Floating Gradient Orbs - SEF Style */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-swiss-lime/20 to-transparent rounded-full blur-[100px] mix-blend-multiply animate-float-slow opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-swiss-blue/10 to-transparent rounded-full blur-[80px] mix-blend-multiply animate-float-slow opacity-60" style={{animationDelay: '-4s'}}></div>
      
      {/* Grain Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
};

export default Background;