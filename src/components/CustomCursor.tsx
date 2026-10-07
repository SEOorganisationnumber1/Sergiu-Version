import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only activate for non-touch pointers
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHovered = false;
    let currentMode: 'default' | 'view' | 'drag' | 'action' = 'default';
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Check target element without re-rendering React
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'view') {
          currentMode = 'view';
          isHovered = true;
          if (labelRef.current) labelRef.current.textContent = 'EXPLORE';
        } else if (type === 'drag') {
          currentMode = 'drag';
          isHovered = true;
          if (labelRef.current) labelRef.current.textContent = '3D ORBIT';
        } else {
          currentMode = 'action';
          isHovered = true;
          if (labelRef.current) labelRef.current.textContent = '';
        }
      } else if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        currentMode = 'action';
        isHovered = true;
        if (labelRef.current) labelRef.current.textContent = '';
      } else {
        currentMode = 'default';
        isHovered = false;
        if (labelRef.current) labelRef.current.textContent = '';
      }

      // Direct instant dot positioning (0ms latency, bypassing React state)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${isHovered && currentMode !== 'action' ? '0' : '1'})`;
      }

      // Update ring appearance classes directly via dataset
      if (ringRef.current) {
        ringRef.current.setAttribute('data-mode', currentMode);
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    // Smooth Lerp loop using GPU compositor
    const updateRing = () => {
      if (isVisible) {
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;
        ringX += dx * 0.22;
        ringY += dy * 0.22;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
      }
      rafId = requestAnimationFrame(updateRing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Micro Dot (Zero lag, instant hardware response) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#00cfc8] -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none will-change-transform"
        style={{
          boxShadow: '0 0 10px rgba(0, 207, 200, 0.8)',
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Fluid Trailing Ring with Pure CSS States */}
      <div
        ref={ringRef}
        data-mode="default"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-bold opacity-0 pointer-events-none will-change-transform cursor-ring"
      >
        <span
          ref={labelRef}
          className="font-mono text-[9px] uppercase font-black tracking-widest text-[#070b12] dark:text-[#070b12]"
        />
      </div>
    </div>
  );
};
