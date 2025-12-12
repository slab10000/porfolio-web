import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProfileProps {
  scrollProgress: number;
}

export const Profile = ({ scrollProgress }: ProfileProps) => {
  const [showSpaceSuit, setShowSpaceSuit] = useState(false);

  // Animation variants based on scroll progress would be handled by parent or context usually,
  // but for simplicity we can pass scrollProgress and calculate styles, or use motion values.
  // For this step, we'll setup the structure and basic interaction.
  
  return (
    <motion.div 
      className="fixed z-20 flex flex-col items-center"
      style={{
        // Placeholder for scroll-based positioning logic
        // We will refine this with actual scroll hooks in the next step
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
      }}
      animate={{
        top: scrollProgress > 0.1 ? '10%' : '50%',
        left: scrollProgress > 0.1 ? '10%' : '50%',
        x: scrollProgress > 0.1 ? '0%' : '-50%',
        y: scrollProgress > 0.1 ? '0%' : '-50%',
        flexDirection: scrollProgress > 0.1 ? 'row' : 'col',
        gap: scrollProgress > 0.1 ? '1rem' : '1.5rem',
      }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <motion.div
        className="relative w-48 h-48 rounded-full overflow-hidden cursor-pointer border-4 border-white/20 hover:border-white/50 transition-colors"
        onClick={() => setShowSpaceSuit(!showSpaceSuit)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        layout
      >
        {/* Placeholder for Image */}
        <div className={`w-full h-full ${showSpaceSuit ? 'bg-indigo-500' : 'bg-gray-500'} flex items-center justify-center`}>
          <span className="text-center p-2">
            {showSpaceSuit ? 'Space Suit' : 'Photo'}
          </span>
        </div>
      </motion.div>

      <motion.h1 
        className="text-2xl font-bold whitespace-nowrap"
        layout
      >
        Blas Moreno Laguna
      </motion.h1>
    </motion.div>
  );
};
