import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MagneticButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  className?: string;
  showArrow?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  showArrow = true,
  type = 'button',
  target,
  rel
}) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      rectRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        rectRef.current = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        };
      } else {
        return;
      }
    }
    const { left, top, width, height } = rectRef.current;
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    setPosition({ x: 0, y: 0 });
  };

  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles =
      'bg-brand-gold text-dark-bg hover:bg-white hover:text-dark-bg border border-brand-gold shadow-[0_4px_24px_rgba(212,151,59,0.22)]';
  } else if (variant === 'secondary') {
    variantStyles =
      'bg-transparent text-light-bg hover:text-brand-gold border border-white/20 hover:border-brand-gold';
  } else if (variant === 'outline') {
    variantStyles =
      'bg-transparent text-light-bg hover:text-brand-gold border border-white/25 hover:border-brand-gold';
  } else if (variant === 'dark') {
    variantStyles =
      'bg-dark-surface text-light-bg hover:bg-brand-gold hover:text-dark-bg border border-white/10 hover:border-brand-gold';
  }

  const content = (
    <div
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 15, stiffness: 220, mass: 0.15 }}
        className={`group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-[14px] sm:text-[15px] font-semibold tracking-[-0.01em] transition-all duration-300 select-none overflow-hidden ${variantStyles} ${className}`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {showArrow && (
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </span>
      </motion.div>
    </div>
  );

  if (to) {
    return <Link to={to} onClick={onClick}>{content}</Link>;
  }

  if (href) {
    return (
      <a href={href} onClick={onClick} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block bg-transparent border-0 p-0 text-left">
      {content}
    </button>
  );
};
