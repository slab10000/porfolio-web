import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../constants';
import { ArrowDownLeft, Asterisk } from 'lucide-react';


import ShootingStars from './ShootingStars';

const Hero: React.FC = () => {
  const [glassPosition, setGlassPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [glassPosition2, setGlassPosition2] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [glassPosition3, setGlassPosition3] = useState({ top: 0, left: 0, width: 0, height: 0 });
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
      
      // Calculate scale factor based on the displayed width relative to natural width
      const scaleFactor = displayedWidth / imgNaturalWidth;
      
      // Position of orb in the image (adjusted: moved down and to the left)
      // Convert to pixels in the displayed image
      const orbXInImage = imgNaturalWidth * 0.68; // 90% from left = 10% from right (moved left)
      const orbYInImage = imgNaturalHeight * 0.40; // 15% from top (moved down)
      
      // Convert to container coordinates
      const orbXInContainer = (orbXInImage / imgNaturalWidth) * displayedWidth + offsetX;
      const orbYInContainer = (orbYInImage / imgNaturalHeight) * displayedHeight + offsetY;
      
      // Position glass element (center it on the orb, base glass is 850px)
      const baseGlassSize = 1000;
      const glassSize = baseGlassSize * scaleFactor;
      
      setGlassPosition({
        top: orbYInContainer - glassSize / 2,
        left: orbXInContainer - glassSize / 2,
        width: glassSize,
        height: glassSize
      });
      
      // Position second glass element (up and to the right)
      // Move it up by 15% and to the right by 10% relative to the first orb position
      const orb2XInImage = imgNaturalWidth * 0.99; // 88% from left (more to the right)
      const orb2YInImage = imgNaturalHeight * 0.01; // 15% from top (moved up more)
      
      const orb2XInContainer = (orb2XInImage / imgNaturalWidth) * displayedWidth + offsetX;
      const orb2YInContainer = (orb2YInImage / imgNaturalHeight) * displayedHeight + offsetY;
      
      const baseGlassSize2 = 900;
      const glassSize2 = baseGlassSize2 * scaleFactor;
      
      setGlassPosition2({
        top: orb2YInContainer - glassSize2 / 2,
        left: orb2XInContainer - glassSize2 / 2,
        width: glassSize2,
        height: glassSize2
      });
      
      // Position third glass element (on the left part)
      const orb3XInImage = imgNaturalWidth * 0.30; // 15% from left (left part)
      const orb3YInImage = imgNaturalHeight * 0.20; // Moved up more
      
      const orb3XInContainer = (orb3XInImage / imgNaturalWidth) * displayedWidth + offsetX;
      const orb3YInContainer = (orb3YInImage / imgNaturalHeight) * displayedHeight + offsetY;
      
      const baseGlassSize3 = 1200; // Smaller size for third glass element
      const glassSize3 = baseGlassSize3 * scaleFactor;
      
      setGlassPosition3({
        top: orb3YInContainer - glassSize3 / 2,
        left: orb3XInContainer - glassSize3 / 2,
        width: glassSize3,
        height: glassSize3
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
            src="/astronaut/sky.png" 
            alt="Sky background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Abstract 3D Glass Element - Between Sky and Land */}
        <div 
          className="absolute animate-float-slow pointer-events-none z-10" 
          style={{ 
            top: `${glassPosition.top}px`, 
            left: `${glassPosition.left}px`,
            width: `${glassPosition.width}px`,
            height: `${glassPosition.height}px`,
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
          className="absolute animate-float-slow pointer-events-none z-10" 
          style={{ 
            top: `${glassPosition2.top}px`, 
            left: `${glassPosition2.left}px`,
            width: `${glassPosition2.width}px`,
            height: `${glassPosition2.height}px`,
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
        
        {/* Third Abstract 3D Glass Element - Purple to Pink - Between Sky and Land */}
        <div 
          className="absolute animate-float-slow pointer-events-none z-10" 
          style={{ 
            top: `${glassPosition3.top}px`, 
            left: `${glassPosition3.left}px`,
            width: `${glassPosition3.width}px`,
            height: `${glassPosition3.height}px`,
            animationDelay: '5s'
          }}
        >
          <div className="relative w-full h-full">
            <div 
              className="absolute inset-0 opacity-95 rounded-full blur-3xl"
              style={{
               background: 'radial-gradient(ellipse at 10% 50%, #6d0cff 0%, #6d0cff 10%, #8a2fff 25%, #b84aff 38%, #ec07f5 45%, #ff0aff 70%, #ff00ff 100%)'
              }}
            ></div>
            <div className="absolute inset-4 bg-white/30 backdrop-blur-xl rounded-full border border-white/50 shadow-2xl flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at 25% 50%, rgba(109, 12, 255, 0.7) 0%, rgba(109, 12, 255, 0.5) 15%, rgba(138, 47, 255, 0.6) 28%, rgba(184, 74, 255, 0.8) 40%, rgba(236, 7, 245, 0.95) 55%, rgba(255, 10, 255, 1) 80%, rgba(255, 0, 255, 1) 100%)'
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Shooting Stars - Over Glass, Under Land */}
        <ShootingStars />
        
        {/* Land - Middle Layer */}
        <div className="absolute inset-0 w-full h-full z-20">
          <img 
            src="/astronaut/land.png" 
            ref={imageRef}
            alt="Land" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        

      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Tagline */}
        <div className="flex items-center gap-4 mb-8">
           <div className="px-3 py-1 rounded-full border border-black text-xs font-bold uppercase tracking-widest bg-swiss-lime">
              the Human in the loop
           </div>
           <div className="h-px bg-white/100 flex-grow"></div>
           <div className="text-xs font-mono text-white">
              EST. 2025
           </div>
        </div>

        {/* Massive Typography */}
        <div className="relative">
           <h1 className="text-[12vw] leading-[0.85] font-display font-bold text-white tracking-tighter uppercase mb-6">
              Blas <br/>
              <span className="relative z-10">Moreno</span>
           </h1>
        </div>

        {/* Grid moved down significantly to clear abstract elements */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-48 items-end">
           <div className="md:col-span-7">
              <p className="text-2xl md:text-3xl font-light leading-tight text-white max-w-2xl">
                 An <span className="font-medium px-1 text-black" style={{ backgroundColor: '#d6fe51' }}>AI Engineer</span> and roboticist orchestrating the convergence of digital intelligence and physical systems.
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
              {/* First set of items */}
              {[...Array(3)].map((_, i) => (
                 <div key={`first-${i}`} className="flex items-center mx-8">
                    <span className="text-4xl font-display font-bold text-transparent text-outline uppercase">AI Architecture</span>
                    <Asterisk className="w-8 h-8 mx-6 text-swiss-lime" />
                    <span className="text-4xl font-display font-bold text-swiss-black uppercase">Software Engineering</span>
                    <Asterisk className="w-8 h-8 mx-6 text-swiss-blue" />
                    <span className="text-4xl font-display font-bold text-transparent text-outline uppercase">Robotics</span>
                    <Asterisk className="w-8 h-8 mx-6 text-swiss-lime" />
                    <span className="text-4xl font-display font-bold text-swiss-black uppercase">Android Development</span>
                    <Asterisk className="w-8 h-8 mx-6 text-swiss-blue" />
                    <span className="text-4xl font-display font-bold text-transparent text-outline uppercase">Computer Engineering</span>
                    <Asterisk className="w-8 h-8 mx-6 text-swiss-lime" />
                 </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[...Array(3)].map((_, i) => (
                 <div key={`second-${i}`} className="flex items-center mx-8">
                    <span className="text-4xl font-display font-bold text-transparent text-outline uppercase">AI Architecture</span>
                    <Asterisk className="w-8 h-8 mx-6 text-swiss-lime" />
                    <span className="text-4xl font-display font-bold text-swiss-black uppercase">Software Engineering</span>
                    <Asterisk className="w-8 h-8 mx-6 text-swiss-blue" />
                    <span className="text-4xl font-display font-bold text-transparent text-outline uppercase">Robotics</span>
                    <Asterisk className="w-8 h-8 mx-6 text-swiss-lime" />
                    <span className="text-4xl font-display font-bold text-swiss-black uppercase">Android Development</span>
                    <Asterisk className="w-8 h-8 mx-6 text-swiss-blue" />
                    <span className="text-4xl font-display font-bold text-transparent text-outline uppercase">Computer Engineering</span>
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