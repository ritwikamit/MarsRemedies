import React from 'react';
import { GlassCross3D } from './GlassCross3D';

export const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#001233] via-[#002060] to-[#001233] preloader-exit">
      {/* Ambient glow */}
      <div className="absolute w-72 h-72 rounded-full bg-red-500/15 blur-3xl animate-pulse-glow" />

      <GlassCross3D size={96} />

      <div className="relative text-center space-y-2">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide text-white">
          MARS <span className="text-red-400">REMEDIES</span>
        </h1>
        <p className="text-[11px] sm:text-xs text-blue-200/80 italic">
          Committed to serve better Healthcare
        </p>
      </div>

      {/* Loading dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-blue-300 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      {/* Progress shimmer bar */}
      <div className="w-44 h-1 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-red-400 to-transparent preloader-bar" />
      </div>
    </div>
  );
};

export default Preloader;
