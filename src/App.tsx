import { useState, useEffect } from 'react';
import { Profile } from './components/Profile';
import { HeroScene } from './components/HeroScene';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? currentScroll / totalScroll : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-[200vh]">
      <HeroScene scrollProgress={scrollProgress} />
      <Profile scrollProgress={scrollProgress} />
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
        Scroll to start ↓
      </div>

      {/* Content section to allow scrolling */}
      <div className="absolute top-[100vh] w-full p-10">
        <h2 className="text-4xl font-bold mb-4">Portfolio Content</h2>
        <p className="text-lg text-gray-300">
          This is where the main content will go after the initial scroll interaction.
        </p>
      </div>
    </div>
  );
}

export default App;
