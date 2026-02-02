'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  TriangleAlert, 
  Activity, 
  ShieldCheck, 
  Lock, 
  Navigation,
  ArrowUpRight,
  Maximize2,
  Radio,
  Route,
  Network,
  TrendingUp,
  AlertCircle,
  FlaskConical,
  Zap
} from 'lucide-react';

/**
 * EOC Logistics Dashboard (Growth Lab Edition)
 * Optimized for 600x600px constraint.
 * Aesthetic: Organic, Experimental, 'Amplitude-style'.
 * Palette: Soft Sage Gray, Living Coral, Deep Taupe.
 */

interface Stats {
  deviation: number;
  incidents: number;
  loss: number;
  efficiency: number;
  latency: number;
}

interface MapLayers {
  routes: boolean;
  network: boolean;
  zones: boolean;
}

export default function EocLogisticsDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeLayers, setActiveLayers] = useState<MapLayers>({
    routes: true,
    network: true,
    zones: true,
  });
  const [stats, setStats] = useState<Stats>({
    deviation: 0.84,
    incidents: 2,
    loss: 1.15,
    efficiency: 98.4,
    latency: 142,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  useEffect(() => {
    setMounted(true);

    let timeoutId: any;
    const updateStats = () => {
      setStats((prev) => ({
        deviation: Math.max(0, prev.deviation + (Math.random() - 0.5) * 0.1),
        incidents: Math.max(0, Math.floor(prev.incidents + (Math.random() - 0.5) * 1.5)),
        loss: Math.max(0, prev.loss + (Math.random() - 0.5) * 0.03),
        efficiency: Math.min(100, Math.max(95, prev.efficiency + (Math.random() - 0.5) * 0.3)),
        latency: Math.max(100, prev.latency + (Math.random() - 0.5) * 8),
      }));
      timeoutId = setTimeout(updateStats, 2000 + (Math.random() * 800 - 400));
    };

    timeoutId = setTimeout(updateStats, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    const current = scale.get();
    const newScale = Math.min(Math.max(1, current - e.deltaY * 0.001), 4);
    scale.set(newScale);
  };

  const resetMap = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const toggleLayer = (layer: keyof MapLayers) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  if (!mounted) return null;

  // Growth Lab Design Tokens
  const bgBase = "bg-[#E8EDE8]"; // Soft Sage Gray
  const surfaceBase = "bg-[#FAFAFA] shadow-[0_4px_14px_rgba(40,60,40,0.08)] border border-[#DDE4DD]"; // Off-white with green tint shadow
  const textTaupe = "text-[#483C32]"; // Deep Taupe
  const livingCoral = "text-[#FF6F61]"; // Living Coral
  const coralBg = "bg-[#FFF0EF]";
  const textSubtle = "text-[#6B7B6B]";
  const textPrimary = "text-[#2D332D]";

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#D1D9D1]">
      <div className={`w-full h-full max-w-[600px] max-h-[600px] aspect-square overflow-hidden relative flex flex-col p-3.5 gap-3 ${bgBase} font-sans selection:bg-[#FFD5D1] shadow-2xl`}>
        
        {/* EXPERIMENTAL HEADER */}
        <header className={`flex justify-between items-center px-4 py-2.5 rounded-lg ${surfaceBase}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-[#E2ECE2]`}>
              <FlaskConical className={`w-5 h-5 ${textTaupe}`} />
            </div>
            <div>
              <h1 className={`text-sm font-extrabold tracking-tight ${textTaupe}`}>GROWTH LAB COMMAND</h1>
              <p className={`text-[10px] font-bold ${textSubtle} uppercase tracking-wider`}>Iteration v4.2 • Stable</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 py-1.5 px-3 rounded-full ${coralBg} border border-[#FFD5D1]`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${livingCoral} opacity-40`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${livingCoral}`}></span>
              </span>
              <span className={`text-[10px] font-bold ${livingCoral}`}>LIVE LAB</span>
            </div>
            <button onClick={resetMap} className="text-[#A3B1A3] hover:text-[#483C32] transition-colors p-1" title="Reset View">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* METRIC GRID */}
        <div className="grid grid-cols-2 gap-3">
          <StatWidget 
            label="Lab Reliability" 
            value={`${stats.efficiency.toFixed(1)}%`}
            icon={<TrendingUp />}
            colorClass={textTaupe}
            bgColor="bg-[#E2ECE2]"
            surfaceClass={surfaceBase}
            textPrimary={textPrimary}
            textSubtle={textSubtle}
          />
          <StatWidget 
            label="Conversion Flux" 
            value={stats.incidents.toString()}
            icon={<Zap />}
            colorClass={livingCoral}
            bgColor={coralBg}
            surfaceClass={surfaceBase}
            textPrimary={textPrimary}
            textSubtle={textSubtle}
          />
        </div>

        {/* ANALYTIC CANVAS */}
        <div className={`${surfaceBase} rounded-lg flex-1 relative overflow-hidden group`}>
          <div 
            ref={containerRef}
            onWheel={handleWheel}
            onDoubleClick={resetMap}
            className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden bg-[#F2F5F2]"
          >
            <motion.div 
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              style={{ x, y, scale }} 
              className="w-full h-full relative origin-center"
            >
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
                alt="Experimental Mapping Data"
                fill
                className="object-cover transition-all duration-700 pointer-events-none select-none sepia-[0.3] grayscale-[0.5] brightness-[1.1] contrast-[0.9]"
                sizes="(max-width: 600px) 100vw, 600px"
                priority={false}
              />

              <AnimatePresence>
                {activeLayers.routes && (
                  <motion.svg 
                    key="routes-layer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none"
                  >
                    <motion.path 
                      d="M30,40 L65,60 L80,25" 
                      fill="none" 
                      stroke="#FF6F61"
                      strokeWidth="0.8"
                      strokeDasharray="2,2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </motion.svg>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {activeLayers.zones && (
                  <motion.div
                    key="zones-layer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div className="absolute top-[35%] left-[28%] w-[12%] aspect-square rounded-full bg-[#FF6F61]/10 border border-[#FF6F61]/30 animate-pulse" />
                    <div className="absolute top-[50%] left-[55%] w-[18%] aspect-square rounded-full bg-[#483C32]/10 border border-[#483C32]/30 animate-pulse" style={{ animationDelay: '1.2s' }} />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {activeLayers.network && (
                  <motion.div 
                    key="nodes-layer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <MapPin x="30%" y="40%" color="bg-[#FF6F61]" />
                    <MapPin x="65%" y="60%" color="bg-[#483C32]" />
                    <MapPin x="80%" y="25%" color="bg-[#FF6F61]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
              <div className={`px-2.5 py-1.5 rounded-lg backdrop-blur-sm bg-white/80 border border-[#DDE4DD] shadow-sm flex items-center gap-2`}>
                <Radio className={`w-3 h-3 ${livingCoral} animate-pulse`} />
                <span className={`text-[9px] font-black uppercase tracking-widest ${textTaupe}`}>GROWTH FLOW FEED</span>
              </div>
            </div>

            <div className="absolute bottom-3 right-3 flex flex-col gap-2">
              <div className={`p-1 rounded-lg backdrop-blur-md bg-white/70 border border-[#DDE4DD] shadow-sm flex flex-col gap-1`}>
                <LayerButton 
                  active={activeLayers.routes} 
                  onClick={() => toggleLayer('routes')} 
                  icon={<Route size={14} />} 
                  title="Expansion Routes"
                />
                <LayerButton 
                  active={activeLayers.zones} 
                  onClick={() => toggleLayer('zones')} 
                  icon={<AlertCircle size={14} />} 
                  title="Interest Hubs"
                />
                <LayerButton 
                  active={activeLayers.network} 
                  onClick={() => toggleLayer('network')} 
                  icon={<Network size={14} />} 
                  title="Lab Nodes"
                />
              </div>
            </div>
            
            <div className={`absolute bottom-3 left-3 px-2.5 py-1.5 rounded-lg bg-white/80 shadow-sm border border-[#DDE4DD]`}>
               <span className={`text-[10px] font-mono font-bold ${textTaupe}`}>UNIT: 42.3B / EXP: -71.1W</span>
            </div>
          </div>
        </div>

        {/* BOTTOM EXPERIMENT PANEL */}
        <div className="flex gap-3 h-16">
          <div className={`${surfaceBase} rounded-lg px-4 flex-1 flex items-center justify-between`}>
            <div>
              <span className={`text-[9px] font-bold uppercase ${textSubtle} block tracking-widest`}>Lab Drift</span>
              <span className={`text-xl font-mono font-bold ${textPrimary}`}>{stats.deviation.toFixed(3)}</span>
            </div>
            <div className="w-[1px] h-8 bg-[#DDE4DD]" />
            <div className="text-right">
              <span className={`text-[9px] font-bold uppercase ${textSubtle} block tracking-widest`}>Sync Delta</span>
              <span className={`text-xl font-mono font-bold ${livingCoral}`}>{stats.latency}μs</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#3a3028" }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-lg flex items-center justify-center gap-2 px-5 font-black uppercase tracking-[0.2em] text-[10px] text-white shadow-lg transition-all bg-[#483C32]`}
          >
            <Lock className="w-3.5 h-3.5" />
            DEPLOY
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function StatWidget({ label, value, icon, colorClass, bgColor, surfaceClass, textPrimary, textSubtle }: any) {
  return (
    <motion.div 
      whileHover={{ y: -1, boxShadow: "0 8px 20px -4px rgba(40, 60, 40, 0.12)" }}
      className={`${surfaceClass} rounded-lg p-3.5 flex flex-col justify-between h-[90px] transition-shadow`}
    >
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-lg ${bgColor} ${colorClass}`}>
          {React.cloneElement(icon as React.ReactElement<any>, { size: 16 })}
        </div>
        <ArrowUpRight className={`w-3.5 h-3.5 text-[#A3B1A3]`} />
      </div>
      <div>
        <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${textSubtle} mb-0.5 block`}>{label}</span>
        <div className={`text-2xl font-mono font-bold tracking-tight ${textPrimary}`}>
          {value}
        </div>
      </div>
    </motion.div>
  );
}

function LayerButton({ active, onClick, icon, title }: { active: boolean, onClick: () => void, icon: React.ReactNode, title?: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all pointer-events-auto border ${
        active 
          ? 'bg-[#483C32] text-white border-transparent shadow-sm' 
          : 'bg-white text-[#6B7B6B] border-[#DDE4DD] hover:bg-[#F2F5F2]'
      }`}
    >
      {icon}
    </motion.button>
  );
}

function MapPin({ x, y, color }: { x: string, y: string, color: string }) {
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <span className={`animate-ping absolute inline-flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full ${color} opacity-30`}></span>
      <div className={`relative h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm ${color}`} />
    </div>
  );
}
