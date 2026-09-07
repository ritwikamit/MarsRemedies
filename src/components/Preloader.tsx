import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onFinish?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Clean, fast minimalist reveal (850ms duration)
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        onFinish?.();
      }, 350);
    }, 850);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-slate-950 text-white transition-all duration-350 ease-out select-none ${
        isClosing ? 'opacity-0 scale-[0.98] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Minimalist Glowing Cross Emblem */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-14 h-14 rounded-full bg-red-600/25 blur-lg animate-pulse" />
          <svg viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-[0_0_10px_rgba(225,29,39,0.7)] relative z-10" fill="none">
            <rect x="9.5" y="3" width="5" height="18" rx="1.5" fill="#e11d27" />
            <rect x="3" y="9.5" width="18" height="5" rx="1.5" fill="#e11d27" />
          </svg>
        </div>

        {/* Minimalist Brand Typography */}
        <div className="text-center space-y-0.5">
          <h1 className="text-xs font-bold tracking-[0.25em] text-slate-100 uppercase">
            Mars Remedies
          </h1>
          <p className="text-[10px] text-slate-400 font-medium tracking-wider">
            WHO-GMP Formulations
          </p>
        </div>

        {/* Minimalist Slim 2px Shimmer Bar */}
        <div className="w-28 h-[2px] rounded-full bg-slate-800 overflow-hidden relative mt-1">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent animate-[preloader-slide_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
