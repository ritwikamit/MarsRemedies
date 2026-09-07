import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

interface PreloaderProps {
  onFinish?: () => void;
}

const PHASES = [
  { at: 0, text: 'Initializing Pharma Precision Engine...' },
  { at: 35, text: 'Verifying WHO-GMP Batch Formulations...' },
  { at: 70, text: 'Loading 110+ High-Bioavailability Therapeutics...' },
  { at: 92, text: 'Welcome to Mars Remedies' },
];

export const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState(PHASES[0].text);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1600; // 1.6s smooth duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      // Update phase text
      for (let i = PHASES.length - 1; i >= 0; i--) {
        if (pct >= PHASES[i].at) {
          setPhaseText(PHASES[i].text);
          break;
        }
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsClosing(true);
          setTimeout(() => {
            onFinish?.();
          }, 450);
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#020817] text-white transition-all duration-500 ease-out select-none ${
        isClosing ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-live="polite"
      aria-busy="true"
    >
      {/* Background Animated Atmosphere */}
      <div className="absolute inset-0 bg-pharma-grid opacity-20 pointer-events-none" />
      
      {/* Dynamic Ambient Glow Spheres */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-blue-600/15 blur-[100px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-red-600/15 blur-[100px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Center Medical Orbital Emblem */}
      <div className="relative mb-6 flex items-center justify-center">
        {/* Concentric Rotating Tech Rings */}
        <div className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-blue-500/20 border-dashed animate-spin" style={{ animationDuration: '16s' }} />
        <div className="absolute w-44 h-44 sm:w-48 sm:h-48 rounded-full border border-cyan-400/15 border-t-transparent border-b-transparent animate-spin" style={{ animationDuration: '9s', animationDirection: 'reverse' }} />
        <div className="absolute w-28 h-28 rounded-full bg-blue-600/20 blur-xl animate-pulse-glow" />

        {/* 3D Illuminated Glass Core Card */}
        <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-white/10 backdrop-blur-xl border border-white/25 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center transform transition-transform group">
          {/* Medical Red Cross with Inner Light */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-11 h-11 drop-shadow-[0_0_16px_rgba(225,29,39,0.85)] animate-pulse" fill="none">
              <rect x="9" y="2" width="6" height="20" rx="2" fill="#e11d27" />
              <rect x="2" y="9" width="20" height="6" rx="2" fill="#e11d27" />
              {/* Highlight Glint */}
              <rect x="10.5" y="4" width="1.5" height="16" rx="0.75" fill="#ffffff" opacity="0.6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Brand Identification */}
      <div className="relative z-10 text-center space-y-2 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>WHO-GMP Certified Formulations</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200">
          MARS REMEDIES
        </h2>

        <p className="text-xs sm:text-sm text-blue-200/70 italic font-medium tracking-wide">
          Committed to serve better Healthcare
        </p>
      </div>

      {/* Progress Shimmer Bar & Counter */}
      <div className="relative z-10 mt-8 w-64 sm:w-72 flex flex-col items-center gap-3">
        {/* Bar Track */}
        <div className="w-full h-1.5 rounded-full bg-slate-800/90 border border-slate-700/60 overflow-hidden relative shadow-inner">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-[#e11d27] transition-all duration-100 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Leading Glow */}
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white blur-xs" />
          </div>
        </div>

        {/* Counter and Phase Text */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="text-blue-300/90 truncate max-w-[190px]">
            {phaseText}
          </span>
          <span className="font-bold text-white tabular-nums tracking-wider">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
