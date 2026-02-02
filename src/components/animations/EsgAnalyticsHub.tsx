'use client';

import React, { useState, useEffect, useCallback, useRef, useId } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useSpring, useTransform, type Variants } from "framer-motion";
import { 
  Leaf, 
  Search, 
  Download, 
  TrendingUp, 
  Sun, 
  BarChart3, 
  CreditCard, 
  Settings, 
  ShieldCheck, 
  Award, 
  Globe, 
  Zap, 
  Users
} from 'lucide-react';

/**
 * FILE: EsgAnalyticsHub.tsx
 * ROLE: Senior React Architect
 * GOAL: Monolithic library file containing all logic, types, and sub-components.
 */

// --- Interfaces ---
interface DashboardStats {
  carbonReduction: number;
  energySavings: number;
  roiScore: number;
  impactGrowth: number;
  carbonCredits: number;
  reportingStatus: number;
}

// --- Sub-components (Flattened) ---

/**
 * AnimatedCounter
 * Smoothly interpolates numbers using Framer Motion springs.
 */
function AnimatedCounter({ value, decimals = 0 }: { value: number, decimals?: number }) {
  const spring = useSpring(value, { mass: 0.5, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => current.toFixed(decimals));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

/**
 * MetricCard
 * Standard data display card with hover effects.
 */
function MetricCard({ title, value, trend, icon, variants }: { title: string; value: number; trend: string; icon: React.ReactNode, variants?: Variants }) {
  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -4, backgroundColor: 'rgba(23, 27, 36, 0.9)', transition: { duration: 0.2 } }}
      className="bg-[#12151c]/80 border border-[rgba(255,255,255,0.08)] rounded-xl p-4 flex flex-col justify-between h-28 group cursor-default"
    >
      <div className="flex justify-between items-start">
        <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-500 group-hover:text-emerald-400 transition-colors">
          {icon}
        </div>
        <div className="flex items-center gap-1 text-green-400 text-[10px] font-bold bg-green-400/5 px-1.5 py-0.5 rounded">
          <TrendingUp className="w-3 h-3" />
          <span>{trend}</span>
        </div>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium mb-1">{title}</p>
        <p className="text-2xl font-display font-bold text-white">
          <AnimatedCounter value={value} />
        </p>
      </div>
    </motion.div>
  );
}

/**
 * QuickStat
 * Small icon-label pair for high density data.
 */
function QuickStat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(23, 27, 36, 0.8)' }}
      className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#171b24]/40 border border-[rgba(255,255,255,0.05)] text-center cursor-default"
    >
      <div className="text-emerald-500 mb-1 opacity-80">{icon}</div>
      <span className="text-[9px] font-bold text-gray-400 uppercase leading-tight">{label}</span>
    </motion.div>
  );
}

/**
 * MiniChart
 * Pure SVG micro-chart with morphing paths for organic activity.
 */
