'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, ShieldCheck, Leaf, Activity, Zap, Terminal } from 'lucide-react';

type ThemeMode = 'ops-dark' | 'ops-steel';

export default function ScalabilityRadar() {
  const [theme, setTheme] = useState<ThemeMode>('ops-dark');
  const [latency, setLatency] = useState(24);
  const [assets, setAssets] = useState(1240);
  const [safetyScore, setSafetyScore] = useState(98.2);
  const [fuelEff, setFuelEff] = useState(15.4);
  const [utilization, setUtilization] = useState(92);
  const [scanningDots, setScanningDots] = useState("");
  const [focusedBar, setFocusedBar] = useState<number | null>(null);

  // Simulation effect for live data jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const jitter = Math.floor(Math.random() * 5) - 2;
        return Math.max(10, Math.min(50, prev + jitter));
      });
      setAssets(prev => prev + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0));
      setSafetyScore(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setFuelEff(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setUtilization(prev => Math.min(100, Math.max(0, Math.floor(prev + (Math.random() * 2 - 1)))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanningDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const styles = useMemo(() => {
    // High-Vis Operations Theme Configuration
    return {
      bg: 'bg-[#111827]', // Deep Carbon
      bgGradient: 'radial-gradient(circle at center, #1F2937 0%, #111827 100%)',
      card: 'bg-[#1F2937] border border-[#374151] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]',
      widget: 'bg-[#374151] border border-[#4B5563]',
      textMain: 'text-slate-100',
      textMuted: 'text-slate-400',
      border: 'border-[#374151]',
      radarRing: 'border-slate-700/50',
      accentOrange: 'text-[#F97316]', // Safety Orange
      accentBlue: 'text-[#3B82F6]',   // Electric Blue
      accentOrangeBg: 'bg-[#F97316]',
      accentBlueBg: 'bg-[#3B82F6]',
      accentGold: 'text-[#FACC15]',
      focusRing: 'focus-visible:ring-2 focus-visible:ring-[#F97316]',
    };
  }, []);

  const roiData = [
    { height: 'h-[20%]', color: styles.accentOrangeBg, value: '$2.4k', label: 'Q1' },
    { height: 'h-[35%]', color: styles.accentBlueBg, value: '$5.1k', label: 'Q2' },
    { height: 'h-[55%]', color: styles.accentOrangeBg, value: '$8.8k', label: 'Q3' },
    { height: 'h-[85%]', color: styles.accentBlueBg, value: '$15.2k', label: 'Q4' },
    { height: 'h-[95%]', color: styles.accentBlueBg, value: '$22.4k', label: 'PRJ' },
  ];

  return (
    <main 
      className={`w-full h-full flex items-center justify-center font-mono ${styles.textMain} transition-colors duration-500 p-2`}
      style={{ background: styles.bgGradient }}
      role="main"
      aria-label="High-Vis Operations Dashboard"
    >
      <div 
        className={`w-full h-full max-w-[600px] max-h-[600px] aspect-square ${styles.card} overflow-hidden relative flex flex-col transition-all duration-300`}
        role="region"
        aria-labelledby="dashboard-title"
      >
        
        {/* Header - Mission Control Style */}
        <header className={`flex items-center justify-between border-b-2 ${styles.border} px-4 py-2 z-20 bg-[#1F2937]`}>
          <div className="flex items-center gap-3">
            <div className={`p-1.5 ${styles.widget} rounded-none border-2`}>
              <Terminal className={`${styles.accentOrange} w-5 h-5`} />
            </div>
            <div>
              <h1 id="dashboard-title" className="text-xs font-black uppercase tracking-tighter">Ops_Radar.v2.5</h1>
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <p className={`text-[9px] ${styles.textMuted} font-mono uppercase font-bold`}>
                  SYS_ACTIVE // <span className={styles.accentBlue}>{latency}MS</span>
                </p>
              </div>
            </div>
          </div>
          <div className="text-right border-l-2 border-[#374151] pl-4">
            <span className={`text-[9px] block font-mono ${styles.accentOrange} font-black`}>TELEMETRY_LIVE</span>
            <span className="text-xs font-black tabular-nums">{assets.toLocaleString()} UNITS</span>
          </div>
        </header>

        {/* Main Interface */}
        <div className="flex-1 flex gap-1 p-1 min-h-0 relative">
          
          {/* Left Navigation / Status Rail */}
          <nav 
            className={`w-28 flex flex-col gap-1 z-10`}
            aria-label="Operations Navigation"
          >
            <div className="flex flex-col gap-1">
              {[
                { phase: '01', title: 'BASE', color: 'bg-slate-500' },
                { phase: '02', title: 'TELEM', color: 'bg-slate-500' }
              ].map((p, i) => (
                <div key={i} className={`p-2 ${styles.widget} group relative`}>
                  <div className="flex items-center gap-1.5">
                    <div className={`size-1.5 ${p.color}`}></div>
                    <span className="text-[8px] font-black opacity-40">PHV_{p.phase}</span>
                  </div>
                  <p className="text-[9px] font-black">{p.title}</p>
                </div>
              ))}
              
              <div className={`p-2 border-2 border-[#F97316] bg-[#F97316]/10`}>
                <div className="flex items-center gap-1.5">
                  <motion.div 
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="size-1.5 bg-[#F97316]"
                  />
                  <span className="text-[8px] font-black text-[#F97316]">CRITICAL</span>
                </div>
                <p className="text-[9px] font-black text-white">HYPER_SCALE</p>
              </div>
            </div>

            {/* Compact ROI Chart */}
            <div className={`mt-auto p-2 ${styles.widget} border-t-2`} role="group" aria-label="Performance Matrix">
              <p className={`text-[8px] font-black ${styles.textMuted} uppercase mb-2`}>ROI_MATRIX</p>
              <div className="flex items-end gap-1 h-8">
                {roiData.map((bar, index) => (
                  <div 
                    key={index} 
                    className={`flex-1 h-full flex items-end relative cursor-crosshair outline-none group`}
                    tabIndex={0}
                    onFocus={() => setFocusedBar(index)}
                    onBlur={() => setFocusedBar(null)}
                  >
                    <motion.div 
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      className={`w-full ${bar.height} ${bar.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </nav>

          {/* Radar Tactical View */}
          <div 
            className={`flex-1 relative flex items-center justify-center overflow-hidden ${styles.widget} bg-[#111827]`}
            role="img"
            aria-label="Tactical Radar Overlay"
          >
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4B5563 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}></div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              {[0.8, 0.55, 0.3].map((scale, i) => (
                <div 
                  key={i} 
                  className={`border ${styles.radarRing} rounded-full absolute`} 
                  style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
                />
              ))}
              <div className={`absolute h-full w-px ${styles.radarRing}`}></div>
              <div className={`absolute w-full h-px ${styles.radarRing}`}></div>
            </div>

            {/* Sweep Animation */}
            <motion.div 
              className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, transparent 15%, #3B82F6 25%, transparent 25.1%)`
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />

            {/* SVG Data Peaks */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" aria-hidden="true">
              <path 
                d="M 10 90 L 30 70 L 50 80 L 70 40 L 90 20" 
                fill="none" 
                stroke="#3B82F6" 
                strokeWidth="1" 
                strokeDasharray="2"
              />
              <circle cx="90" cy="20" fill="#F97316" r="2" />
              <motion.circle 
                animate={{ r: [1, 3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                cx="70" cy="40" fill="#3B82F6" 
              />
            </svg>

            {/* Floating Alert */}
            <div className={`absolute top-2 right-2 p-1.5 ${styles.widget} border-l-4 border-l-[#F97316] bg-[#1F2937]/90 backdrop-blur-sm z-30`}>
              <p className="text-[8px] font-black text-[#F97316]">UPWARD_TREND</p>
              <p className="text-[10px] font-black">+18.2%</p>
            </div>
            
            <div className="absolute bottom-2 left-2 text-[8px] font-bold text-slate-500 bg-[#111827] px-1">
              GRID_LOC: 34.05 / 118.24
            </div>
          </div>
        </div>

        {/* Dense Stats Footer */}
        <section 
          className={`grid grid-cols-3 gap-1 p-1 bg-[#1F2937] border-t-2 ${styles.border} z-20`}
          aria-label="System Metrics"
        >
          {[
            { label: 'SAFETY', val: safetyScore, icon: ShieldCheck, acc: styles.accentBlue },
            { label: 'FUEL', val: fuelEff, icon: Leaf, acc: styles.accentOrange },
            { label: 'UTIL', val: utilization, icon: Activity, acc: styles.accentGold }
          ].map((stat, i) => (
            <div key={i} className={`p-2 ${styles.widget} flex flex-col justify-between`}>
              <div className="flex items-center gap-1">
                <stat.icon className={`${stat.acc} w-3 h-3`} aria-hidden="true" />
                <p className={`text-[8px] font-black uppercase opacity-60`}>{stat.label}</p>
              </div>
              <p className="text-sm font-black tracking-tighter tabular-nums">{stat.val}%</p>
            </div>
          ))}
        </section>

        {/* Console Interface */}
        <footer className={`flex items-center justify-between text-[8px] font-black tracking-widest bg-[#111827] px-4 py-2 border-t-2 ${styles.border}`}>
          <div className="flex items-center gap-3">
            <span className="text-slate-500">KERN: v2.5.0</span>
            <span className={`${styles.accentBlue}`}>SCANNING{scanningDots}</span>
          </div>
          <div className="flex gap-4">
            <button className="hover:text-[#F97316] transition-colors">ABORT</button>
            <button className="hover:text-[#F97316] transition-colors">DUMP.LOG</button>
            <div className="w-px h-2 bg-slate-700"></div>
            <button className={`${styles.accentOrange} underline`}>OPS_MODE</button>
          </div>
        </footer>
      </div>
    </main>
  );
}
