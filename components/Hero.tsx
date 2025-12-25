import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../constants';
import { ArrowDownLeft, Asterisk } from 'lucide-react';
import skyImage from '../astronaut/sky.png';
import landImage from '../astronaut/land.png';
import astronautImage from '../astronaut/astronaut alone.png';

const Hero: React.FC = () => {
  const [glassPosition, setGlassPosition] = useState({ top: 0, left: 0 });
  const [glassPosition2, setGlassPosition2] = useState({ top: 0, left: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!imageRef.current || !containerRef.current) return;

      const img = imageRef.current;
      const container = containerRef.current;
      
      // Get image natural dimensions
      const imgNaturalWidth = img.naturalWidth;
      const imgNaturalHeight = img.naturalHeight;
      
      // Get container dimensions
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      // Calculate how the image is scaled with object-cover
      const imgAspectRatio = imgNaturalWidth / imgNaturalHeight;
      const containerAspectRatio = containerWidth / containerHeight;
      
      let displayedWidth: number;
      let displayedHeight: number;
      let offsetX = 0;
      let offsetY = 0;
      
      if (imgAspectRatio > containerAspectRatio) {
        // Image is wider - height fits, width is cropped
        displayedHeight = containerHeight;
        displayedWidth = containerHeight * imgAspectRatio;
        offsetX = (containerWidth - displayedWidth) / 2;
      } else {
        // Image is taller - width fits, height is cropped
        displayedWidth = containerWidth;
        displayedHeight = containerWidth / imgAspectRatio;
        offsetY = (containerHeight - displayedHeight) / 2;
      }
      
      // Position of orb in the image (adjusted: moved down and to the left)
      // Convert to pixels in the displayed image
      const orbXInImage = imgNaturalWidth * 0.68; // 90% from left = 10% from right (moved left)
      const orbYInImage = imgNaturalHeight * 0.40; // 15% from top (moved down)
      
      // Convert to container coordinates
      const orbXInContainer = (orbXInImage / imgNaturalWidth) * displayedWidth + offsetX;
      const orbYInContainer = (orbYInImage / imgNaturalHeight) * displayedHeight + offsetY;
      
      // Position glass element (center it on the orb, glass is 600px)
      const glassSize = 600;
      setGlassPosition({
        top: orbYInContainer - glassSize / 2,
        left: orbXInContainer - glassSize / 2
      });
      
      // Position second glass element (up and to the right)
      // Move it up by 15% and to the right by 10% relative to the first orb position
      const orb2XInImage = imgNaturalWidth * 0.99; // 88% from left (more to the right)
      const orb2YInImage = imgNaturalHeight * 0.01; // 15% from top (moved up more)
      
      const orb2XInContainer = (orb2XInImage / imgNaturalWidth) * displayedWidth + offsetX;
      const orb2YInContainer = (orb2YInImage / imgNaturalHeight) * displayedHeight + offsetY;
      
      setGlassPosition2({
        top: orb2YInContainer - glassSize / 2,
        left: orb2XInContainer - glassSize / 2
      });
    };

    // Initial calculation
    updatePosition();

    // Update on resize
    window.addEventListener('resize', updatePosition);
    
    // Also update when image loads
    if (imageRef.current?.complete) {
      updatePosition();
    } else {
      imageRef.current?.addEventListener('load', updatePosition);
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      imageRef.current?.removeEventListener('load', updatePosition);
    };
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-40 overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Layered Background Images */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0">
        {/* Sky - Background Layer */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src={skyImage} 
            alt="Sky background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Abstract 3D Glass Element - Between Sky and Land */}
        <div 
          className="absolute w-[600px] h-[600px] animate-float-slow pointer-events-none z-10" 
          style={{ 
            top: `${glassPosition.top}px`, 
            left: `${glassPosition.left}px`,
            animationDelay: '0s'
          }}
        >
          <div className="relative w-full h-full">
            <div 
              className="absolute inset-0 opacity-95 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(ellipse at 90% 20%, #d330b8 0%, #d330b8 30%, #e9bd3f 60%, #f5c842 80%, #ffd700 100%)'
              }}
            ></div>
            <div className="absolute inset-4 bg-white/30 backdrop-blur-xl rounded-full border border-white/50 shadow-2xl flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at 25% 50%, rgba(211, 48, 184, 0.7) 0%, rgba(211, 48, 184, 0.5) 40%, rgba(233, 189, 63, 0.6) 60%, rgba(245, 200, 66, 0.8) 80%, rgba(255, 215, 0, 0.9) 100%)'
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Second Abstract 3D Glass Element - Cyan - Between Sky and Land */}
        <div 
          className="absolute w-[600px] h-[600px] animate-float-slow pointer-events-none z-10" 
          style={{ 
            top: `${glassPosition2.top}px`, 
            left: `${glassPosition2.left}px`,
            animationDelay: '2.5s'
          }}
        >
          <div className="relative w-full h-full">
            <div 
              className="absolute inset-0 opacity-95 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(ellipse at 90% 20%, #33dccf 0%, #33dccf 30%, #4ae5d8 60%, #5fece0 80%, #6ffff5 100%)'
              }}
            ></div>
            <div className="absolute inset-4 bg-white/30 backdrop-blur-xl rounded-full border border-white/50 shadow-2xl flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at 25% 50%, rgba(51, 220, 207, 0.7) 0%, rgba(51, 220, 207, 0.5) 40%, rgba(74, 229, 216, 0.6) 60%, rgba(95, 236, 224, 0.8) 80%, rgba(111, 255, 245, 0.9) 100%)'
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Land - Middle Layer */}
        <div className="absolute inset-0 w-full h-full z-20">
          <img 
            src={landImage} 
            alt="Land" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Astronaut Alone - Foreground Layer */}
        <div className="absolute inset-0 w-full h-full z-30">
          <img 
            ref={imageRef}
            src={astronautImage} 
            alt="Astronaut" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Tagline */}
        <div className="flex items-center gap-4 mb-8">
           <div className="px-3 py-1 rounded-full border border-black text-xs font-bold uppercase tracking-widest bg-swiss-lime">
              Available for work
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