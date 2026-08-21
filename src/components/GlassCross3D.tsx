import React from 'react';

interface GlassCross3DProps {
  size?: number;
  variant?: 'solid' | 'ghost';
  className?: string;
}

const DEPTH_LAYERS = [0, -5, -10, -15, -20];

export const GlassCross3D: React.FC<GlassCross3DProps> = ({
  size = 160,
  variant = 'solid',
  className = '',
}) => {
  const barW = size * 0.3;
  const barL = size * 0.94;
  const radius = size * 0.075;

  const renderBarPair = (z: number, layerIndex: number) => {
    const isFront = layerIndex === DEPTH_LAYERS.length - 1;
    // Back layers are darker & more opaque to fake extruded sides
    const darkness = isFront ? 0 : (DEPTH_LAYERS.length - 1 - layerIndex) * 0.16;

    const barStyle: React.CSSProperties = {
      position: 'absolute',
      borderRadius: radius,
      transform: `translateZ(${z}px)`,
      background: isFront
        ? 'linear-gradient(135deg, rgba(254,202,202,0.92) 0%, rgba(239,68,68,0.82) 42%, rgba(153,27,27,0.9) 100%)'
        : `linear-gradient(135deg, rgba(127,29,29,${0.75 + darkness}) 0%, rgba(90,10,10,${0.8 + darkness}) 100%)`,
      border: isFront ? '1.5px solid rgba(255,255,255,0.55)' : '1px solid rgba(255,255,255,0.12)',
    };

    if (isFront) {
      barStyle.backdropFilter = 'blur(5px)';
      (barStyle as Record<string, unknown>).WebkitBackdropFilter = 'blur(5px)';
      barStyle.boxShadow =
        'inset 0 0 20px rgba(255,255,255,0.4), inset -6px -8px 18px rgba(110,0,0,0.3), 0 22px 48px rgba(225,29,39,0.32)';
    }

    return (
      <React.Fragment key={layerIndex}>
        <div className={isFront ? 'glass-bar' : ''} style={{ ...barStyle, width: barW, height: barL, left: (size - barW) / 2, top: (size - barL) / 2 }} />
        <div className={isFront ? 'glass-bar' : ''} style={{ ...barStyle, width: barL, height: barW, left: (size - barL) / 2, top: (size - barW) / 2 }} />
      </React.Fragment>
    );
  };

  return (
    <div
      className={`cross-scene select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className={`cross-float ${variant === 'ghost' ? 'opacity-20 blur-[2px]' : ''}`}>
        <div className="cross-tilt" style={{ width: size, height: size }}>
          <div className="cross-spin relative" style={{ width: size, height: size }}>
            {DEPTH_LAYERS.map((z, i) => renderBarPair(z, i))}
            {/* Front gloss highlight */}
            <div
              style={{
                position: 'absolute',
                left: (size - barW) / 2,
                top: (size - barW) / 2,
                width: barW,
                height: barW,
                borderRadius: radius,
                transform: 'translateZ(2px)',
                background:
                  'radial-gradient(circle at 30% 24%, rgba(255,255,255,0.75), rgba(255,255,255,0) 60%)',
              }}
            />
          </div>
        </div>
        {/* Ground glow */}
        <div className="cross-glow" />
      </div>
    </div>
  );
};

export default GlassCross3D;
