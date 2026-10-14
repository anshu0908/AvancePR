import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'dark' | 'light' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = ''
}) => {
  let styles = '';
  if (variant === 'gold') {
    styles = 'bg-brand-gold/10 text-brand-gold border-brand-gold/25';
  } else if (variant === 'dark') {
    styles = 'bg-white/10 text-white border-white/15';
  } else if (variant === 'light') {
    styles = 'bg-white/10 text-stone-200 border-white/15';
  } else if (variant === 'outline') {
    styles = 'bg-transparent text-stone-300 border-white/20';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium tracking-wide border ${styles} ${className}`}
    >
      {children}
    </span>
  );
};
