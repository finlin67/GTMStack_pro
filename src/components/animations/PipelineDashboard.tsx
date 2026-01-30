'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Gauge,
  Bell,
  Settings,
  Target,
  Flame,
  ShieldCheck,
  Activity,
  Wind,
  TrendingUp,
  AlertTriangle,
  X,
  Share2
} from 'lucide-react';

// Utility for tabular numbers
const TabularNum = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <span className={`tabular-nums ${className}`}>{children}</span>
);

export default function PipelineDashboard() {
  const navigate = useNavigate();

  // --- State ---
  const [gaugeValue, setGaugeValue] = useState(78);
  const [stats, setStats] = useState({
    leads: 12482,
    warm: 3891,
    mqls: 842,
    conversion: 12.4,
    throughput: 1.2,
    latency: 140,
  });
  const [showToast, setShowToast] = useState(true);

  // --- Live Data Simulation ---
  useEffect(() => {
    const interval = setInterval(() => {
      // Jitter the gauge value
      setGaugeValue(prev => {
        const change = (Math.random() - 0.5) * 4; // +/- 2
        return Math.min(100, Math.max(0, prev + change));
      });

      // Jitter stats
      setStats(prev => ({
        ...prev,
        leads: prev.leads + Math.floor(Math.random() * 3),
        throughput: parseFloat((prev.throughput + (Math.random() - 0.5) * 0.1).toFixed(1)),
        latency: Math.floor(Math.max(100, Math.min(200, prev.latency + (Math.random() - 0.5) * 10))),
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // --- Gauge Calculation ---
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const maxFillLength = 377;
  const strokeDashoffset = circumference - ((gaugeValue / 100) * maxFillLength);

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0b1224] p-4 font-sans text-white">
      {/* Tile Container: constrained max width/height, responsive */}
      <div className="w-full h-full max-w-[600px] max-h-[600px] bg-[#161f31]/70 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col overflow-hidden relative shadow-2xl ring-1 ring-white/5">
        
        {/* Background Gradients */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#3abff8]/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#161f31]/50 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-[#3abff8] rounded-lg flex items-center justify-center text-[#0b1224] shadow-lg shadow-[#3abff8]/20">
              <Gauge size={20} strokeWidth={3} />
            </div>
            <h2 className="text-white text-base font-bold tracking-tight">
              Pipeline Command
            </h2>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold tracking-widest text-emerald-400">LIVE</span>
              </div>
            <div className="flex gap-1.5">
              <button className="flex items-center justify-center rounded-lg size-8 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all">
                <Bell size={16} />
              </button>
              <button className="flex items-center justify-center rounded-lg size-8 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all">
                <Settings size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col p-4 sm:p-6 gap-6 relative z-10 no-scrollbar">
          
          {/* Top Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center text-center gap-1 group hover:bg-white/10 transition-colors">
              <Target className="text-[#3abff8] mb-1 group-hover:scale-110 transition-transform" size={20} />
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Leads</p>
              <p className="text-lg font-black tracking-tight"><TabularNum>{stats.leads.toLocaleString()}</TabularNum></p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center text-center gap-1 group hover:bg-white/10 transition-colors">
              <Flame className="text-amber-400 mb-1 group-hover:scale-110 transition-transform" size={20} />
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Warm</p>
              <p className="text-lg font-black tracking-tight"><TabularNum>{stats.warm.toLocaleString()}</TabularNum></p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center text-center gap-1 group hover:bg-white/10 transition-colors">
              <ShieldCheck className="text-purple-400 mb-1 group-hover:scale-110 transition-transform" size={20} />
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">MQLs</p>
              <p className="text-lg font-black tracking-tight"><TabularNum>{stats.mqls}</TabularNum></p>
            </div>
          </div>

          {/* Gauge Section */}
          <div className="flex-1 flex flex-col items-center justify-center min-h-[220px] relative">
            <div className="absolute top-0 flex items-center gap-2 opacity-50">
               <Activity className="text-[#3abff8]" size={16} />
               <span className="text-xs font-bold tracking-widest uppercase text-[#3abff8]">Pressure</span>
            </div>

            <div className="relative w-48 h-48 sm:w-56 sm:h-56">
               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="gaugeTileGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#3abff8', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  
                  {/* Track */}
                  <circle
                    className="text-white/5"
                    cx="100"
                    cy="100"
                    fill="none"
                    r="80"
                    stroke="currentColor"
                    strokeDasharray="377" 
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeWidth="10"
                  />
                  
                  {/* Progress Arc */}
                  <motion.circle
                    className="drop-shadow-[0_0_10px_rgba(58,191,248,0.3)]"
                    cx="100"
                    cy="100"
                    fill="none"
                    r="80"
                    stroke="url(#gaugeTileGradient)"
                    strokeDasharray="502"
                    strokeLinecap="round"
                    strokeWidth="12"
                    initial={{ strokeDashoffset: 502 }}
                    animate={{ strokeDashoffset: strokeDashoffset }}
                    transition={{ type: "spring", stiffness: 60, damping: 20 }}
                  />
                </svg>

                {/* Needle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                      className="w-1 h-20 bg-gradient-to-t from-[#3abff8] to-transparent rounded-full origin-bottom absolute bottom-1/2 left-[calc(50%-2px)]"
                      initial={{ rotate: 75 }}
                      animate={{ 
                        rotate: 75 + ((gaugeValue - 78) * 1.5), 
                        x: [0, 0.5, -0.5, 0]
                      }}
                      transition={{ type: "spring", damping: 10, stiffness: 100 }}
                      style={{ transformOrigin: '50% 100%' }}
                    >
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#3abff8] rounded-full shadow-[0_0_10px_#3abff8]"></div>
                    </motion.div>
                </div>

                 {/* Text Center */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter tabular-nums">
                       <TabularNum>{Math.round(gaugeValue)}</TabularNum>
                       <span className="text-lg text-white/30 align-top ml-1">%</span>
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1">Load</span>
                 </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-3">
             <div className="flex justify-between items-end px-1">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Conversion Rate</p>
                <p className="text-emerald-400 text-sm font-bold">{stats.conversion}%</p>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-emerald-500 rounded-full" 
                  initial={{ width: "60%" }}
                  animate={{ width: `${60 + (Math.random() * 10)}%` }}
                  transition={{ duration: 2 }}
                />
             </div>
             <button 
                onClick={() => setGaugeValue(Math.max(0, gaugeValue - 20))}
                className="mt-2 w-full bg-[#3abff8]/10 hover:bg-[#3abff8]/20 text-[#3abff8] py-3 rounded-xl font-bold text-xs transition-all border border-[#3abff8]/20 flex items-center justify-center gap-2 group active:scale-95"
              >
                <Wind size={14} className="group-hover:rotate-180 transition-transform duration-700" />
                RELEASE PRESSURE
              </button>
          </div>

          {/* Footer Metrics (Simplified) */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 opacity-50">
             <div className="flex items-center gap-1.5 justify-center">
                <Share2 size={12} className="text-[#3abff8]" />
                <span className="text-[10px] font-medium">24 Nodes</span>
             </div>
             <div className="flex items-center gap-1.5 justify-center">
                <TrendingUp size={12} className="text-emerald-500" />
                <span className="text-[10px] font-medium"><TabularNum>{stats.throughput.toFixed(1)}k</TabularNum>/hr</span>
             </div>
             <div className="flex items-center gap-1.5 justify-center">
                <AlertTriangle size={12} className="text-amber-500" />
                <span className="text-[10px] font-medium"><TabularNum>{stats.latency}</TabularNum>ms</span>
             </div>
          </div>

        </div>

        {/* Tiny Toast (Absolute to Tile) */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-4 right-4 bg-[#161f31]/95 backdrop-blur-md shadow-2xl p-3 rounded-xl border border-emerald-500/30 flex flex-col gap-2 z-50 max-w-[220px] w-full"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
                  <p className="text-xs font-medium text-white/90 truncate">
                    New Lead: <span className="text-[#3abff8]">Acme Corp</span>
                  </p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowToast(false); }}
                  className="text-white/20 hover:text-white transition-colors shrink-0"
                >
                  <X size={14} />
                </button>
              </div>
              
              <button 
                className="w-full py-1.5 px-3 bg-[#3abff8]/10 hover:bg-[#3abff8]/20 text-[#3abff8] rounded-lg text-[10px] font-bold uppercase tracking-wide border border-[#3abff8]/20 transition-all active:scale-95 flex items-center justify-center hover:shadow-[0_0_10px_rgba(58,191,248,0.2)]"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/lead/12345');
                }}
              >
                View Details
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}