import React, { useState } from 'react';
import { ArrowUpRight, LayoutGrid, List, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'E-Commerce' | '3D WebGL' | 'Fintech & SaaS' | 'Brand Architecture';
  year: string;
  description: string;
  metrics: string;
  tags: string[];
  gradient: string;
  award: string;
}

const PROJECTS: Project[] = [
  {
    id: 'nordic-chrono',
    title: 'NORDIC CHRONO 3D',
    client: 'Nordic Chronometry AG (Geneva)',
    category: '3D WebGL',
    year: '2025',
    description: 'Real-time WebGL luxury timepiece configurator with raymarching shaders, haptic feedback, and frictionless worldwide checkout.',
    metrics: '+318% Configurator Conversion',
    tags: ['WebGL', 'Three.js', 'Custom Shaders', 'Shopify Plus'],
    gradient: 'from-cyan-900/60 via-slate-900 to-emerald-950',
    award: 'Awwwards Site of the Month',
  },
  {
    id: 'kinesis-labs',
    title: 'KINESIS COMPUTE',
    client: 'Kinesis Labs (San Francisco)',
    category: 'Fintech & SaaS',
    year: '2025',
    description: 'High-frequency algorithmic compute interface with instantaneous WebSocket streaming and bespoke kinetic typography.',
    metrics: '$2.4B Daily Volume Routed',
    tags: ['TypeScript', 'WebGL Graph', 'Tailwind', 'Realtime WS'],
    gradient: 'from-blue-900/60 via-slate-900 to-indigo-950',
    award: 'FWA of the Day',
  },
  {
    id: 'aura-soundworks',
    title: 'AURA SPATIAL ACOUSTICS',
    client: 'Aura Soundworks (Copenhagen)',
    category: 'E-Commerce',
    year: '2026',
    description: 'Immersive tactile commerce experience for spatial audio monitors with interactive 3D acoustic field visualization.',
    metrics: '99.9% CSAT & +180% AOV',
    tags: ['Next-Gen Commerce', 'Web Audio API', '3D Spline', 'GSAP'],
    gradient: 'from-teal-900/60 via-neutral-900 to-cyan-950',
    award: 'Red Dot Best of the Best',
  },
  {
    id: 'velocity-ventures',
    title: 'VELOCITY CAPITAL',
    client: 'Velocity Global (London)',
    category: 'Brand Architecture',
    year: '2025',
    description: 'Comprehensive digital identity, architectural design system, and multi-asset venture portal for Tier-1 founders.',
    metrics: '400k+ Qualified Inquiries',
    tags: ['Brand System', 'Design Token', 'Headless CMS', 'Editorial'],
    gradient: 'from-slate-800 via-neutral-900 to-cyan-950/70',
    award: 'Webby Nominee',
  },
  {
    id: 'monolith-studio',
    title: 'MONOLITH SPATIAL',
    client: 'Monolith Architecture (Tokyo / Zurich)',
    category: '3D WebGL',
    year: '2026',
    description: 'Photorealistic architectural walkthrough engine directly inside the browser using neural radiance fields and WebGPU.',
    metrics: '60 FPS Ultra-HD Browser Experience',
    tags: ['WebGPU', 'Three.js', 'Spatial VR', 'Swiss Type'],
    gradient: 'from-stone-900 via-neutral-900 to-cyan-950',
    award: 'Awwwards Developer Award',
  },
  {
    id: 'hyperflow-os',
    title: 'HYPERFLOW PLATFORM',
    client: 'Hyperflow Cloud (Berlin)',
    category: 'Fintech & SaaS',
    year: '2025',
    description: 'Design and deployment of an enterprise cloud infrastructure monitoring suite that transforms complex telemetry into art.',
    metrics: '14,000 Enterprise Teams',
    tags: ['Next.js', 'Micro-Interactions', 'Dark Mode UI', 'Figma Tokens'],
    gradient: 'from-cyan-950 via-slate-950 to-blue-950',
    award: 'FWA of the Month',
  },
];

