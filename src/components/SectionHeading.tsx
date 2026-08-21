import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <div className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#e11d27]/70" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            {badge}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#002060]/60 dark:to-blue-400/60" />
        </div>
      )}

      <h2 className="relative inline-block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
        {title}
        <span
          className={`absolute -bottom-2.5 h-[3px] rounded-full bg-gradient-to-r from-[#e11d27] via-[#e11d27]/60 to-[#002060]/40 dark:from-red-500 dark:via-blue-500/60 dark:to-blue-400/30 ${
            isCenter ? 'left-1/2 -translate-x-1/2 w-24' : 'left-0 w-16'
          }`}
        />
      </h2>

      {subtitle && (
        <p className={`mt-5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