function MiniChart() {
  const id = useId();
  const path1 = "M0 25 C20 20, 40 22, 50 15 S80 5, 100 10";
  const path2 = "M0 25 C20 25, 40 10, 50 20 S80 15, 100 5";
  const path3 = "M0 25 C20 15, 40 25, 50 10 S80 20, 100 15";

  return (
    <svg height="100%" width="100%" viewBox="0 0 100 30" preserveAspectRatio="none" className="overflow-visible">
      <defs>
        <linearGradient id={`chartGradient-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="1" />
        </linearGradient>
      </defs>
      <motion.path 
        d={path1}
        animate={{ 
          d: [path1, path2, path3, path1],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        fill="none" 
        stroke={`url(#chartGradient-${id})`} 
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M0 30 L100 30" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

// --- Main Application Component ---
export default function EsgAnalyticsHub() {
  const [stats, setStats] = useState<DashboardStats>({
    carbonReduction: 1240,
    energySavings: 450,
    roiScore: 84.2,
    impactGrowth: 15.2,
    carbonCredits: 150.00,
    reportingStatus: 92
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Simulation Logic: Organic data jitter
  const updateMetrics = useCallback(() => {
    setStats(prev => ({
      ...prev,
      carbonReduction: prev.carbonReduction + (Math.random() - 0.5) * 5,
      energySavings: prev.energySavings + (Math.random() - 0.5) * 2,
      roiScore: Math.min(100, Math.max(0, prev.roiScore + (Math.random() - 0.5) * 1.5)),
      carbonCredits: prev.carbonCredits + (Math.random() > 0.8 ? 0.05 : 0),
    }));

    const nextTick = 2000 + Math.random() * 2000;
    timeoutRef.current = setTimeout(updateMetrics, nextTick);
  }, []);

  useEffect(() => {
    updateMetrics();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [updateMetrics]);

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  return (
    <div className="w-full h-full aspect-square flex items-center justify-center bg-slate-900 font-sans p-4">
      {/* Inject fonts strictly for this component */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Noto Sans', sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* HERO TILE CONTAINER: Responsive Constraint (max-w/h 600px) */}
      <div className="relative w-full h-full max-w-[600px] max-h-[600px] overflow-hidden bg-[#0a0c10] text-white rounded-2xl shadow-2xl border border-[rgba(255,255,255,0.08)] flex flex-col">
        
        {/* Ambient Background Animation */}
        <div className="absolute inset-0 -z-0 pointer-events-none overflow-hidden opacity-30">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-emerald-900/20 rounded-full blur-[80px]"
          />
          <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-teal-900/20 rounded-full blur-[100px]"
          />
        </div>

        {/* Header */}
        <header className="relative z-20 flex items-center justify-between px-5 py-4 border-b border-[rgba(255,255,255,0.08)] bg-[#0a0c10]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="size-8 text-emerald-500 bg-emerald-500/10 rounded-lg flex items-center justify-center"
            >
              <Leaf className="w-5 h-5" />
            </motion.div>
            <h2 className="text-white text-lg font-display font-bold leading-tight">ESG Hub</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-400/10 border border-green-400/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
              </span>
              <span className="text-green-400 text-[10px] font-bold tracking-wider uppercase">Live</span>
            </div>
            <div className="size-8 rounded-full bg-gray-700 border border-[rgba(255,255,255,0.08)] overflow-hidden relative">
               <Image
                 src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
                 alt="User"
                 fill
                 className="object-cover"
                 sizes="32px"
               />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10 flex-1 overflow-y-auto scrollbar-hide p-5 space-y-5">
          
          {/* Section Title */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-display font-bold text-white mb-1">Impact ROI</h1>
              <p className="text-xs text-gray-400 max-w-[200px]">Real-time sustainability metrics.</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#0f3a3a" }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-gradient-to-r from-green-400 to-teal-600 text-[#0a0c10] rounded-lg shadow-lg shadow-green-400/20"
            >
              <Download className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Grid Layout */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            
            {/* FEATURE: Composite ROI Gauge */}
            <motion.div 
              variants={itemVariants}
              className="col-span-2 bg-[#171b24]/60 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[220px]"
            >
               {/* Internal Ambient Glows */}
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute top-0 right-0 w-40 h-40 bg-green-400/10 rounded-full blur-[60px] -mr-20 -mt-20" 
               />
               <motion.div 
                 animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
                 transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                 className="absolute bottom-0 left-0 w-40 h-40 bg-teal-600/10 rounded-full blur-[60px] -ml-20 -mb-20" 
               />
               
               <h3 className="text-white font-display font-semibold mb-6 z-10">Composite ROI Score</h3>
               
               {/* Gauge Visual */}
               <div className="relative w-48 h-24 mb-4 overflow-hidden z-10">
                  <div className="w-48 h-48 rounded-full opacity-90" style={{
                    background: 'conic-gradient(from 180deg at 50% 100%, #4ade80 0deg, #10b981 90deg, #0d9488 180deg)',
                    mask: 'radial-gradient(farthest-side, transparent 70%, white 71%)',
                    WebkitMask: 'radial-gradient(farthest-side, transparent 70%, white 71%)'
                  }}></div>
                  <div className="absolute inset-0 flex items-end justify-center pb-2">
                    <div className="text-center">
                      <p className="text-4xl font-display font-bold text-white">
                        <AnimatedCounter value={stats.roiScore} decimals={1} />
                      </p>
                    </div>
                  </div>
                  <motion.div 
                    className="absolute bottom-0 left-1/2 w-0.5 h-24 bg-white origin-bottom -translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,1)]"
                    animate={{ rotate: (stats.roiScore - 50) * 1.8 }}
                    transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1.2 }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full absolute bottom-0 -left-[3px] shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                  </motion.div>
               </div>
               
               {/* Gauge Footer Stats */}
               <div className="flex justify-between w-full px-4 pt-4 border-t border-[rgba(255,255,255,0.08)] z-10">
                  <div className="text-center">
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Risk</p>
                    <p className="text-white font-bold text-sm">Low</p>
                  </div>
                  <div className="text-center border-x border-[rgba(255,255,255,0.08)] px-4">
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Projected</p>
                    <p className="text-green-400 font-bold text-sm">+42.5%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Conf.</p>
                    <p className="text-white font-bold text-sm">98%</p>
                  </div>
               </div>
            </motion.div>

            {/* FEATURE: Metric Cards */}
            <MetricCard 
              variants={itemVariants}
              title="Carbon (T)" 
              value={stats.carbonReduction} 
              trend="+12.4%" 
              icon={<Leaf className="w-4 h-4" />} 
            />

            <MetricCard 
              variants={itemVariants}
              title="Energy (MWh)" 
              value={stats.energySavings} 
              trend="+8.2%" 
              icon={<Sun className="w-4 h-4" />} 
            />

            {/* FEATURE: Compliance Progress Tracker */}
            <motion.div 
              variants={itemVariants}
              className="col-span-2 bg-[#171b24]/60 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-xl p-5"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Compliance</span>
                </div>
                <span className="text-green-400 font-bold text-sm">{stats.reportingStatus}%</span>
              </div>
              <div className="relative w-full h-1.5 bg-[#0a0c10] rounded-full overflow-hidden mb-4">
                <motion.div 
                  className="relative h-full bg-gradient-to-r from-green-400 to-teal-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.reportingStatus}%` }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                   {/* Shimmer Effect */}
                   <motion.div 
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   />
                </motion.div>
              </div>
              <div className="flex justify-between items-end">
                 <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Wallet</p>
                    <p className="text-white font-bold text-lg">{stats.carbonCredits.toFixed(2)} <span className="text-xs text-gray-500 font-normal">CR</span></p>
                 </div>
                 <div className="h-8 w-24">
                   <MiniChart />
                 </div>
              </div>
            </motion.div>

            {/* FEATURE: Quick Stats Grid */}
            <motion.div 
              variants={itemVariants}
              className="col-span-2 grid grid-cols-4 gap-2 pt-2"
            >
               <QuickStat icon={<Globe className="w-3 h-3" />} label="Top 4%" />
               <QuickStat icon={<ShieldCheck className="w-3 h-3" />} label="ISO 14k" />
               <QuickStat icon={<Zap className="w-3 h-3" />} label="74% Mix" />
               <QuickStat icon={<Users className="w-3 h-3" />} label="Synced" />
            </motion.div>

          </motion.div>
        </main>
      </div>
    </div>
  );
}
