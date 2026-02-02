'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  BadgeCheck, 
  CircleCheck, 
  ArrowRight, 
  Gauge,
  Activity,
  ScanLine,
  Zap,
  Cpu
} from 'lucide-react';

/**
 * ApexShieldLifecycleEngine
 * Standalone High-Fidelity Security Dashboard
 * Optimized for a 600x600 Hero Tile.
 */

interface Stats {
  threatLevel: string;
  threatChange: string;
  activeNodes: number;
  meanTime: number;
  progress: number;
  threatData: number[];
}

type ThemeMode = 'light' | 'deep';

export default function ApexShieldLifecycleEngine() {
  const [theme, setTheme] = useState<ThemeMode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [stats, setStats] = useState<Stats>({
    threatLevel: "High Alert",
    threatChange: "+14%",
    activeNodes: 1402,
    meanTime: 4.2,
    progress: 66,
    threatData: [15, 12, 18, 5, 15, 10, 19, 8, 14, 2, 10]
  });

  // Randomly select between 'Professional Light' and 'Modern Deep' themes
  useEffect(() => {
    setTheme(Math.random() > 0.5 ? 'light' : 'deep');
  }, []);

  const accents = {
    blue: '#2563eb',   // Deep Blue
    orange: '#f97316', // Sunset Orange
    gold: '#eab308'    // Gold
  };

  const updateStats = useCallback(() => {
    if (isScanning) return;

    setStats(prev => ({
      ...prev,
      activeNodes: prev.activeNodes + (Math.random() > 0.5 ? 2 : -1),
      meanTime: Math.max(3.5, Math.min(5.0, prev.meanTime + (Math.random() * 0.1 - 0.05))),
      threatData: [...prev.threatData.slice(1), Math.floor(Math.random() * 20)]
    }));

    const timer = setTimeout(updateStats, 1500 + Math.random() * 1000);
    return () => clearTimeout(timer);
  }, [isScanning]);

  useEffect(() => {
    const timer = setTimeout(updateStats, 1000);
    return () => clearTimeout(timer);
  }, [updateStats]);

  const handleScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    
    let steps = 0;
    const scanInterval = setInterval(() => {
      steps++;
      setStats(prev => ({
        ...prev,
        activeNodes: Math.floor(1420 + Math.random() * 80),
        threatData: Array.from({ length: 11 }, () => Math.floor(Math.random() * 20)),
        progress: Math.min(99, prev.progress + 4)
      }));

      if (steps > 15) {
        clearInterval(scanInterval);
        setIsScanning(false);
        setStats(prev => ({
          ...prev,
          threatLevel: "Secured",
          threatChange: "-99%",
          progress: 100,
          activeNodes: 1488,
          threatData: [2, 1, 2, 1, 3, 1, 0, 1, 2, 1, 1]
        }));
      }
    }, 120);
  };

  const generatePath = (data: number[]) => {
    return data.reduce((path, val, i) => {
      const x = i * 10;
      const y = 20 - val;
      return path + (i === 0 ? `M${x},${y}` : ` L${x},${y}`);
    }, "");
  };

  const themeStyles = useMemo(() => {
    if (theme === 'light') {
      return {
        background: 'radial-gradient(circle at center, #fdfcf0 0%, #f1f5f9 100%)',
        card: 'bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border-none',
        textMain: 'text-slate-900',
        textSub: 'text-slate-500',
        header: 'bg-white/60 backdrop-blur-xl border-slate-100',
        nodeBase: 'bg-slate-50 border-slate-200',
        track: 'bg-slate-100',
        footer: 'bg-slate-50/80 border-slate-200'
      };
    }
    return {
      background: 'radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%)',
      card: 'bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)]',
      textMain: 'text-white',
      textSub: 'text-indigo-200/60',
      header: 'bg-slate-900/40 backdrop-blur-2xl border-white/5',
      nodeBase: 'bg-slate-900 border-white/10',
      track: 'bg-white/5',
      footer: 'bg-black/20 border-white/5'
    };
  }, [theme]);

  if (!theme) return null;

  return (
    <div 
      className="w-full h-full flex items-center justify-center p-0 m-0 overflow-hidden font-display transition-all duration-1000"
      style={{ background: themeStyles.background }}
    >
      {/* 600x600 Constraint */}
      <div className={`w-full h-full max-w-[600px] max-h-[600px] overflow-hidden relative flex flex-col antialiased ${themeStyles.textMain}`}>
        
        {/* Subtle Depth FX */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 size-48 bg-blue-500/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-1/4 right-1/4 size-48 bg-orange-500/10 rounded-full blur-[80px]" />
        </div>

        {/* Dynamic Scan Beam */}
        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ top: '-10%' }}
              animate={{ top: '110%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[1px] z-50 pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${accents.blue}, transparent)`, boxShadow: `0 0 10px ${accents.blue}` }}
            />
          )}
        </AnimatePresence>

        {/* Tight Header */}
        <header className={`relative z-10 flex-shrink-0 flex items-center justify-between px-4 py-3 border-b ${themeStyles.header}`}>
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 90 }}
              className="size-7 rounded-lg flex items-center justify-center shadow-md flex-shrink-0" 
              style={{ backgroundColor: accents.blue }}
            >
              <Shield className="text-white size-4" />
            </motion.div>
            <div>
              <h2 className="text-xs font-black tracking-widest uppercase italic leading-none mb-0.5">
                Apex<span style={{ color: accents.gold }}>Shield</span>
              </h2>
              <p className="text-[8px] font-bold opacity-40 uppercase tracking-tighter">Enterprise v5.0.1</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black uppercase tracking-widest leading-none" style={{ color: isScanning ? accents.orange : accents.blue }}>
                {isScanning ? 'Syncing' : 'Verified'}
              </span>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3].map(i => (
                  <div key={`indicator-${i}`} className="h-0.5 w-1.5 rounded-full" style={{ backgroundColor: i === 3 ? `${accents.blue}33` : accents.blue }} />
                ))}
              </div>
            </div>
            <div className="size-2 rounded-full shadow-[0_0_8px]" style={{ backgroundColor: isScanning ? accents.orange : accents.gold, boxShadow: `0 0 8px ${isScanning ? accents.orange : accents.gold}` }} />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-4 px-4 overflow-y-auto custom-scrollbar overflow-x-hidden">
          <div className="text-center mb-4 flex-shrink-0">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xl font-black tracking-tight mb-1 leading-none"
            >
              Security <span style={{ color: accents.blue }}>Lifecycle</span>
            </motion.h1>
            <p className={`${themeStyles.textSub} text-[9px] font-black max-w-[200px] mx-auto leading-relaxed uppercase tracking-wider`}>
              Strategic Alignment Engine
            </p>
          </div>

          {/* Elevated Surface: Lifecycle Timeline */}
          <div className={`w-full relative px-4 py-6 mb-4 rounded-3xl flex-shrink-0 ${themeStyles.card}`}>
            <div className={`absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 rounded-full overflow-hidden ${themeStyles.track}`}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stats.progress}%` }}
                className="h-full shadow-md"
                style={{ background: `linear-gradient(90deg, ${accents.blue}, ${accents.gold})` }}
              />
            </div>

            <div className="relative flex items-center justify-between">
              {[
                { icon: AlertTriangle, color: accents.orange, label: 'Audit', val: 0 },
                { icon: Lock, color: accents.blue, label: 'Harden', val: 33 },
                { icon: BadgeCheck, color: accents.gold, label: 'Approval', val: 66, large: true },
                { icon: CircleCheck, color: accents.blue, label: 'Deploy', val: 100 }
              ].map((node, i) => {
                const isActive = stats.progress >= node.val;
                return (
                  <div key={`node-${i}`} className="relative flex flex-col items-center group flex-shrink-0">
                    <motion.div 
                      whileHover={{ y: -2, scale: 1.05 }}
                      className={`relative z-10 transition-all duration-500 rounded-xl flex items-center justify-center 
                        ${node.large ? 'size-11' : 'size-8'} 
                        ${themeStyles.nodeBase} ${isActive ? 'shadow-lg' : 'opacity-20 grayscale'} 
                        border`}
                      style={{ 
                        borderColor: isActive ? node.color : 'transparent',
                        boxShadow: isActive ? `0 8px 16px -4px ${node.color}44` : 'none'
                      }}
                    >
                      <node.icon 
                        className="transition-colors duration-500 flex-shrink-0" 
                        size={node.large ? 20 : 14}
                        style={{ color: isActive ? node.color : 'inherit' }}
                      />
                    </motion.div>
                    <span className={`absolute -bottom-6 text-[8px] font-black uppercase tracking-tighter transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                      {node.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Analytics Data Grid */}
          <div className="grid grid-cols-2 gap-3 w-full mb-4 flex-shrink-0">
            <div className={`p-3 rounded-2xl group relative overflow-hidden transition-all flex-shrink-0 ${themeStyles.card}`}>
              <div className="flex items-center justify-between mb-2">
                <Activity size={14} style={{ color: accents.orange }} />
                <span className="text-[8px] font-black uppercase opacity-40 tracking-wider">Risk Index</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <h4 className="text-lg font-black">{stats.threatLevel}</h4>
                <span className="text-[9px] font-bold" style={{ color: stats.threatLevel === 'Secured' ? accents.blue : accents.orange }}>{stats.threatChange}</span>
              </div>
              <svg className="w-full h-6 overflow-visible" viewBox="0 0 100 20">
                <motion.path 
                  animate={{ d: generatePath(stats.threatData) }}
                  transition={{ duration: 0.4 }}
                  fill="none" 
                  stroke={stats.threatLevel === 'Secured' ? accents.blue : accents.orange} 
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className={`p-3 rounded-2xl group relative overflow-hidden transition-all flex-shrink-0 ${themeStyles.card}`}>
              <div className="flex items-center justify-between mb-2">
                <Cpu size={14} style={{ color: accents.gold }} />
                <span className="text-[8px] font-black uppercase opacity-40 tracking-wider">Live Logic</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <h4 className="text-lg font-black">{stats.activeNodes}</h4>
                <span className="text-[9px] font-black" style={{ color: accents.gold }}>Active</span>
              </div>
              <div className={`h-1.5 w-full rounded-full overflow-hidden ${themeStyles.track}`}>
                <motion.div 
                  animate={{ width: ['30%', '90%', '65%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: accents.gold }}
                />
              </div>
            </div>

            <div className={`col-span-2 p-3 rounded-2xl flex items-center justify-between group flex-shrink-0 ${themeStyles.card}`}>
              <div className="flex gap-3 items-center">
                <div className={`size-10 rounded-xl flex items-center justify-center flex-shrink-0 ${themeStyles.nodeBase}`}>
                   <Gauge size={18} style={{ color: accents.blue }} />
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase opacity-40 tracking-widest mb-0.5">Deployment Mean Time</p>
                  <h4 className="text-xl font-black">{stats.meanTime.toFixed(1)} <span className="text-[10px] font-medium opacity-50">Days/Phase</span></h4>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-blue-500/20 bg-blue-500/5">
                 <Zap size={12} style={{ color: accents.blue }} />
                 <span className="text-[8px] font-black uppercase" style={{ color: accents.blue }}>Optimal</span>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={handleScan}
            disabled={isScanning}
            className={`w-full py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex-shrink-0 transition-all flex items-center justify-center gap-3 group relative overflow-hidden text-white mb-2
              ${isScanning ? 'opacity-80' : 'hover:brightness-110'}`}
            style={{ 
              background: `linear-gradient(135deg, ${accents.blue} 0%, #1e40af 100%)`,
              boxShadow: `0 10px 20px -5px ${accents.blue}55`
            }}
          >
            {isScanning ? (
              <>
                <ScanLine className="size-4 animate-pulse" />
                <span>Processing Audit...</span>
              </>
            ) : (
              <>
                <span>Execute Assessment</span>
                <ArrowRight className="size-4 group-hover:translate-x-1.5 transition-transform" />
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.button>
        </main>

        {/* Minimal Footer */}
        <footer className={`relative z-10 w-full px-4 py-3 flex-shrink-0 border-t flex items-center justify-between ${themeStyles.footer}`}>
          <div className="flex items-center gap-2">
             <div className="size-1.5 rounded-full animate-pulse" style={{ backgroundColor: accents.blue }}></div>
             <span className="text-[8px] font-black opacity-50 uppercase tracking-widest">Global Telemetry</span>
          </div>
          <div className="flex gap-4">
            {['SOC-II', 'ISO27K'].map((cert) => (
              <span key={`cert-${cert}`} className="text-[8px] font-black opacity-20 hover:opacity-100 transition-opacity cursor-default tracking-tighter">{cert} READY</span>
            ))}
          </div>
        </footer>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
}
