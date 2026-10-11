import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delayMs = 0,
}) => {
  const [isRevealed, setIsRevealed] = useState(() =>
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  );
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRevealed) return;

    let revealTimeout: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && revealTimeout === undefined) {
            revealTimeout = window.setTimeout(() => {
              setIsRevealed(true);
              revealTimeout = undefined;
            }, delayMs);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      {
        // Mobile sections can be several screens tall; a percentage threshold
        // tied to the whole section can be impossible to reach on those pages.
        threshold: 0.01,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      window.clearTimeout(revealTimeout);
      observer.disconnect();
    };
  }, [delayMs, isRevealed]);

  return (
    <div
      ref={domRef}
      className={`scroll-reveal ${isRevealed ? 'is-revealed' : ''} ${isRevealed ? '' : 'will-change-[opacity,transform]'} ${className}`}
    >
      {children}
    </div>
  );
};