interface WorkShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export const WorkShowcase: React.FC<WorkShowcaseProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Work');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All Work', '3D WebGL', 'E-Commerce', 'Fintech & SaaS', 'Brand Architecture'];

  const filteredProjects = activeCategory === 'All Work'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-24 sm:py-32 border-b border-neutral-300/60 dark:border-neutral-800/80 relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header with Swiss Architectural Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-300/60 dark:border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00cfc8]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00cfc8]">
                SELECTED REPERTOIRE (2024 — 2026)
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#070b12] dark:text-white uppercase">
              PROVEN IMPACT.
            </h2>
          </div>

          {/* Controls: Category Filter + View Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/70 dark:bg-neutral-900/80 rounded-none border border-neutral-300 dark:border-neutral-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sounds.playClick();
                    setActiveCategory(cat);
                  }}
                  onMouseEnter={() => sounds.playHover()}
                  className={`px-3 py-1.5 text-xs font-mono tracking-tight transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-[#00cfc8] text-[#070b12] font-bold shadow-md shadow-[#00cfc8]/20'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-[#070b12] dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Switcher */}
            <div className="hidden sm:flex items-center p-1 bg-neutral-200/70 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-800">
              <button
                onClick={() => {
                  sounds.playClick();
                  setViewMode('grid');
                }}
                className={`p-1.5 ${viewMode === 'grid' ? 'bg-[#00cfc8] text-[#070b12]' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setViewMode('list');
                }}
                className={`p-1.5 ${viewMode === 'list' ? 'bg-[#00cfc8] text-[#070b12]' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Work Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => {
                  sounds.playLaunch();
                  onSelectProject(project);
                }}
                onMouseEnter={() => sounds.playHover()}
                data-cursor="view"
                className="group relative cursor-pointer flex flex-col border border-neutral-300/80 dark:border-neutral-800/80 bg-white dark:bg-[#0c121d] hover:border-[#00cfc8] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#00cfc8]/10"
              >
                {/* Visual Canvas Card Preview */}
                <div className={`h-72 w-full bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center p-8 group-hover:scale-[1.02] transition-transform duration-700`}>
                  
                  {/* Subtle Geometric Overlay */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00cfc8_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Project Index Stamp */}
                  <div className="absolute top-4 left-4 font-mono text-xs text-white/50 tracking-widest">
                    0{idx + 1} // {project.year}
                  </div>

                  {/* Award Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-mono text-[#00cfc8] border border-white/10">
                    <Sparkles size={11} />
                    <span>{project.award}</span>
                  </div>

                  {/* Interactive Center Graphics */}
                  <div className="text-center z-10">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#00cfc8] font-bold block mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase group-hover:text-[#00cfc8] transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  {/* Corner Accent Button */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-none bg-[#070d18] text-white flex items-center justify-center group-hover:bg-[#00cfc8] group-hover:text-[#070b12] transition-all duration-300">
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1">
                      {project.client}
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#00cfc8] bg-[#00cfc8]/10 px-2.5 py-1 rounded">
                      {project.metrics}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 group-hover:text-[#00cfc8] transition-colors">
                      VIEW CASE STUDY →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Work List View (Locomotive / Kota style editorial list) */
          <div className="divide-y divide-neutral-300/80 dark:divide-neutral-800 mt-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => {
                  sounds.playLaunch();
                  onSelectProject(project);
                }}
                onMouseEnter={() => sounds.playHover()}
                data-cursor="view"
                className="py-8 group flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer hover:bg-neutral-200/30 dark:hover:bg-neutral-900/30 px-4 transition-colors duration-200"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm text-neutral-400">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-4xl font-black text-[#070b12] dark:text-white uppercase group-hover:text-[#00cfc8] transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      {project.client} — {project.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono font-bold text-[#00cfc8] bg-[#00cfc8]/10 px-3 py-1.5 rounded">
                    {project.metrics}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 hidden sm:inline-block">
                    {project.award}
                  </span>
                  <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 group-hover:bg-[#00cfc8] group-hover:text-black flex items-center justify-center transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
