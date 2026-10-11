import React, { useEffect, useRef } from 'react';
import type { Timer as ThreeTimerInstance } from 'three';
import type { WebGLRendererInstance } from './threeRuntime';

interface ThreeCanvasProps { isDarkMode: boolean; snapSignal: number }

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ isDarkMode, snapSignal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const snapRef = useRef(snapSignal);
  const darkModeRef = useRef(isDarkMode);
  useEffect(() => { snapRef.current = snapSignal; }, [snapSignal]);
  useEffect(() => { darkModeRef.current = isDarkMode; }, [isDarkMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Decorative WebGL motion is unnecessary when the visitor asks to reduce motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let renderer: WebGLRendererInstance | undefined;
    let timer: ThreeTimerInstance | undefined;
    let raf = 0;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let isInView = true;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let onPointerMove: ((event: Event) => void) | undefined;
    let onPointerLeave: (() => void) | undefined;
    let onVisibilityChange: (() => void) | undefined;
    const resources: Array<{ dispose: () => void }> = [];
    let animate: FrameRequestCallback = () => undefined;

    const start = window.setTimeout(async () => {
      if (disposed || !container.isConnected) return;
      try {
        const THREE = await import('./threeRuntime');
        if (disposed) return;
        const mobile = window.innerWidth < 700;
        const dark = darkModeRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
        camera.position.set(0, mobile ? 7.5 : 8.5, mobile ? 19 : 20);
        camera.lookAt(0, 0, 0);
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.1 : 1.3));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // A sculpted search visibility field: query clusters rise through ranking strata over time.
        const columns = mobile ? 24 : 42;
        const rows = mobile ? 18 : 28;
        const width = mobile ? 13 : 17;
        const depth = mobile ? 9 : 11;
        const surface: Array<[number, number, number]> = [];
        const linePositions: number[] = [];
        const nodePositions: number[] = [];
        const at = (row: number, col: number) => row * columns + col;
        for (let row = 0; row < rows; row++) {
          const z = (row / (rows - 1) - 0.5) * depth;
          for (let col = 0; col < columns; col++) {
            const x = (col / (columns - 1) - 0.5) * width;
            const progress = col / (columns - 1);
            const queryPeak = Math.exp(-((progress - 0.72) ** 2) / 0.035 - ((z + 0.5) ** 2) / 11) * 2.15;
            const secondPeak = Math.exp(-((progress - 0.4) ** 2) / 0.06 - ((z - 2.1) ** 2) / 7) * 0.9;
            const contour = Math.sin(progress * Math.PI * 2.2 + z * 0.42) * 0.12;
            const y = -1.7 + progress * 2.2 + queryPeak + secondPeak + contour;
            const point: [number, number, number] = [x, y, z];
            surface.push(point);
            nodePositions.push(...point);
          }
        }
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < columns; col++) {
            const point = surface[at(row, col)];
            if (col < columns - 1) linePositions.push(...point, ...surface[at(row, col + 1)]);
            if (row < rows - 1 && row % 3 === 0) linePositions.push(...point, ...surface[at(row + 1, col)]);
          }
        }

        const fieldGeometry = new THREE.BufferGeometry();
        resources.push(fieldGeometry);
        fieldGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(nodePositions), 3));
        const fieldMaterial = new THREE.PointsMaterial({ color: dark ? 0x29e9df : 0x087a80, size: mobile ? 0.062 : 0.072, transparent: true, opacity: dark ? 0.74 : 0.57, depthWrite: false, sizeAttenuation: true });
        resources.push(fieldMaterial);
        const field = new THREE.Points(fieldGeometry, fieldMaterial);
        scene.add(field);

        const gridGeometry = new THREE.BufferGeometry();
        resources.push(gridGeometry);
        gridGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
        const gridMaterial = new THREE.LineBasicMaterial({ color: dark ? 0x00cfc8 : 0x157d83, transparent: true, opacity: dark ? 0.105 : 0.075, depthWrite: false });
        resources.push(gridMaterial);
        const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
        scene.add(grid);

        // The emphasized growth path threads upward through the query field.
        const path: number[] = [];
        for (let step = 0; step < 88; step++) {
          const x = (step / 87 - 0.5) * width;
          const progress = step / 87;
          const z = -0.8 + Math.sin(progress * Math.PI * 4) * 0.28;
          const y = -1.55 + progress * 2.2 + Math.exp(-((progress - 0.72) ** 2) / 0.035) * 2.15 + 0.05;
          path.push(x, y, z);
        }
        const signalGeometry = new THREE.BufferGeometry();
        resources.push(signalGeometry);
        signalGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(path), 3));
        const signalMaterial = new THREE.LineBasicMaterial({ color: dark ? 0x34fff0 : 0x00a7a1, transparent: true, opacity: dark ? 0.82 : 0.68 });
        resources.push(signalMaterial);
        const signal = new THREE.Line(signalGeometry, signalMaterial);
        scene.add(signal);

        // Small, fixed ambient query signals keep the canvas alive without adding a second focal object.
        const glints = new Float32Array((mobile ? 38 : 90) * 3);
        for (let i = 0; i < glints.length; i += 3) {
          glints[i] = (Math.random() - 0.5) * (mobile ? 13 : 20);
          glints[i + 1] = (Math.random() - 0.5) * 6;
          glints[i + 2] = (Math.random() - 0.5) * 12;
        }
        const glintGeometry = new THREE.BufferGeometry();
        resources.push(glintGeometry);
        glintGeometry.setAttribute('position', new THREE.BufferAttribute(glints, 3));
        const glintMaterial = new THREE.PointsMaterial({ color: dark ? 0x16dcd4 : 0x16777b, size: 0.04, transparent: true, opacity: dark ? 0.32 : 0.2, depthWrite: false });
        resources.push(glintMaterial);
        scene.add(new THREE.Points(glintGeometry, glintMaterial));

        const interactionArea = container.closest('.hero-stage') ?? container;
        onPointerMove = (rawEvent: Event) => {
          const event = rawEvent as PointerEvent;
          const bounds = interactionArea.getBoundingClientRect();
          if (!bounds.width || !bounds.height) return;
          const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
          const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
          targetPointerX = x * 0.072;
          targetPointerY = -y * 0.052;
        };
        onPointerLeave = () => { targetPointerX = 0; targetPointerY = 0; };
        if (!mobile) {
          interactionArea.addEventListener('pointermove', onPointerMove, { passive: true });
          interactionArea.addEventListener('pointerleave', onPointerLeave, { passive: true });
        }
        let lastSnap = snapRef.current;
        let snapAt = -100;
        let lastFrame = 0;
        const frameInterval = 1000 / (mobile ? 30 : 45);
        timer = new THREE.Timer();
        timer.connect(document);
        let previousDark = dark;
        const applyTheme = (nextDark: boolean) => {
          fieldMaterial.color.setHex(nextDark ? 0x29e9df : 0x087a80);
          fieldMaterial.opacity = nextDark ? 0.74 : 0.57;
          gridMaterial.color.setHex(nextDark ? 0x00cfc8 : 0x157d83);
          gridMaterial.opacity = nextDark ? 0.105 : 0.075;
          signalMaterial.color.setHex(nextDark ? 0x34fff0 : 0x00a7a1);
          glintMaterial.color.setHex(nextDark ? 0x16dcd4 : 0x16777b);
        };
        const resize = () => {
          if (!renderer) return;
          camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1);
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        animate = (timestamp) => {
          raf = 0;
          if (disposed || !renderer || !isInView || document.hidden) return;
          if (timestamp - lastFrame < frameInterval) {
            raf = requestAnimationFrame(animate);
            return;
          }
          lastFrame = timestamp;
          if (document.documentElement.classList.contains('theme-transitioning')) {
            raf = requestAnimationFrame(animate);
            return;
          }
          timer?.update();
          const time = timer?.getElapsed() ?? 0;
          if (previousDark !== darkModeRef.current) { previousDark = darkModeRef.current; applyTheme(previousDark); }
          if (snapRef.current !== lastSnap) { lastSnap = snapRef.current; snapAt = time; }
          const pulse = Math.max(0, 1 - (time - snapAt) / 0.75);
          // Keep the SEO field stable; only add a barely perceptible, eased response to local Hero movement.
          pointerX += (targetPointerX - pointerX) * 0.075;
          pointerY += (targetPointerY - pointerY) * 0.075;
          scene.rotation.y = pointerX;
          scene.rotation.x = pointerY;
          signalMaterial.opacity = (previousDark ? 0.82 : 0.68) + pulse * 0.16;
          signal.position.y = Math.sin(time * 0.65) * 0.035;
          renderer.render(scene, camera);
          raf = requestAnimationFrame(animate);
        };
        intersectionObserver = new IntersectionObserver(([entry]) => {
          isInView = entry.isIntersecting;
          if (isInView && !document.hidden && !raf) raf = requestAnimationFrame(animate);
          else if (!isInView && raf) { cancelAnimationFrame(raf); raf = 0; }
        }, { rootMargin: '100px' });
        intersectionObserver.observe(container);
        onVisibilityChange = () => {
          if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
          else if (isInView && !raf) raf = requestAnimationFrame(animate);
        };
        document.addEventListener('visibilitychange', onVisibilityChange);
        raf = requestAnimationFrame(animate);
      } catch {
        if (renderer) { renderer.dispose(); if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement); }
        container.classList.add('webgl-unavailable');
      }
    }, 180);

    return () => {
      disposed = true;
      window.clearTimeout(start);
      cancelAnimationFrame(raf);
      if (onPointerMove) {
        const interactionArea = container.closest('.hero-stage') ?? container;
        interactionArea.removeEventListener('pointermove', onPointerMove);
        if (onPointerLeave) interactionArea.removeEventListener('pointerleave', onPointerLeave);
      }
      if (onVisibilityChange) document.removeEventListener('visibilitychange', onVisibilityChange);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      renderer?.dispose();
      timer?.dispose();
      resources.forEach((resource) => resource.dispose());
      if (renderer?.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="neural-canvas" aria-hidden="true" />;
};
