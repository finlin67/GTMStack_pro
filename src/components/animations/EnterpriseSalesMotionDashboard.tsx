
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Cloud, 
  Users, 
  UserCheck, 
  CheckCircle2, 
  Zap, 
  User, 
  CreditCard, 
  Network, 
  Shield, 
  Rocket, 
  TrendingUp, 
  BadgeCheck 
} from 'lucide-react';

// --- Types ---
interface Stats {
  stakeholders: number;
  avgCycle: number;
  efficiency: number;
}

// --- Internal Sub-components ---
const StatMetric = ({ value, label, valueSuffix = "" }: { value: string | number, label: string, valueSuffix?: string }) => (
  <div className="flex flex-col">
    <motion.span 
      key={String(value)}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-blue-400 font-bold text-sm md:text-base tabular-nums"
    >
      {value}{valueSuffix}
    </motion.span>
    <span className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-tight">{label}</span>
  </div>
);

const StakeholderCircle = ({ color, duration, threshold }: { color: string, duration: number, threshold: number }) => (
  <AnimatePresence mode="popLayout">
    {duration >= threshold && (
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 5 }}
        animate={{ 
          opacity: duration === threshold && threshold === 6 ? 0.5 : 1, 
          scale: 1, 
          x: 0 
        }}
        exit={{ opacity: 0, scale: 0, x: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-slate-900 shadow-sm ${color}`}
      />
    )}
  </AnimatePresence>
);

// --- Main Component ---
/**
 * EnterpriseSalesMotionDashboard
 * A high-end SaaS visualization component for tracking complex sales cycles.
 * Features:
 * - Interactive timeline scaling
 * - Champion interaction insights
 * - Dynamic stakeholder mapping
 * - Real-time metric jittering
 */
export default function EnterpriseSalesMotionDashboard() {
  const [duration, setDuration] = useState<number>(6);
  const [isHoveringChampion, setIsHoveringChampion] = useState(false);
  const [stats, setStats] = useState<Stats>({
    stakeholders: 4.2,
    avgCycle: 180,
    efficiency: 92
  });

  const statsTimerRef = useRef<number | null>(null);

  // Dynamic Metrics Simulation Logic (Organic Jitter)
  const updateStatsWithJitter = useCallback(() => {
    setStats(prev => {
      const jitter = (Math.random() - 0.5) * 0.05;
      const cycleJitter = Math.floor((Math.random() - 0.5) * 4);
      const effJitter = (Math.random() - 0.5) * 0.4;
      
      return {
        stakeholders: parseFloat((prev.stakeholders + jitter).toFixed(1)),
        avgCycle: prev.avgCycle + cycleJitter,
        efficiency: Math.min(100, Math.max(80, prev.efficiency + effJitter))
      };
    });

    statsTimerRef.current = window.setTimeout(updateStatsWithJitter, 2000 + Math.random() * 3000);
  }, []);

  useEffect(() => {
    updateStatsWithJitter();
    return () => {
      if (statsTimerRef.current) window.clearTimeout(statsTimerRef.current);
    };
  }, [updateStatsWithJitter]);

  const pathVariants: Variants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: [0, 1, 1],
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center bg-slate-950 overflow-hidden p-4 sm:p-6 md:p-8">
      {/* 
          Hero Tile Inner Container - Premium SaaS Aesthetics
      */}
      <div className="w-full max-w-[600px] aspect-square relative bg-[#0f172a] text-white overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col font-display">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />

        {/* Main Content Area */}
        <div className="w-full h-full transform scale-[0.98] flex flex-col p-4 sm:p-8 relative z-10">
          
          {/* Header Section */}
          <div className="flex justify-between items-end mb-6 sm:mb-8 px-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 tracking-tight">
                Enterprise Sales Motion
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-1">Lifecycle Optimization Engine</p>
            </div>
            <div className="flex gap-3 sm:gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Champion</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Buyer</span>
              </div>
            </div>
          </div>

          {/* Interactive Core Layout */}
          <div className="relative flex-1 grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            
            {/* Orthogonal Animated Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                </linearGradient>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="url(#lineGrad)" />
                </marker>
              </defs>
              <g stroke="white" strokeWidth="0.4" strokeOpacity="0.08" fill="none">
                <path d="M 50 50 L 25 50 L 25 35" />
                <path d="M 50 50 L 75 50 L 75 35" />
                <path d="M 50 50 L 25 50 L 25 65" />
                <path d="M 50 50 L 75 50 L 75 65" />
              </g>
              <g stroke="url(#lineGrad)" strokeWidth="1.2" fill="none" markerEnd="url(#arrow)">
                <motion.path d="M 50 50 L 25 50 L 25 35" variants={pathVariants} initial="initial" animate="animate" />
                <motion.path d="M 50 50 L 75 50 L 75 35" variants={pathVariants} initial="initial" animate="animate" />
                <motion.path d="M 50 50 L 25 50 L 25 65" variants={pathVariants} initial="initial" animate="animate" />
                <motion.path d="M 50 50 L 75 50 L 75 65" variants={pathVariants} initial="initial" animate="animate" />
              </g>
            </svg>

            {/* Stage: Discovery */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col gap-2 relative transition-all hover:bg-slate-800/50 group z-20"
            >
              <Cloud className="absolute top-4 right-4 text-blue-400/50 w-5 h-5 group-hover:text-blue-400 transition-colors" />
              <div className="flex items-center">
                <h3 className="font-bold text-sm sm:text-base">Discovery</h3>
              </div>
              <p className="text-[11px] sm:text-[12px] text-slate-400 leading-snug pr-4">Identifying core pain points and baseline ROI.</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-[9px] sm:text-[10px] font-black text-slate-600 tracking-tighter uppercase">PHASE 01</span>
                <div className="flex -space-x-2">
                  <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-slate-900 shadow-sm z-10" />
                  <StakeholderCircle color="bg-blue-400" duration={duration} threshold={6} />
                </div>
              </div>
            </motion.div>

            {/* Stage: Evaluation */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col gap-2 relative transition-all hover:bg-slate-800/50 group z-20"
            >
              <Users className="absolute top-4 right-4 text-blue-400/50 w-5 h-5 group-hover:text-blue-400 transition-colors" />
              <div className="flex items-center">
                <h3 className="font-bold text-sm sm:text-base">Evaluation</h3>
              </div>
              <p className="text-[11px] sm:text-[12px] text-slate-400 leading-snug pr-4">Deep technical alignment and multi-threading.</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-[9px] sm:text-[10px] font-black text-slate-600 tracking-tighter uppercase">PHASE 02</span>
                <div className="flex -space-x-2">
                  <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-slate-900 shadow-sm z-10" />
                  <StakeholderCircle color="bg-emerald-500" duration={duration} threshold={6} />
                  <StakeholderCircle color="bg-violet-500" duration={duration} threshold={9} />
                </div>
              </div>
            </motion.div>

            {/* Stage: Selection */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col gap-2 relative overflow-hidden transition-all hover:bg-slate-800/50 group z-20"
            >
              <UserCheck className="absolute top-4 right-4 text-blue-400/50 w-5 h-5 group-hover:text-blue-400 transition-colors" />
              <div className="flex items-center">
                <h3 className="font-bold text-sm sm:text-base">Selection</h3>
              </div>
              <p className="text-[11px] sm:text-[12px] text-slate-400 leading-snug pr-4">Final POC validation and procurement prep.</p>
              
              <div className="flex gap-2 mt-1">
                <div className="h-1.5 w-6 bg-blue-500 rounded-full shadow-sm" />
                <div className="h-1.5 w-6 bg-blue-500 rounded-full shadow-sm" />
                <AnimatePresence>
                  {duration >= 6 && (
                    <motion.div 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: duration === 6 ? 0.3 : 1, width: 24 }}
                      exit={{ opacity: 0, width: 0 }}
                      className="h-1.5 bg-slate-700 rounded-full" 
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-auto">
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "82%" }} className="h-full bg-gradient-to-r from-blue-600 to-blue-400" />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[8px] sm:text-[9px] text-slate-600 font-black uppercase">82% COMPLETE</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-blue-400 uppercase tracking-tight">Security Review</span>
                </div>
              </div>

              {/* Champion Insights Overlay (Contextual Tooltip) */}
              <AnimatePresence>
                {isHoveringChampion && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.95 }} 
                    className="absolute inset-0 bg-[#0f172a]/95 z-50 p-6 flex flex-col border border-blue-500/20 rounded-2xl backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="text-blue-400 w-5 h-5" />
                      <h4 className="text-[11px] sm:text-[12px] font-black uppercase tracking-widest text-blue-400">Champion Insights</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[10px] mb-2 font-bold uppercase tracking-wide">
                          <span className="text-slate-500">Influence Power</span>
                          <span className="text-blue-400">94.2%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: "94.2%" }} className="h-full bg-blue-500" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] mb-2 font-bold uppercase tracking-wide">
                          <span className="text-slate-500">Internal Engagement</span>
                          <span className="text-blue-400">8.8/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: "88%" }} className="h-full bg-blue-500" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] text-slate-400 font-black uppercase">Active Motion</span>
                      </div>
                      <TrendingUp className="text-blue-400 w-5 h-5" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Stage: Implementation */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col gap-2 relative transition-all hover:bg-slate-800/50 group z-20"
            >
              <CheckCircle2 className="absolute top-4 right-4 text-blue-400/50 w-5 h-5 group-hover:text-blue-400 transition-colors" />
              <div className="flex items-center">
                <h3 className="font-bold text-sm sm:text-base">Implementation</h3>
              </div>
              <p className="text-[11px] sm:text-[12px] text-slate-400 leading-snug pr-4">Post-close handoff and customer success start.</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-[9px] sm:text-[10px] font-black text-slate-600 tracking-tighter uppercase">PHASE 04</span>
                <div className="w-7 h-7 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shadow-inner">
                  <BadgeCheck className="text-slate-600 w-5 h-5 group-hover:text-emerald-500 transition-colors" />
                </div>
              </div>
            </motion.div>

            {/* Minimized Central Hub Nodes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl animate-pulse" />
                
                {/* Primary Interaction Node: Champion */}
                <div 
                  className="absolute -top-4 -left-4 group cursor-pointer z-40"
                  onMouseEnter={() => setIsHoveringChampion(true)}
                  onMouseLeave={() => setIsHoveringChampion(false)}
                >
                  <motion.div 
                    whileHover={{ scale: 1.15 }} 
                    className={`w-12 h-12 rounded-full bg-slate-950 border-2 flex items-center justify-center shadow-2xl transition-all duration-300 ${isHoveringChampion ? 'border-blue-400 ring-8 ring-blue-500/10' : 'border-blue-600'}`}
                  >
                    <Zap className={`w-6 h-6 transition-colors duration-300 ${isHoveringChampion ? 'text-blue-300' : 'text-blue-500'}`} />
                  </motion.div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-xl">
                    <User className="text-white w-3 h-3" />
                  </div>
                </div>

                {/* Satellite Satellite Nodes */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-2 -right-2">
                    <div className="w-9 h-9 rounded-full bg-slate-900/90 border border-emerald-500/20 flex items-center justify-center shadow-lg backdrop-blur-sm">
                      <CreditCard className="text-emerald-500/80 w-4 h-4" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -left-2">
                    <div className="w-9 h-9 rounded-full bg-slate-900/90 border border-violet-500/20 flex items-center justify-center shadow-lg backdrop-blur-sm">
                      <Network className="text-violet-400/80 w-4 h-4" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <div className="w-9 h-9 rounded-full bg-slate-900/90 border border-slate-500/20 flex items-center justify-center shadow-lg backdrop-blur-sm">
                      <Shield className="text-slate-400/80 w-4 h-4" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -3, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} 
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600/30 to-violet-800/30 rounded-full flex items-center justify-center shadow-inner border border-white/5 z-10"
                >
                  <Rocket className="text-white/60 w-6 h-6" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Timeline Controller Slider */}
          <div className="mt-auto px-2 pb-2">
            <div className="relative w-full">
              <input 
                className="w-full h-2 bg-slate-900 rounded-full appearance-none cursor-pointer accent-blue-500" 
                max="9" min="3" step="3" type="range" 
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                style={{
                  WebkitAppearance: 'none',
                  background: `linear-gradient(to right, #2563eb 0%, #8b5cf6 ${((duration - 3) / 6) * 100}%, #1e293b ${((duration - 3) / 6) * 100}%)`,
                  borderRadius: '10px'
                }}
              />
              <style>{`
                input[type=range]::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  height: 20px;
                  width: 20px;
                  border-radius: 50%;
                  background: white;
                  border: 4px solid #2563eb;
                  box-shadow: 0 0 20px rgba(37, 99, 235, 0.5);
                  cursor: pointer;
                  transition: transform 0.2s;
                }
                input[type=range]::-webkit-slider-thumb:hover {
                  transform: scale(1.1);
                }
              `}</style>
              
              <div className="flex justify-between mt-5 px-1">
                {[3, 6, 9].map((val) => (
                  <div key={val} className="flex flex-col items-center">
                    <div className={`w-0.5 h-2.5 mb-2 transition-colors duration-500 ${duration >= val ? 'bg-blue-500' : 'bg-slate-800'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${duration === val ? 'text-blue-400' : 'text-slate-700'}`}>
                      {val} Months
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Data Footer Metrics */}
          <div className="grid grid-cols-3 gap-6 mt-8 border-t border-white/5 pt-8 px-2">
            <StatMetric value={stats.stakeholders} valueSuffix="x" label="Active Contacts" />
            <StatMetric value={stats.avgCycle} valueSuffix="d" label="Avg Cycle (Days)" />
            <StatMetric value={stats.efficiency.toFixed(0)} valueSuffix="%" label="Deal Velocity" />
          </div>
        </div>
      </div>
    </div>
  );
}
