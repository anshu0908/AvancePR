import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  theme?: 'dark' | 'light';
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  theme = 'dark',
  align = 'left',
  className = ''
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-brand-gold">
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className={`text-[32px] sm:text-[42px] lg:text-[52px] font-bold tracking-[-0.03em] leading-[1.08] [text-wrap:balance] ${
          isDark ? 'text-light-bg' : 'text-dark-bg'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-[16px] sm:text-[18px] leading-[1.65] font-normal [text-wrap:pretty] ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
