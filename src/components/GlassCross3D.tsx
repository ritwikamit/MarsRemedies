import React from 'react';

interface GlassCross3DProps {
  size?: number;
  variant?: 'solid' | 'ghost';
  className?: string;
}

export const GlassCross3D: React.FC<GlassCross3DProps> = ({
  size = 160,
  variant = 'solid',
  className = '',
}) => {
  const barW = size * 0.3;
  const barL = size * 0.94;
  const radius = size * 0.075;

  const barBase: React.CSSProperties = {
    position: 'absolute',
    borderRadius: radius,
    background:
      'linear-gradient(135deg, rgba(252,165,165,0.95) 0%, rgba(239,68,68,0.8) 40%, rgba(185,28,28,0.9) 100%)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    border: '1.5px solid rgba(255,255,255,0.5)',
    boxShadow:
      'inset 0 0 18px rgba(255,255,255,0.35), inset -6px -8px 16px rgba(120,0,0,0.28), 0 18px 42px rgba(225,29,39,0.35)',
  };

  return (
    <div
      className={`cross-scene select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className={`cross-float ${variant === 'ghost' ? 'opacity-20 blur-[2px]' : ''}`}>
        <div className="cross-spin relative" style={{ width: size, height: size }}>
          {/* Vertical bar */}
          <div
            className="glass-bar"
            style={{
              ...barBase,
              width: barW,
              height: barL,
              left: (size - barW) / 2,
              top: (size - barL) / 2,
            }}
          />
          {/* Horizontal bar */}
          <div
            className="glass-bar"
            style={{
              ...barBase,
              width: barL,
              height: barW,
              left: (size - barL) / 2,
              top: (size - barW) / 2,
            }}
          />
          {/* Center gloss highlight */}
          <div
            style={{
              position: 'absolute',
              left: (size - barW) / 2,
              top: (size - barW) / 2,
              width: barW,
              height: barW,
              borderRadius: radius,
              background:
                'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.7), rgba(255,255,255,0) 62%)',
            }}
          />
        </div>
        {/* Ground glow */}
        <div className="cross-glow" />
      </div>
    </div>
  );
};

export default GlassCross3D;
