import React, { useMemo, useState, useEffect, useCallback } from 'react';

interface StarProps {
  color: string;
  top: string;
  right: string;
  delay: string;
  duration: string;
  onFinished?: () => void;
}

const Star: React.FC<StarProps> = ({ color, top, right, delay, duration, onFinished }) => {
  useEffect(() => {
    if (onFinished) {
      const delayMs = parseFloat(delay) * 1000;
      const durationMs = parseFloat(duration) * 1000;
      const timer = setTimeout(onFinished, delayMs + durationMs);
      return () => clearTimeout(timer);
    }
  }, [delay, duration, onFinished]);

  return (
    <span
      className="shooting-star"
      style={{
        color: color,
        top: top,
        right: right,
        left: 'initial',
        animationDelay: delay,
        animationDuration: duration,
      }}
    />
  );
};

const neonColors = [
  '#00f3ff', // Cyan
  '#ff00ff', // Pink
  '#d6fe51', // Lime
  '#bc13fe', // Purple
  '#ffae00', // Orange
  '#00ff9f', // Spring Green
  '#ff003c', // Electric Red
];

const ShootingStars: React.FC = () => {
  // Interactive stars from clicks
  const [interactiveStars, setInteractiveStars] = useState<{
    id: number;
    color: string;
    top: string;
    right: string;
    delay: string;
    duration: string;
  }[]>([]);

  const removeStar = (id: number) => {
    setInteractiveStars(prev => prev.filter(s => s.id !== id));
  };

  useEffect(() => {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      const color = neonColors[Math.floor(Math.random() * neonColors.length)];
      
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const top = `${(y / rect.height) * 100}%`;
      const right = `${((rect.width - x) / rect.width) * 100}%`;

      const newStar = {
        id,
        color,
        top,
        right,
        delay: '0s',
        duration: '2s',
      };

      setInteractiveStars(prev => [...prev, newStar]);
    };

    heroSection.addEventListener('click', handleClick);
    return () => heroSection.removeEventListener('click', handleClick);
  }, []);

  // Base background stars (reduced ratio)
  const baseStars = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      // Always start from top
      const top = `${-20 - Math.random() * 20}%`; 
      const right = `${-10 + Math.random() * 120}%`; // From -10% to 110% to cover full width

      return {
        id: `base-${i}`,
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
        top,
        right,
        delay: `${Math.random() * 10}s`, // Slightly faster frequency
        duration: `${2 + Math.random() * 3}s`,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-[15]">
      {/* Background stars */}
      {baseStars.map((star) => (
        <Star
          key={star.id}
          color={star.color}
          top={star.top}
          right={star.right}
          delay={star.delay}
          duration={star.duration}
        />
      ))}
      
      {/* Interactive stars */}
      {interactiveStars.map((star) => (
        <Star
          key={star.id}
          color={star.color}
          top={star.top}
          right={star.right}
          delay={star.delay}
          duration={star.duration}
          onFinished={() => removeStar(star.id)}
        />
      ))}
    </div>
  );
};

export default ShootingStars;
