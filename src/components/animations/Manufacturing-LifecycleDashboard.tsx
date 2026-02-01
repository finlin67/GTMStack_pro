'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  Package, 
  Layers, 
  BarChart3, 
  CheckCircle2, 
  Truck, 
  BadgeCheck, 
  TrendingUp, 
  Settings,
  Zap,
  Activity
} from 'lucide-react';

interface LiveStats {
  speed: number;
  growth: number;
  history: number[];
}

/**
 * MfgLifecycleDashboard - A responsive hero tile visualization for manufacturing analytics.
 * Adheres to 600x600 constraint while maintaining fluid scalability.
 */
export default function MfgLifecycleDashboard() {
  const [isImpact, setIsImpact] = useState(false);
  const [stats, setStats] = useState<LiveStats>({
    speed: 94.2,
    growth: 2.1,
    history: [80, 60, 95, 45, 35, 75, 85]
  });

  // Jitter logic for production data simulation
  const updateStats = useCallback(() => {
    setStats(prev => {
      const jitter = (Math.random() - 0.5) * 0.4;
      const newSpeed = Math.min(Math.max(prev.speed + jitter, 92), 98);
      const newHistory = prev.history.map(h => 
        Math.min(Math.max(h + (Math.random() - 0.5) * 5, 20), 100)
      );
      return {
        speed: parseFloat(newSpeed.toFixed(1)),
        growth: prev.growth + (Math.random() - 0.5) * 0.1,
        history: newHistory
      };
    });
    const nextTick = Math.random() * 2000 + 1000;
    setTimeout(updateStats, nextTick);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateStats, 1500);
    return () => clearTimeout(timer);
  }, [updateStats]);

  const lifecycleSteps = [
    { icon: Package, label: 'Design' },
    { icon: Layers, label: 'Proto' },
    { icon: BarChart3, label: 'Prod' },
    { icon: CheckCircle2, label: 'Qual' },
    { icon: Truck, label: 'Deliv' },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden bg-transparent">
      {/* Outer constraint for 600x600 logic */}
      <div className="relative w-full h-full max-w-[600px] max-h-[600px] bg-[#131022] text-white selection:bg-indigo-500/30 font-display flex flex-col shadow-2xl overflow-hidden rounded-xl">
        
        {/* Animated Background Decor */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[80px]"
            animate={{
              x: [0, 40, 0],
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[100px]"
            animate={{
              x: [0, -30, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-[#131022] to-violet-900/10" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-indigo-400">
            <Factory className="w-5 h-5" />
            <h2 className="text-xs font-bold tracking-widest uppercase">Mfg Agency</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 rounded-full border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold text-green-400">LIVE</span>
            </div>
            <button className="bg-indigo-600 text-white px-3 py-1 rounded text-[9px] font-bold hover:bg-indigo-500 transition-all uppercase">
              Contact
            </button>
          </div>
        </header>

        {/* Hero & Toggle */}
        <section className="relative z-10 px-6 pt-5 text-center flex-shrink-0">
          <h1 className="text-xl sm:text-2xl font-black tracking-tighter leading-tight mb-3">
            Manufacturing Lifecycle
          </h1>
          
          <div className="flex flex-col items-center gap-3">
            <label className="inline-flex items-center cursor-pointer group scale-90 sm:scale-100">
              <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${!isImpact ? 'text-white' : 'text-blue-300/50'}`}>Standard</span>
              <div className="relative mx-3" onClick={() => setIsImpact(!isImpact)}>
                <div className={`w-11 h-6 rounded-full transition-all ${isImpact ? 'bg-indigo-500' : 'bg-white/10'}`}>
                  <motion.div 
                    className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 shadow-lg"
                    animate={{ x: isImpact ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${isImpact ? 'text-white' : 'text-blue-300/50'}`}>Impact</span>
            </label>
          </div>
        </section>

        {/* Lifecycle Visualization */}
        <section className="relative z-10 px-6 sm:px-8 py-4 flex-shrink-0">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute -inset-x-full inset-y-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-0"
              animate={{ left: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />

            <AnimatePresence>
              {isImpact && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  className="absolute top-2 right-2 z-20"
                >
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-2 py-0.5 rounded text-[8px] font-black shadow-lg flex items-center gap-1">
                    <BadgeCheck className="w-2.5 h-2.5" /> OPTIMIZED
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between relative z-10 mb-6">
              <div className="absolute top-[18px] left-[10%] right-[10%] h-[1px] bg-white/10">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"
                  animate={{ width: isImpact ? "100%" : "50%" }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              {lifecycleSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all border ${idx === 0 ? 'bg-indigo-600 border-indigo-400' : 'bg-[#1a162e] border-white/10'}`}>
                    <step.icon className={`w-4 h-4 ${idx === 0 ? 'text-white' : 'text-white/40'}`} />
                  </div>
                  <p className={`text-[8px] font-bold uppercase tracking-tighter ${idx === 0 ? 'text-white' : 'text-white/40'}`}>{step.label}</p>
                </div>
              ))}
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 relative z-10">
              {[
                { key: 'defect', label: 'Defect Rate', std: '1.8%', impact: '0.2%' },
                { key: 'yield', label: 'Yield Output', std: '84%', impact: '99.8%' },
                { key: 'throughput', label: 'Throughput', std: '69%', impact: '94%' }
              ].map((metric) => (
                <motion.div 
                  key={metric.key}
                  animate={{ borderColor: isImpact ? "rgba(129,140,248,0.4)" : "rgba(255,255,255,0.05)" }}
                  className="bg-black/20 p-2.5 rounded-lg border border-white/5"
                >
                  <p className="text-[7px] text-indigo-300 font-bold uppercase mb-1">{metric.label}</p>
                  <AnimatePresence mode="wait">
                    {!isImpact ? (
                      <motion.p key="std" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm sm:text-base font-black tracking-tight">{metric.std}</motion.p>
                    ) : (
                      <motion.p key="impact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm sm:text-base font-black text-emerald-400 tracking-tight">{metric.impact}</motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Performance Chart - Fluid Grow */}
        <section className="relative z-10 px-6 sm:px-8 pb-6 flex-grow flex flex-col min-h-0">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col h-full backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Real-time Feed</p>
                <h3 className="text-xs font-bold">Speed: <span className="text-indigo-400">{stats.speed}%</span></h3>
              </div>
              <div className="flex gap-1 items-center">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <p className="text-[9px] text-emerald-400 font-bold">+{stats.growth.toFixed(1)}%</p>
              </div>
            </div>

            <div className="flex-grow flex items-end justify-between gap-1.5 min-h-[60px]">
              {stats.history.map((val, i) => (
                <div key={i} className="flex flex-col items-center flex-1 h-full justify-end gap-1.5">
                  <motion.div 
                    className="w-full bg-indigo-500/10 border-t-2 border-indigo-400/50 rounded-t-sm relative group"
                    animate={{ height: `${val}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <div className="absolute inset-0 bg-indigo-400/0 group-hover:bg-indigo-400/10 transition-colors" />
                  </motion.div>
                  <span className="text-[7px] font-black text-white/30 uppercase">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 px-8 py-3 bg-[#0a0815]/80 backdrop-blur-md flex items-center justify-between border-t border-white/5 flex-shrink-0">
          <p className="text-[7px] text-white/30 font-bold uppercase tracking-widest">© 2025 MFG Precision</p>
          <div className="flex items-center gap-3 opacity-50">
            <TrendingUp className="w-3 h-3" />
            <Settings className="w-3 h-3" />
            <Zap className="w-3 h-3" />
          </div>
        </footer>
      </div>
    </div>
  );
}