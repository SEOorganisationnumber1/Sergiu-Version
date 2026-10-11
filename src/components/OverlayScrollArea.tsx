import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

interface OverlayScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  overlay?: React.ReactNode;
}

interface ThumbState {
  visible: boolean;
  top: number;
  height: number;
  value: number;
}

export const OverlayScrollArea: React.FC<OverlayScrollAreaProps> = ({
  children,
  className = '',
  contentClassName = '',
  contentStyle,
  overlay,
  ...frameProps
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerY: number; scrollTop: number } | null>(null);
  const frameId = useRef<number | null>(null);
  const scrollId = `overlay-scroll-${useId().replace(/:/g, '')}`;
  const [thumb, setThumb] = useState<ThumbState>({ visible: false, top: 0, height: 0, value: 0 });

  const updateThumb = useCallback(() => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    const trackHeight = track.clientHeight;
    const maxScroll = scroller.scrollHeight - scroller.clientHeight;
    if (maxScroll <= 1 || trackHeight <= 0) {
      setThumb((current) => current.visible ? { ...current, visible: false } : current);
      return;
    }
    const height = Math.min(trackHeight, Math.max(28, trackHeight * scroller.clientHeight / scroller.scrollHeight));
    const top = (trackHeight - height) * scroller.scrollTop / maxScroll;
    setThumb({ visible: true, top, height, value: Math.round(scroller.scrollTop / maxScroll * 100) });
  }, []);

  const scheduleThumbUpdate = useCallback(() => {
    if (frameId.current !== null) return;
    frameId.current = window.requestAnimationFrame(() => {
      frameId.current = null;
      updateThumb();
    });
  }, [updateThumb]);

  useEffect(() => {
    const scroller = scrollRef.current;
    const frame = scroller?.parentElement;
    if (!scroller || !frame) return;
    const observer = new ResizeObserver(scheduleThumbUpdate);
    observer.observe(frame);
    observer.observe(scroller);
    const mutationObserver = new MutationObserver(scheduleThumbUpdate);
    mutationObserver.observe(scroller, { childList: true, subtree: true, characterData: true });
    scroller.addEventListener('scroll', scheduleThumbUpdate, { passive: true });
    scheduleThumbUpdate();
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      scroller.removeEventListener('scroll', scheduleThumbUpdate);
      if (frameId.current !== null) window.cancelAnimationFrame(frameId.current);
    };
  }, [scheduleThumbUpdate, children]);

  const moveToTrackPoint = (clientY: number) => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    const maxScroll = scroller.scrollHeight - scroller.clientHeight;
    const thumbTravel = track.clientHeight - thumb.height;
    if (maxScroll <= 0 || thumbTravel <= 0) return;
    const localY = clientY - track.getBoundingClientRect().top - thumb.height / 2;
    scroller.scrollTop = Math.max(0, Math.min(1, localY / thumbTravel)) * maxScroll;
  };

  const handleThumbPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dragRef.current = { pointerY: event.clientY, scrollTop: scrollRef.current?.scrollTop ?? 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleThumbPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    const scroller = scrollRef.current;
    const track = trackRef.current;
    if (!drag || !scroller || !track) return;
    const thumbTravel = track.clientHeight - thumb.height;
    const maxScroll = scroller.scrollHeight - scroller.clientHeight;
    if (thumbTravel <= 0) return;
    scroller.scrollTop = drag.scrollTop + (event.clientY - drag.pointerY) * maxScroll / thumbTravel;
  };

  return (
    <div {...frameProps} data-lenis-prevent className={`overlay-scroll-frame ${className}`}>
      <div
        ref={scrollRef}
        id={scrollId}
        tabIndex={0}
        data-lenis-prevent
        className={`overlay-scroll-content ${contentClassName}`}
        style={contentStyle}
      >
        {children}
      </div>
      {overlay}
      <div
        ref={trackRef}
        className="overlay-scroll-track"
        aria-hidden={!thumb.visible}
        onPointerDown={(event) => {
          if (event.target === event.currentTarget && thumb.visible) moveToTrackPoint(event.clientY);
        }}
        style={{ visibility: thumb.visible ? 'visible' : 'hidden' }}
      >
        <button
          type="button"
          role="scrollbar"
          aria-label="Scroll dialog content"
          aria-controls={scrollId}
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={thumb.value}
          tabIndex={thumb.visible ? 0 : -1}
          className="overlay-scroll-thumb"
          onPointerDown={handleThumbPointerDown}
          onPointerMove={handleThumbPointerMove}
          onPointerUp={() => { dragRef.current = null; }}
          onPointerCancel={() => { dragRef.current = null; }}
          onKeyDown={(event) => {
            const scroller = scrollRef.current;
            if (!scroller) return;
            if (event.key === 'ArrowDown') scroller.scrollBy({ top: 48 });
            else if (event.key === 'ArrowUp') scroller.scrollBy({ top: -48 });
            else if (event.key === 'PageDown') scroller.scrollBy({ top: scroller.clientHeight * 0.8 });
            else if (event.key === 'PageUp') scroller.scrollBy({ top: -scroller.clientHeight * 0.8 });
            else return;
            event.preventDefault();
          }}
          style={{ height: `${thumb.height}px`, transform: `translateY(${thumb.top}px)` }}
        />
      </div>
    </div>
  );
};
