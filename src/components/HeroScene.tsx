import { motion } from 'framer-motion';

interface HeroSceneProps {
  scrollProgress: number;
}

export const HeroScene = ({ scrollProgress }: HeroSceneProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Planet 1 (Top Right) */}
      <motion.div
        className="absolute rounded-full bg-red-400"
        initial={{ top: '-10%', right: '-10%', width: 400, height: 400 }}
        animate={{
          top: scrollProgress > 0.1 ? '50%' : '-10%',
          right: scrollProgress > 0.1 ? '50%' : '-10%',
          x: scrollProgress > 0.1 ? '50%' : '0%',
          y: scrollProgress > 0.1 ? '-50%' : '0%',
          scale: scrollProgress > 0.1 ? 0.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 40 }}
      />

      {/* Planet 2 (Bottom Left) */}
      <motion.div
        className="absolute rounded-full bg-teal-400"
        initial={{ bottom: '-10%', left: '-10%', width: 500, height: 500 }}
        animate={{
          bottom: scrollProgress > 0.1 ? '50%' : '-10%',
          left: scrollProgress > 0.1 ? '50%' : '-10%',
          x: scrollProgress > 0.1 ? '-50%' : '0%',
          y: scrollProgress > 0.1 ? '50%' : '0%',
          scale: scrollProgress > 0.1 ? 0.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 40 }}
      >
        {/* Spaceship Orbiting (Placeholder) */}
        <motion.div
          className="absolute w-12 h-12 bg-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ top: -40, left: '50%', originX: 0.5, originY: 6 }} 
        />
      </motion.div>
    </div>
  );
};
