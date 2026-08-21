import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'auto',
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  // Try using ThemeContext safely if available
  let isGlobalDark = false;
  try {
    const themeContext = useTheme();
    isGlobalDark = themeContext.isDark;
  } catch {
    isGlobalDark = false;
  }

  const isDarkSurface = variant === 'dark' || (variant === 'auto' && isGlobalDark);

  // Size classes for the logo IMAGE only (not including tagline)
  const sizeClasses = {
    sm: 'h-8 xs:h-9 sm:h-10',
    md: 'h-10 xs:h-11 sm:h-12',
    lg: 'h-14 xs:h-16 sm:h-20',
    xl: 'h-18 xs:h-22 sm:h-28',
    custom: 'h-auto',
  }[size];

  // Tagline color based on theme
  const taglineColor = isDarkSurface ? '#93c5fd' : '#002060';

  return (
    <div
      className={`inline-flex items-center justify-start shrink-0 select-none ${className}`}
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Logo Image - uses logo.png from public folder */}
        <img
          src="/logo.png"
          alt="Mars Remedies"
          className={`${sizeClasses} w-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[280px] h-auto block transition-opacity duration-200 object-contain shrink-0`}
        />
        
        {/* Optional Tagline */}
        {showTagline && (
          <span
            className="hidden sm:inline-block text-sm sm:text-base font-bold italic leading-tight transition-colors duration-200 select-none whitespace-nowrap"
            style={{ color: taglineColor }}
          >
            Committed to serve better Healthcare
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
