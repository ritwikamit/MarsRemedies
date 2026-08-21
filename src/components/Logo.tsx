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
  showTagline = true,
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

  // Sizing styles to ensure the full logo width & height are never clipped across mobile, tablet, and desktop
  const widthClasses = {
    sm: 'w-[135px] xs:w-[150px] sm:w-[175px]',
    md: 'w-[170px] xs:w-[200px] sm:w-[240px]',
    lg: 'w-[240px] xs:w-[280px] sm:w-[340px]',
    xl: 'w-[300px] xs:w-[380px] sm:w-[480px]',
    custom: 'w-auto',
  }[size];

  // Tagline color based on theme
  const taglineColor = isDarkSurface ? '#93c5fd' : '#002060';

  return (
    <div
      className={`inline-flex items-center justify-start shrink-0 select-none max-w-full ${widthClasses} ${className}`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Logo Image - uses logo.svg or logo.png from public folder */}
        <img
          src="/logo.svg"
          alt="Mars Remedies - Committed to serve better Healthcare"
          className="w-full h-auto block transition-opacity duration-200"
          onError={(e) => {
            // Fallback to PNG if SVG fails
            const target = e.target as HTMLImageElement;
            if (target.src.endsWith('.svg')) {
              target.src = '/logo.png';
            }
          }}
        />
        
        {/* Optional Tagline */}
        {showTagline && (
          <span
            className="hidden sm:inline-block text-sm sm:text-base font-bold italic leading-tight transition-colors duration-200 select-none"
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
