import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  isDarkMode: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ isDarkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // High performance renderer with tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Group for the entire Search Engine & Growth Hologram
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central "Search Index Core Sphere" (representing search engine database & semantic web)
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 3);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: isDarkMode ? 0x00cfc8 : 0x07111e,
      emissive: isDarkMode ? 0x003e3a : 0x011b22,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.88,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Geodesic Search Lattice Wireframe (Web Crawler Index Grid)
    const latticeGeo = new THREE.WireframeGeometry(coreGeo);
    const latticeMat = new THREE.LineBasicMaterial({
      color: isDarkMode ? 0x00cfc8 : 0x00baa7,
      transparent: true,
      opacity: isDarkMode ? 0.45 : 0.65,
    });
    const latticeMesh = new THREE.LineSegments(latticeGeo, latticeMat);
    latticeMesh.scale.set(1.003, 1.003, 1.003);
    coreMesh.add(latticeMesh);

    // 3. Orbiting Data Ring 1: "Crawler & Keyword Index Pipeline"
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x00cfc8,
      emissive: 0x00cfc8,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    rootGroup.add(ring1);

    // 4. Orbiting Data Ring 2: "Algorithmic Growth & PageRank Helix"
    const ring2Geo = new THREE.TorusGeometry(2.4, 0.022, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0x10b981 : 0x059669,
      emissive: isDarkMode ? 0x059669 : 0x047857,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    rootGroup.add(ring2);

    // 5. Orbiting Data Ring 3: "Core Web Vitals & Speed Axis"
    const ring3Geo = new THREE.TorusGeometry(2.7, 0.018, 16, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0x38bdf8 : 0x0284c7,
      emissive: isDarkMode ? 0x0284c7 : 0x0369a1,
      emissiveIntensity: 0.5,
      roughness: 0.3,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 3;
    ring3.rotation.y = Math.PI / 6;
    rootGroup.add(ring3);

    // 6. Orbiting Search Data Satellites / Ranking Nodes
    const satelliteCount = 5;
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x00cfc8,
      emissive: 0x00cfc8,
      emissiveIntensity: 1.5,
    });

    for (let i = 0; i < satelliteCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      rootGroup.add(sat);
      satellites.push(sat);
    }

    // 7. Floating Organic Traffic Data Stream (Particles)
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i + 1] = radius * Math.sin(phi);
      particlePositions[i + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: isDarkMode ? 0x00cfc8 : 0x0f766e,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode ? 0.7 : 1.3);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00cfc8, 10, 20);
    cyanLight.position.set(4, 3, 4);
    scene.add(cyanLight);

    const greenLight = new THREE.PointLight(0x10b981, 7, 20);
    greenLight.position.set(-4, -3, 3);
    scene.add(greenLight);

    // Mouse Tracking with Inertial Physics
    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotX = y * 0.7;
      targetRotY = x * 0.9;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let reqId: number | null = null;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Lerp mouse rotation
      curRotX += (targetRotX - curRotX) * 0.05;
      curRotY += (targetRotY - curRotY) * 0.05;

      rootGroup.rotation.x = curRotX + Math.sin(t * 0.6) * 0.08;
      rootGroup.rotation.y = curRotY + t * 0.25;

      // Independent ring rotations mimicking dynamic search algorithms
      ring1.rotation.z = t * 0.5;
      ring2.rotation.x = -Math.PI / 6 + t * 0.4;
      ring3.rotation.y = Math.PI / 6 + t * 0.35;

      // Pulse core sphere scale gently
      const pulse = 1 + Math.sin(t * 2) * 0.025;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Position satellites along orbital paths
      satellites.forEach((sat, idx) => {
        const offset = (idx * Math.PI * 2) / satelliteCount;
        const speed = 0.7;
        const r = 2.1;
        sat.position.x = Math.cos(t * speed + offset) * r;
        sat.position.y = Math.sin((t * speed + offset) * 2) * 0.4;
        sat.position.z = Math.sin(t * speed + offset) * r;
      });

      // Slowly rotate particle data stream
      particleSystem.rotation.y = t * 0.08;
      particleSystem.rotation.x = t * 0.04;

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };

    reqId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (reqId) cancelAnimationFrame(reqId);
      coreGeo.dispose();
      coreMat.dispose();
      latticeGeo.dispose();
      latticeMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      satGeo.dispose();
      satMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] lg:min-h-[520px] relative pointer-events-auto cursor-grab active:cursor-grabbing select-none"
      data-cursor="drag"
    />
  );
};
