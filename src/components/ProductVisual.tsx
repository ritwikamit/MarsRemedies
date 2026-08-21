import React from 'react';
import { ProductCategory } from '../types';

interface ProductVisualProps {
  category: ProductCategory;
  brandName?: string;
  dosageForm?: string;
  packSize?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  category,
  brandName = 'Mars Formulation',
  dosageForm = 'Tablet',
  packSize = '10x10',
  size = 'md',
  className = '',
}) => {
  // Height classes per size
  const heightClasses = {
    sm: 'h-24 sm:h-28',
    md: 'h-36 sm:h-40',
    lg: 'h-52 sm:h-60',
    hero: 'h-64 sm:h-72',
  }[size];

  // Specific color themes per category
  const getTheme = () => {
    switch (category) {
      case 'Tablets':
        return {
          primary: '#2563eb', // Blue
          secondary: '#38bdf8',
          accent: '#1d4ed8',
          badgeBg: 'bg-blue-100 dark:bg-blue-900/60',
          badgeText: 'text-blue-700 dark:text-blue-300',
          gradient: 'from-blue-500/10 via-indigo-500/5 to-slate-100 dark:from-blue-900/30 dark:via-slate-900/40 dark:to-slate-900',
        };
      case 'Capsules & Softgel':
        return {
          primary: '#059669', // Emerald
          secondary: '#34d399',
          accent: '#047857',
          badgeBg: 'bg-emerald-100 dark:bg-emerald-900/60',
          badgeText: 'text-emerald-700 dark:text-emerald-300',
          gradient: 'from-emerald-500/10 via-teal-500/5 to-slate-100 dark:from-emerald-900/30 dark:via-slate-900/40 dark:to-slate-900',
        };
      case 'Syrups':
        return {
          primary: '#d97706', // Amber
          secondary: '#fbbf24',
          accent: '#b45309',
          badgeBg: 'bg-amber-100 dark:bg-amber-900/60',
          badgeText: 'text-amber-800 dark:text-amber-300',
          gradient: 'from-amber-500/10 via-orange-500/5 to-slate-100 dark:from-amber-900/30 dark:via-slate-900/40 dark:to-slate-900',
        };
      case 'Injections':
        return {
          primary: '#dc2626', // Red
          secondary: '#f87171',
          accent: '#b91c1c',
          badgeBg: 'bg-red-100 dark:bg-red-900/60',
          badgeText: 'text-red-700 dark:text-red-300',
          gradient: 'from-red-500/10 via-rose-500/5 to-slate-100 dark:from-red-900/30 dark:via-slate-900/40 dark:to-slate-900',
        };
      case 'Drops / Powder / Sachet':
        return {
          primary: '#0891b2', // Cyan
          secondary: '#22d3ee',
          accent: '#0e7490',
          badgeBg: 'bg-cyan-100 dark:bg-cyan-900/60',
          badgeText: 'text-cyan-700 dark:text-cyan-300',
          gradient: 'from-cyan-500/10 via-sky-500/5 to-slate-100 dark:from-cyan-900/30 dark:via-slate-900/40 dark:to-slate-900',
        };
      case 'Cream / Lotion / Soap':
        return {
          primary: '#7c3aed', // Purple
          secondary: '#a78bfa',
          accent: '#6d28d9',
          badgeBg: 'bg-purple-100 dark:bg-purple-900/60',
          badgeText: 'text-purple-700 dark:text-purple-300',
          gradient: 'from-purple-500/10 via-fuchsia-500/5 to-slate-100 dark:from-purple-900/30 dark:via-slate-900/40 dark:to-slate-900',
        };
      case 'Eye & Ear Drops':
        return {
          primary: '#0d9488', // Teal
          secondary: '#2dd4bf',
          accent: '#0f766e',
          badgeBg: 'bg-teal-100 dark:bg-teal-900/60',
          badgeText: 'text-teal-700 dark:text-teal-300',
          gradient: 'from-teal-500/10 via-emerald-500/5 to-slate-100 dark:from-teal-900/30 dark:via-slate-900/40 dark:to-slate-900',
        };
      case 'Oil':
      default:
        return {
          primary: '#ea580c', // Orange
          secondary: '#fb923c',
          accent: '#c2410c',
          badgeBg: 'bg-orange-100 dark:bg-orange-900/60',
          badgeText: 'text-orange-700 dark:text-orange-300',
          gradient: 'from-orange-500/10 via-amber-500/5 to-slate-100 dark:from-orange-900/30 dark:via-slate-900/40 dark:to-slate-900',
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      className={`relative w-full ${heightClasses} rounded-xl overflow-hidden bg-gradient-to-br ${theme.gradient} border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center p-3 group-hover:shadow-inner transition-all select-none ${className}`}
    >
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-pharma-grid opacity-40 dark:opacity-20 pointer-events-none" />

      {/* Category Specific 3D-styled SVG Pharmaceutical Visual */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* 1. TABLETS: Blister foil pack & coated tablets */}
        {category === 'Tablets' && (
          <svg viewBox="0 0 240 140" className="max-h-full max-w-full drop-shadow-md">
            {/* Blister Card Background */}
            <rect x="25" y="15" width="190" height="110" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
            <rect x="28" y="18" width="184" height="104" rx="8" fill="#f8fafc" />
            {/* Aluminum Foil Gridlines */}
            <line x1="28" y1="70" x2="212" y2="70" stroke="#cbd5e1" strokeDasharray="3 2" />
            <line x1="74" y1="18" x2="74" y2="122" stroke="#cbd5e1" strokeDasharray="3 2" />
            <line x1="120" y1="18" x2="120" y2="122" stroke="#cbd5e1" strokeDasharray="3 2" />
            <line x1="166" y1="18" x2="166" y2="122" stroke="#cbd5e1" strokeDasharray="3 2" />

            {/* Tablets in Blisters (10 Cavities) */}
            {[
              { cx: 51, cy: 44 }, { cx: 97, cy: 44 }, { cx: 143, cy: 44 }, { cx: 189, cy: 44 },
              { cx: 51, cy: 96 }, { cx: 97, cy: 96 }, { cx: 143, cy: 96 }, { cx: 189, cy: 96 },
            ].map((pos, i) => (
              <g key={i}>
                <circle cx={pos.cx} cy={pos.cy} r="16" fill="#cbd5e1" opacity="0.6" />
                <circle cx={pos.cx} cy={pos.cy} r="14" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.5" />
                <circle cx={pos.cx - 2} cy={pos.cy - 2} r="11" fill="url(#tab-grad)" />
                {/* Break line on tablet */}
                <line x1={pos.cx - 8} y1={pos.cy} x2={pos.cx + 8} y2={pos.cy} stroke="#93c5fd" strokeWidth="1" />
              </g>
            ))}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="tab-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#dbeafe" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* 2. CAPSULES & SOFTGELS */}
        {category === 'Capsules & Softgel' && (
          <svg viewBox="0 0 240 140" className="max-h-full max-w-full drop-shadow-md">
            {/* Blister backing */}
            <rect x="25" y="15" width="190" height="110" rx="10" fill="#f1f5f9" stroke="#6ee7b7" strokeWidth="1.5" />
            
            {/* Hard Gelatin Capsules (Dual-colored) */}
            <g transform="translate(45, 30) rotate(-15)">
              <rect x="0" y="0" width="22" height="30" rx="11" fill="#059669" />
              <rect x="0" y="24" width="22" height="30" rx="11" fill="#ffffff" stroke="#d1d5db" strokeWidth="0.5" />
              <ellipse cx="11" cy="24" rx="11" ry="3" fill="#047857" opacity="0.4" />
            </g>

            <g transform="translate(105, 35) rotate(20)">
              <rect x="0" y="0" width="22" height="30" rx="11" fill="#2563eb" />
              <rect x="0" y="24" width="22" height="30" rx="11" fill="#fbbf24" />
            </g>

            {/* Softgel Golden Capsules */}
            <ellipse cx="170" cy="55" rx="18" ry="12" fill="url(#softgel-gold)" stroke="#f59e0b" strokeWidth="1" transform="rotate(-25 170 55)" />
            <ellipse cx="150" cy="95" rx="20" ry="13" fill="url(#softgel-gold)" stroke="#f59e0b" strokeWidth="1" transform="rotate(15 150 95)" />
            
            <g transform="translate(65, 80) rotate(-10)">
              <rect x="0" y="0" width="22" height="28" rx="11" fill="#dc2626" />
              <rect x="0" y="22" width="28" height="26" rx="11" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5" />
            </g>

            <defs>
              <linearGradient id="softgel-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* 3. SYRUPS & SUSPENSIONS: Amber Glass Bottle with Measuring Cap */}
        {category === 'Syrups' && (
          <svg viewBox="0 0 240 140" className="max-h-full max-w-full drop-shadow-md">
            {/* Amber Medicine Bottle */}
            <g transform="translate(90, 10)">
              {/* Measuring Cup on top */}
              <path d="M 18,5 L 42,5 L 38,20 L 22,20 Z" fill="#e2e8f0" opacity="0.85" stroke="#94a3b8" strokeWidth="1" />
              <line x1="24" y1="10" x2="32" y2="10" stroke="#64748b" strokeWidth="0.75" />
              <line x1="23" y1="15" x2="34" y2="15" stroke="#64748b" strokeWidth="0.75" />

              {/* Cap */}
              <rect x="20" y="20" width="20" height="12" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              {/* Bottle Neck */}
              <rect x="23" y="32" width="14" height="10" fill="#92400e" />
              
              {/* Bottle Body */}
              <rect x="8" y="42" width="44" height="78" rx="8" fill="url(#amber-glass)" stroke="#78350f" strokeWidth="1.5" />
              {/* Liquid Level */}
              <rect x="10" y="60" width="40" height="58" rx="6" fill="#b45309" opacity="0.65" />
              
              {/* Label */}
              <rect x="12" y="65" width="36" height="42" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
              <rect x="15" y="70" width="30" height="4" rx="1" fill="#002060" />
              <rect x="15" y="77" width="22" height="2" rx="0.5" fill="#dc2626" />
              <rect x="15" y="82" width="26" height="2" rx="0.5" fill="#94a3b8" />
              <rect x="15" y="86" width="18" height="2" rx="0.5" fill="#94a3b8" />
              <rect x="15" y="96" width="14" height="5" rx="1" fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.5" />
            </g>

            {/* Spoon with drop */}
            <g transform="translate(145, 75)">
              <ellipse cx="25" cy="20" rx="18" ry="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
              <ellipse cx="25" cy="20" rx="14" ry="7" fill="#f59e0b" opacity="0.8" />
              <path d="M 40,20 Q 65,22 75,30" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>

            <defs>
              <linearGradient id="amber-glass" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="40%" stopColor="#b45309" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* 4. INJECTIONS: Sterile Glass Vial & Ampoule */}
        {category === 'Injections' && (
          <svg viewBox="0 0 240 140" className="max-h-full max-w-full drop-shadow-md">
            {/* Sterile Vial */}
            <g transform="translate(60, 20)">
              {/* Flip-off Cap */}
              <rect x="15" y="0" width="26" height="8" rx="2" fill="#dc2626" />
              {/* Aluminum Seal */}
              <rect x="18" y="8" width="20" height="8" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
              {/* Rubber Stopper inside */}
              <rect x="22" y="10" width="12" height="5" fill="#475569" />
              {/* Vial Neck */}
              <rect x="20" y="16" width="16" height="8" fill="#e2e8f0" opacity="0.6" />
              {/* Glass Body */}
              <rect x="8" y="24" width="40" height="76" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Liquid inside */}
              <rect x="10" y="45" width="36" height="53" rx="4" fill="#fee2e2" opacity="0.75" />
              {/* Label */}
              <rect x="10" y="38" width="36" height="38" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
              <rect x="13" y="44" width="30" height="3" fill="#dc2626" />
              <rect x="13" y="50" width="20" height="2" fill="#002060" />
              <rect x="13" y="55" width="24" height="2" fill="#64748b" />
            </g>

            {/* Glass Ampoule */}
            <g transform="translate(135, 15)">
              {/* Ampoule Tip */}
              <path d="M 16,0 L 22,0 L 20,18 L 18,18 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
              {/* Constriction / Score ring (blue band) */}
              <rect x="16" y="18" width="6" height="4" fill="#2563eb" />
              {/* Ampoule Body */}
              <path d="M 17,22 L 21,22 L 30,35 L 30,100 L 8,100 L 8,35 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Liquid inside */}
              <path d="M 10,55 L 28,55 L 28,98 L 10,98 Z" fill="#dbeafe" opacity="0.8" />
              <line x1="10" y1="65" x2="28" y2="65" stroke="#93c5fd" strokeWidth="0.75" />
            </g>
          </svg>
        )}

        {/* 5. DROPS / POWDER / SACHET */}
        {category === 'Drops / Powder / Sachet' && (
          <svg viewBox="0 0 240 140" className="max-h-full max-w-full drop-shadow-md">
            {/* Paediatric Dropper Bottle */}
            <g transform="translate(50, 15)">
              {/* Rubber teat */}
              <ellipse cx="22" cy="8" rx="8" ry="8" fill="#0284c7" />
              {/* Collar */}
              <rect x="14" y="14" width="16" height="8" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              {/* Bottle Body */}
              <rect x="8" y="22" width="28" height="60" rx="6" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
              <rect x="10" y="42" width="24" height="38" rx="4" fill="#bae6fd" opacity="0.7" />
              {/* Label */}
              <rect x="10" y="32" width="24" height="26" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
              <rect x="12" y="36" width="20" height="3" fill="#002060" />
            </g>

            {/* Sachet Packet */}
            <g transform="translate(110, 20) rotate(5)">
              <rect x="0" y="0" width="75" height="90" rx="4" fill="#f8fafc" stroke="#0891b2" strokeWidth="1.5" />
              {/* Tear notch */}
              <polygon points="0,15 5,18 0,21" fill="#0891b2" />
              {/* Sachet Graphics */}
              <rect x="6" y="6" width="63" height="14" fill="#0891b2" rx="2" />
              <text x="12" y="17" fontSize="8" fill="#ffffff" fontWeight="bold">{brandName.slice(0, 11).toUpperCase()}</text>
              <rect x="8" y="28" width="55" height="3" fill="#002060" rx="1" />
              <rect x="8" y="35" width="42" height="2" fill="#64748b" rx="0.5" />
              <rect x="8" y="40" width="48" height="2" fill="#64748b" rx="0.5" />
              {/* Single Dose Seal icon */}
              <circle cx="55" cy="65" r="12" fill="#ecfeff" stroke="#06b6d4" strokeWidth="1" />
              <text x="47" y="68" fontSize="7" fill="#0891b2" fontWeight="bold">100%</text>
            </g>
          </svg>
        )}

        {/* 6. CREAM / LOTION / SOAP */}
        {category === 'Cream / Lotion / Soap' && (
          <svg viewBox="0 0 240 140" className="max-h-full max-w-full drop-shadow-md">
            {/* Ointment Tube */}
            <g transform="translate(40, 45) rotate(-20)">
              {/* Cap */}
              <rect x="0" y="8" width="14" height="16" rx="2" fill="#7c3aed" stroke="#6d28d9" strokeWidth="1" />
              {/* Nozzle */}
              <polygon points="14,10 24,14 24,18 14,22" fill="#e2e8f0" />
              {/* Tube Body */}
              <path d="M 24,8 L 105,2 L 105,30 L 24,24 Z" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
              {/* Crimped End */}
              <rect x="105" y="2" width="8" height="28" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1" />
              {/* Branding Strip */}
              <polygon points="35,10 95,5 95,27 35,22" fill="#7c3aed" />
              <text x="42" y="19" fontSize="8" fill="#ffffff" fontWeight="bold">{brandName.slice(0, 10).toUpperCase()}</text>
            </g>

            {/* Medicated Soap Bar */}
            <g transform="translate(130, 60)">
              <rect x="0" y="0" width="70" height="42" rx="10" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1.5" />
              <ellipse cx="35" cy="21" rx="26" ry="12" fill="#fae8ff" stroke="#e879f9" strokeWidth="1" />
              <text x="18" y="24" fontSize="8" fill="#86198f" fontWeight="bold">{brandName.slice(0, 10).toUpperCase()}</text>
            </g>
          </svg>
        )}

        {/* 7. EYE & EAR DROPS */}
        {category === 'Eye & Ear Drops' && (
          <svg viewBox="0 0 240 140" className="max-h-full max-w-full drop-shadow-md">
            <g transform="translate(95, 10)">
              {/* Precision Nozzle Cap */}
              <polygon points="20,0 28,0 26,18 22,18" fill="#0d9488" />
              {/* Tamper Evident Ring */}
              <rect x="16" y="18" width="16" height="6" fill="#14b8a6" rx="1" />
              {/* Screw Cap */}
              <rect x="14" y="24" width="20" height="14" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              
              {/* Sterile Plastic Bottle */}
              <rect x="8" y="38" width="32" height="62" rx="8" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1.5" />
              {/* Liquid Level */}
              <rect x="10" y="55" width="28" height="43" rx="6" fill="#ccfbf1" opacity="0.8" />
              
              {/* Label */}
              <rect x="10" y="48" width="28" height="34" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
              <rect x="12" y="53" width="24" height="3" fill="#0d9488" />
              <rect x="12" y="58" width="16" height="2" fill="#002060" />
              <circle cx="24" cy="72" r="5" fill="#e6fffa" stroke="#0d9488" strokeWidth="0.75" />
            </g>

            {/* Droplet Animation */}
            <circle cx="150" cy="55" r="4" fill="#2dd4bf" opacity="0.8" />
            <circle cx="160" cy="80" r="6" fill="#0d9488" opacity="0.6" />
          </svg>
        )}

        {/* 8. THERAPEUTIC OIL */}
        {category === 'Oil' && (
          <svg viewBox="0 0 240 140" className="max-h-full max-w-full drop-shadow-md">
            <g transform="translate(95, 10)">
              {/* Wooden / Brass Cap */}
              <rect x="16" y="4" width="20" height="16" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="1" />
              {/* Neck */}
              <rect x="21" y="20" width="10" height="8" fill="#d97706" />
              {/* Amber Apothecary Bottle */}
              <rect x="8" y="28" width="36" height="78" rx="8" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
              {/* Golden Herbal Oil */}
              <rect x="10" y="44" width="32" height="60" rx="6" fill="#f59e0b" opacity="0.85" />
              {/* Label */}
              <rect x="10" y="48" width="32" height="42" fill="#fffbeb" stroke="#fde68a" strokeWidth="0.5" />
              <rect x="13" y="54" width="26" height="3" fill="#9a3412" />
              <rect x="13" y="60" width="20" height="2" fill="#002060" />
              {/* Leaf symbol */}
              <path d="M 26,72 Q 32,68 34,75 Q 28,78 26,72 Z" fill="#15803d" />
            </g>
          </svg>
        )}
      </div>

      {/* Brand Name Nameplate - written on the pack */}
      <div className="absolute top-2.5 left-2.5 z-20 max-w-[60%]">
        <div className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/70 dark:border-slate-700 shadow-sm">
          <span className="block text-[11px] sm:text-xs font-extrabold tracking-wide text-[#002060] dark:text-blue-300 truncate uppercase">
            {brandName}
          </span>
        </div>
      </div>

      {/* Floating Badges for Pack Size & Quality */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 z-20">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText} shadow-2xs backdrop-blur-xs`}>
          {packSize}
        </span>
      </div>

      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 z-20">
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-2xs border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          {dosageForm}
        </span>
      </div>
    </div>
  );
};

export default ProductVisual;
