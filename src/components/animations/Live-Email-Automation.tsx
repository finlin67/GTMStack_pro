// FILE: LiveEmailAutomation.tsx
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Network, 
  BarChart3, 
  Zap, 
  Edit3, 
  Users, 
  LineChart, 
  CreditCard, 
  MousePointer2, 
  Eye, 
  Target 
} from 'lucide-react';

// --- Types ---
interface AutomationStats {
  revenue: number;
  performance: number;
  growth: number;
  status: string;
  syncTime: string;
  aiOps: number;
}

type ThemeMode = 'light' | 'dark';

const ACCENTS = {
  blue: '#1E40AF',
  orange: '#F97316',
  gold: '#EAB308'
};

// --- Sub-components ---

const FlowComet = ({ delay = 0, color }: { delay?: number, color: string }) => (
  <motion.div 
    animate={{ 
      y: ["-10%", "110%"],
      opacity: [0, 1, 1, 0]
    }}
    transition={{ repeat: Infinity, duration: 3, ease: "linear", delay }}
    className="absolute left-0 w-full h-32 pointer-events-none"
    style={{ 
      background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
      filter: 'blur(3px)' 
    }}
  />
);

const FeatureCard = ({ icon: Icon, color, label, sub, theme }: { icon: any, color: string, label: string, sub: string, theme: ThemeMode }) => {
  const isLight = theme === 'light';
  return (
    <motion.div 
      whileHover={{ y: -2, scale: 1.02 }}
      className={`rounded-xl p-3 flex items-center gap-3 transition-all cursor-pointer ${
        isLight 
          ? 'bg-white shadow-lg shadow-black/5 border border-slate-100 hover:shadow-xl' 
          : 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10'
      }`}
    >
      <div 
        className="size-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon style={{ color: color }} className="size-4" />
      </div>
      <div>
        <h4 className={`text-[10px] font-bold uppercase tracking-tight ${isLight ? 'text-slate-800' : 'text-white'}`}>{label}</h4>
        <p className={`text-[9px] leading-tight font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{sub}</p>
      </div>
    </motion.div>
  );
};

// --- Main Component ---

export default function LiveEmailAutomation() {
  const [theme, setTheme] = useState<ThemeMode | null>(null);
  const [stats, setStats] = useState<AutomationStats>({
    revenue: 12480.00,
    performance: 94.8,
    growth: 24,
    status: 'READY',
    syncTime: '0.4s',
    aiOps: 2419
  });

  // Theme selection on mount
  useEffect(() => {
    setTheme(Math.random() > 0.5 ? 'light' : 'dark');
  }, []);

  const updateStats = useCallback(() => {
    setStats(prev => {
      const revenueJitter = (Math.random() - 0.5) * 25;
      const performanceJitter = (Math.random() - 0.5) * 0.15;
      const syncJitter = (Math.random() * 0.5 + 0.1).toFixed(1);
      
      return {
        ...prev,
        revenue: Math.max(12000, prev.revenue + revenueJitter),
        performance: Math.min(99.9, Math.max(92, prev.performance + performanceJitter)),
        syncTime: `${syncJitter}s`
      };
    });

    const nextInterval = 2000 + Math.random() * 3000;
    const timeoutId = setTimeout(updateStats, nextInterval);
    return timeoutId;
  }, []);

  useEffect(() => {
    const timeoutId = updateStats();
    return () => clearTimeout(timeoutId);
  }, [updateStats]);

  const handleIntelligenceClick = useCallback(() => {
    setStats(prev => ({
      ...prev,
      aiOps: prev.aiOps + 1,
      performance: Math.min(99.9, prev.performance + 0.2)
    }));
  }, []);

  if (!theme) return null; // Prevent hydration mismatch / flash

  const isLight = theme === 'light';
  
  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden">
      {/* Background with subtle radial gradient */}
      <div 
        className={`w-full h-full max-w-[600px] max-h-[600px] aspect-square relative overflow-hidden p-8 flex flex-col font-display select-none transition-colors duration-1000`}
        style={{ 
          background: isLight 
            ? 'radial-gradient(circle at center, #FDFCFB 0%, #F3F4F6 100%)' 
            : 'radial-gradient(circle at center, #1E293B 0%, #0F172A 100%)'
        }}
      >
        
        {/* Shifting decorative blobs for high-fidelity depth */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            opacity: isLight ? [0.03, 0.05, 0.03] : [0.05, 0.1, 0.05]
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute -top-24 -right-24 size-[400px] blur-[100px] rounded-full pointer-events-none" 
          style={{ backgroundColor: ACCENTS.blue }}
        />
        
        <div className="w-full h-full flex flex-col relative z-10">
          
          {/* Top Status Header */}
          <div className={`absolute top-0 right-0 flex items-center gap-2 px-3 py-1 rounded-full border z-30 ${
            isLight ? 'bg-white shadow-sm border-slate-200' : 'bg-white/5 backdrop-blur-md border-white/10'
          }`}>
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="size-1.5 rounded-full"
              style={{ backgroundColor: ACCENTS.gold, boxShadow: `0 0 8px ${ACCENTS.gold}` }}
            />
            <span className={`text-[8px] font-bold tracking-widest uppercase ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              System: <span style={{ color: ACCENTS.gold }}>Active</span>
            </span>
          </div>

          {/* Title Section */}
          <div className="flex flex-col gap-0.5 mb-8">
            <h1 className={`text-2xl font-black tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Automation <span style={{ color: ACCENTS.blue }}>Intelligence</span>
            </h1>
            <p className={`text-[9px] font-bold uppercase tracking-[0.25em] ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>High Fidelity Deployment</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
            
            {/* Flow Column */}
            <div className="col-span-7 relative flex flex-col justify-between py-4">
              {/* Vertical flow path */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px pointer-events-none opacity-30"
                style={{ background: `linear-gradient(180deg, transparent, ${ACCENTS.blue}, ${ACCENTS.gold}, ${ACCENTS.orange}, transparent)` }}
              >
                <FlowComet color={ACCENTS.blue} />
                <FlowComet delay={1.5} color={ACCENTS.orange} />
              </div>

              {/* Step 01 */}
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border mb-3 ${
                  isLight ? 'bg-white border-slate-200 text-slate-500 shadow-sm' : 'bg-slate-800 border-white/10 text-slate-400'
                }`}>
                  Creation Phase
                </div>
                {/* Fix: changed 'shadow' to 'boxShadow' to fix TypeScript error in Framer Motion prop */}
                <motion.div 
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className={`rounded-2xl p-4 w-full max-w-[200px] transition-all cursor-pointer ${
                    isLight 
                      ? 'bg-white shadow-[0_15px_30px_rgba(0,0,0,0.06)] border border-slate-100' 
                      : 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Mail style={{ color: ACCENTS.blue }} className="size-4" />
                    <span className={`text-[10px] font-extrabold uppercase tracking-wide ${isLight ? 'text-slate-800' : 'text-white'}`}>Drafting</span>
                  </div>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden mb-2 ${isLight ? 'bg-slate-100' : 'bg-white/10'}`}>
                    <motion.div 
                      animate={{ width: ['0%', '100%'] }} 
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="h-full rounded-full" 
                      style={{ backgroundColor: ACCENTS.blue }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-500">Live Queue</span>
                    <span className="text-[8px] font-mono font-bold" style={{ color: ACCENTS.blue }}>{stats.status}</span>
                  </div>
                </motion.div>
              </div>

              {/* Step 02 - Intelligence Node */}
              <div className="relative z-10 flex flex-col items-center group">
                <motion.div 
                  onClick={handleIntelligenceClick}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative cursor-pointer"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }} 
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute inset-0 blur-2xl rounded-full"
                    style={{ backgroundColor: ACCENTS.gold }}
                  />
                  <motion.div 
                    variants={{
                      rest: { scale: 1, borderColor: isLight ? "#E2E8F0" : "rgba(255,255,255,0.1)", rotate: 0 },
                      hover: { scale: 1.2, borderColor: ACCENTS.gold, rotate: 5 },
                      tap: { scale: 0.9, rotate: -15 }
                    }}
                    className={`size-14 rounded-full flex items-center justify-center z-20 transition-colors border-2 shadow-xl ${
                      isLight ? 'bg-white' : 'bg-slate-900'
                    }`}
                  >
                    <Network style={{ color: ACCENTS.gold }} className="size-7" />
                  </motion.div>
                </motion.div>
                <span className={`text-[10px] font-black uppercase mt-3 tracking-widest ${isLight ? 'text-slate-800' : 'text-white'}`}>Intelligence</span>
              </div>

              {/* Step 03 */}
              <div className="relative z-10 w-full flex flex-col items-center">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl p-4 w-full max-w-[200px] transition-all cursor-pointer ${
                    isLight 
                      ? 'bg-white shadow-[0_15px_30px_rgba(0,0,0,0.06)] border border-slate-100' 
                      : 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target style={{ color: ACCENTS.orange }} className="size-4" />
                      <span className={`text-[10px] font-extrabold uppercase tracking-wide ${isLight ? 'text-slate-800' : 'text-white'}`}>Payout</span>
                    </div>
                    <Zap className="size-3 animate-pulse" style={{ color: ACCENTS.orange }} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      ${stats.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-[10px] font-bold text-green-500">+{stats.growth}%</span>
                  </div>
                  <div className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter mt-1">Net Performance Increase</div>
                </motion.div>
                <div className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border mt-3 ${
                  isLight ? 'bg-white border-slate-200 text-slate-500 shadow-sm' : 'bg-slate-800 border-white/10 text-slate-400'
                }`}>
                  Conversion End
                </div>
              </div>
            </div>

            {/* Feature Sidebar */}
            <div className="col-span-5 flex flex-col gap-4 py-4 min-h-0">
              <FeatureCard icon={Edit3} color={ACCENTS.blue} label="Assets" sub="Polished design." theme={theme} />
              <FeatureCard icon={Users} color={ACCENTS.gold} label="Audiences" sub="Smart segment." theme={theme} />
              <FeatureCard icon={LineChart} color={ACCENTS.orange} label="Analytics" sub="Deep insights." theme={theme} />
              
              <div className="mt-auto">
                <div className={`rounded-2xl p-5 border relative overflow-hidden transition-all ${
                  isLight ? 'bg-white shadow-xl border-slate-100' : 'bg-white/5 border-white/10 backdrop-blur-md shadow-2xl shadow-black/20'
                }`}>
                  <motion.div 
                    animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 5 }} 
                    className="absolute -bottom-10 -right-10 size-32 rounded-full blur-3xl"
                    style={{ backgroundColor: ACCENTS.blue }}
                  />
                  <div className="relative z-10">
                    <div className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-2 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                      Performance Core
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {stats.performance.toFixed(1)}
                      </span>
                      <span className="text-xs font-bold text-slate-500">%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full mt-3 overflow-hidden bg-slate-200/50">
                      <motion.div 
                        animate={{ width: `${stats.performance}%` }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: ACCENTS.gold }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className={`mt-8 border-t pt-5 flex justify-between items-center px-1 ${
            isLight ? 'border-slate-200' : 'border-white/5'
          }`}>
            <div className="flex items-center gap-5">
              {[
                { label: 'Map', icon: MousePointer2, color: ACCENTS.blue },
                { label: `Ops: ${stats.aiOps.toLocaleString()}`, icon: Eye, color: ACCENTS.gold },
                { label: 'Target', icon: Target, color: ACCENTS.orange }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 group cursor-pointer">
                  <item.icon style={{ color: item.color }} className="size-3.5 transition-transform group-hover:scale-125" />
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${isLight ? 'text-slate-500 group-hover:text-slate-800' : 'text-slate-500 group-hover:text-white'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
            }`}>
              <div className="size-1.5 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" style={{ backgroundColor: '#22C55E' }} />
              <span className="text-[9px] font-extrabold text-green-500 tracking-widest uppercase">
                LATENCY: {stats.syncTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
