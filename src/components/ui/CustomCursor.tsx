import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const isHoveredRef = useRef(false);
  const cursorTextRef = useRef('');

  // Primary mouse position (immediate for inner dot)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth elastic spring for trailing outer ring
  const springConfig = { damping: 26, stiffness: 320, mass: 0.25 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      // If it's a touch contact on a touchscreen, hide cursor
      if ('pointerType' in e && (e as PointerEvent).pointerType === 'touch') {
        setIsVisible(false);
        return;
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const caseCard = target.closest('[data-cursor="view"], a[href*="/work/"]');
      const interactive = caseCard ? null : target.closest('a, button, [role="button"], input, select, textarea');

      const nextText = caseCard ? 'VIEW' : '';
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
    const handleTouchStart = () => setIsVisible(false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Center Precision Dot (Zero Lag) */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <div
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            cursorText
              ? 'opacity-0 scale-0'
              : isHovered
              ? 'bg-brand-gold shadow-[0_0_10px_rgba(212,151,59,0.9)] scale-125'
              : 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]'
          }`}
        />
      </motion.div>

      {/* 2. Trailing Elastic Aura Ring / View Pill */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center font-medium will-change-transform"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          animate={{
            width: cursorText ? 80 : isHovered ? 48 : 34,
            height: cursorText ? 80 : isHovered ? 48 : 34,
            backgroundColor: cursorText
              ? '#D4973B'
              : isHovered
              ? 'rgba(212, 151, 59, 0.16)'
              : 'rgba(255, 255, 255, 0.04)',
            borderColor: cursorText
              ? '#D4973B'
              : isHovered
              ? '#D4973B'
              : 'rgba(255, 255, 255, 0.35)',
            borderWidth: cursorText ? 0 : 1.5,
            scale: 1
          }}
          transition={{ type: 'spring', damping: 24, stiffness: 360, mass: 0.3 }}
          className="rounded-full flex items-center justify-center shadow-lg backdrop-blur-[2px]"
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-dark-bg font-extrabold text-[12px] tracking-wider uppercase"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};
