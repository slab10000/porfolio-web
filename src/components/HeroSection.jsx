import { useState, useEffect, useRef } from 'react';
import AstronautPhoto from './AstronautPhoto';
import Planet from './Planet';
import Spaceship from './Spaceship';
import ScrollIndicator from './ScrollIndicator';
import '../App.css';

function HeroSection() {
  const [showSuit, setShowSuit] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const maxScroll = container.scrollHeight - container.clientHeight;
      const currentScroll = container.scrollTop;
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
      
      setScrollProgress(progress);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial calculation
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="hero-container" ref={containerRef}>
      <div className="hero-content" style={{ '--scroll-progress': scrollProgress }}>
        <AstronautPhoto 
          showSuit={showSuit} 
          setShowSuit={setShowSuit}
          scrollProgress={scrollProgress}
        />
        <Planet 
          size="large" 
          position="top-right" 
          planetNumber={1}
          scrollProgress={scrollProgress}
        />
        <Planet 
          size="large" 
          position="bottom-left" 
          planetNumber={2}
          scrollProgress={scrollProgress}
        >
          <Spaceship />
        </Planet>
        <ScrollIndicator scrollProgress={scrollProgress} />
      </div>
      {/* Scroll area to enable scrolling */}
      <div className="scroll-area" ref={scrollAreaRef}></div>
    </div>
  );
}

export default HeroSection;

