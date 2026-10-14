import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const isHoveredRef = useRef(false);
  const cursorTextRef = useRef('');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Responsive spring with high stiffness and balanced damping for zero drag
  const springConfig = { damping: 28, stiffness: 420, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (prefersReduced || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const caseCard = target.closest('[data-cursor="view"]');
      const interactive = caseCard ? null : target.closest('a, button, [role="button"], input, select, textarea');

      const nextText = caseCard ? 'View' : '';
      const nextHovered = Boolean(caseCard || interactive);

      if (nextHovered !== isHoveredRef.current) {
        isHoveredRef.current = nextHovered;
        setIsHovered(nextHovered);
      }

      if (nextText !== cursorTextRef.current) {
        cursorTextRef.current = nextText;
        setCursorText(nextText);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY, prefersReduced]);

  if (prefersReduced || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center font-medium will-change-transform"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%'
      }}
    >
      <motion.div
        animate={{
          width: cursorText ? 72 : isHovered ? 40 : 10,
          height: cursorText ? 72 : isHovered ? 40 : 10,
          backgroundColor: cursorText ? '#D4973B' : isHovered ? 'rgba(212, 151, 59, 0.25)' : '#D4973B',
          borderColor: cursorText ? '#D4973B' : isHovered ? '#D4973B' : 'transparent',
          borderWidth: isHovered && !cursorText ? 1.5 : 0
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 350 }}
        className="rounded-full flex items-center justify-center text-white text-[12px] uppercase tracking-wider font-semibold shadow-md"
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white drop-shadow-sm font-bold"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};
