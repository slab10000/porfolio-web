import React from 'react';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`liquid-glass-card ${className}`}>
      <div className="liquid-glass-sheen" aria-hidden="true" />
      <div className="liquid-glass-glow" aria-hidden="true" />
      <div className="liquid-glass-content">{children}</div>
    </div>
  );
};

export default LiquidGlassCard;
