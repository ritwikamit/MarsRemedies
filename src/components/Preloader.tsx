import React from 'react';
import { Logo } from './Logo';

export const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-[#001233] via-[#002060] to-[#001233] preloader-exit">
      {/* Ambient glows */}
      <div className="absolute w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse-glow" />
      <div className="absolute w-56 h-56 rounded-full bg-red-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.4s' }} />

      {/* Logo card */}
      <div className="preloader-card relative rounded-2xl bg-white/95 backdrop-blur px-7 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-white/40">
        <Logo size="lg" variant="light" showTagline={false} />
      </div>

      {/* Brand line */}
      <div className="relative text-center space-y-1.5 -mt-2">
        <p className="text-[11px] sm:text-xs text-blue-200/70 italic tracking-wide">
          Committed to serve better Healthcare
        </p>
      </div>

      {/* Progress shimmer bar */}
      <div className="relative w-48 h-[3px] rounded-full bg-white/10 overflow-hidden">
        <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-red-400 to-transparent preloader-bar" />
      </div>
    </div>
  );
};

export default Preloader;
