'use client';

// FILE: MarketingFlowDashboard.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Lightbulb, 
  FileText, 
  FileEdit, 
  Share2, 
  TrendingUp, 
  Instagram, 
  Linkedin, 
  BarChart3, 
  MousePointer2,
  Zap,
  Activity,
  Users
} from 'lucide-react';

// --- Types ---
interface Stats {
  views: number;
  conversion: number;
  echoBars: number[];
  flowVelocities: number[];
  orbsInPipeline: number[];
}

// --- Components ---

const CompactWorkflowStep = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  status, 
  velocity, 
  isLast = false,
  stepIndex
}: { 
  icon: any, 
  title: string, 
  subtitle: string, 
  status: string, 
  velocity: number, 
  isLast?: boolean,
  stepIndex: number
}) => {
  const isActive = status.toLowerCase() === 'active';
  const isProcessing = status.toLowerCase() === 'processing';
  
  return (
    <div className="relative flex items-center gap-3 z-10">
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-[1.15rem] top-10 bottom-[-1rem] w-[2px] bg-[#2C097F]/30 overflow-hidden rounded-full">
            <motion.div 
                animate={{ height: ["0%", "100%"], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: stepIndex * 0.5 }}
                className="w-full bg-cyan-400 blur-[1px]"
            />
        </div>
      )}

      {/* Icon Orb */}
      <div className={`
        relative shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500
        ${isActive || isProcessing 
          ? 'bg-[#2C097F]/40 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
          : 'bg-[#1a1122] border-slate-700/50 text-slate-500'}
      `}>
        <Icon className={`w-5 h-5 ${isActive || isProcessing ? 'text-cyan-400' : 'text-slate-600'}`} />
        
        {/* Pulsing Ring for Active */}
        {(isActive || isProcessing) && (
          <motion.div 
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-xl border border-cyan-400"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 bg-[#1a1122]/40 border border-slate-800/50 rounded-lg p-2.5 hover:border-cyan-500/30 transition-colors backdrop-blur-sm">
        <div className="flex justify-between items-start mb-1.5">
          <div>
            <h4 className="text-sm font-bold text-slate-100 leading-none mb-0.5">{title}</h4>
            <p className="text-[10px] text-slate-400 font-medium truncate">{subtitle}</p>
          </div>
          <span className={`
            text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider
            ${isActive 
              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
              : isProcessing 
                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                : 'bg-slate-800 text-slate-600 border-transparent'}
          `}>
            {status}
          </span>
        </div>
        
        {/* Micro Progress Bar */}
        <div className="h-1 w-full bg-[#151022] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${velocity}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full rounded-full ${isActive ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-slate-700'}`}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="bg-[#1a1122]/60 border border-slate-800/60 p-3 rounded-lg backdrop-blur-md">
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`w-3.5 h-3.5 ${color}`} />
      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{label}</span>
    </div>
    <div className="flex items-end justify-between">
      <span className="text-xl font-bold text-slate-100 tracking-tight">{value}</span>
      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1 py-0.5 rounded flex items-center">
        <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> {trend}
      </span>
    </div>
  </div>
);

export default function MarketingFlowDashboard() {
  const [stats, setStats] = useState<Stats>({
    views: 14284,
    conversion: 4.2,
    echoBars: [40, 65, 50, 85, 60, 30, 70, 45, 90, 55, 35, 75],
    flowVelocities: [100, 74, 15, 0],
    orbsInPipeline: [12, 8, 4, 0]
  });

  const updateStats = useCallback(() => {
    setStats(prev => {
      const jitter = (Math.random() - 0.5) * 8;
      const newViews = Math.floor(prev.views + jitter + 2);
      const newConversion = Number((prev.conversion + (Math.random() * 0.06 - 0.03)).toFixed(1));
      
      const newEchoBars = prev.echoBars.map(h => {
        const change = (Math.random() - 0.5) * 20;
        return Math.max(15, Math.min(100, h + change));
      });
      
      const newVelocities = [...prev.flowVelocities];
      // Simulate flow
      newVelocities[1] = newVelocities[1] >= 100 ? 0 : newVelocities[1] + 2;
      newVelocities[2] = newVelocities[2] >= 100 ? 0 : newVelocities[2] + 1.5;
      
      return {
        ...prev,
        views: newViews,
        conversion: Math.max(0, newConversion),
        echoBars: newEchoBars,
        flowVelocities: newVelocities
      };
    });

    const timeoutId = setTimeout(updateStats, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const cleanup = updateStats();
    return () => cleanup && cleanup();
  }, [updateStats]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#0F0A19] font-display p-4">
        <div className="w-full h-full max-w-[600px] max-h-[600px] bg-[#0F0A19] text-slate-200 overflow-hidden relative select-none flex flex-col p-5 shadow-2xl">
        {/* Background Ambience */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#2C097F]/30 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[80px]" />
        </div>

        {/* Header */}
        <header className="flex items-center justify-between mb-5 relative z-20">
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2C097F] to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-indigo-400/20">
                <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
                <h1 className="text-lg font-bold text-white leading-tight tracking-tight">MarketingFlow</h1>
                <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">System Operational</span>
                </div>
            </div>
            </div>
            <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-[#1a1122] border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">
                    <Activity className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-[#1a1122] border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">
                    <Users className="w-4 h-4" />
                </button>
            </div>
        </header>

        {/* Main Grid */}
        <main className="grid grid-cols-12 gap-4 flex-1 min-h-0 relative z-10">
            
            {/* Left Column: Workflow (Span 7) */}
            <div className="col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Pipeline</h3>
                <span className="text-[10px] bg-[#2C097F]/30 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/20 font-medium">
                    4 Campaigns
                </span>
            </div>
            
            <div className="flex-1 bg-[#151022]/40 border border-[#2C097F]/20 rounded-2xl p-4 backdrop-blur-sm relative flex flex-col justify-between space-y-2">
                <CompactWorkflowStep 
                    stepIndex={0}
                    icon={Lightbulb} 
                    title="Ideate" 
                    subtitle="AI Strategy Spark" 
                    status="Active" 
                    velocity={stats.flowVelocities[0]} 
                />
                <CompactWorkflowStep 
                    stepIndex={1}
                    icon={FileText} 
                    title="Create" 
                    subtitle="Multi-format Gen" 
                    status="Processing" 
                    velocity={stats.flowVelocities[1]} 
                />
                <CompactWorkflowStep 
                    stepIndex={2}
                    icon={FileEdit} 
                    title="Optimize" 
                    subtitle="SEO Alignment" 
                    status="Processing" 
                    velocity={stats.flowVelocities[2]} 
                />
                <CompactWorkflowStep 
                    stepIndex={3}
                    icon={Share2} 
                    title="Publish" 
                    subtitle="Omnichannel" 
                    status="Queued" 
                    velocity={stats.flowVelocities[3]} 
                    isLast={true}
                />
            </div>
            </div>

            {/* Right Column: Metrics (Span 5) */}
            <div className="col-span-5 flex flex-col gap-4 h-full">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Live Performance</h3>
            
            <div className="flex-1 flex flex-col gap-3">
                {/* Engagement Stats */}
                <StatCard 
                    icon={Zap}
                    label="Total Views"
                    value={stats.views.toLocaleString()}
                    trend="12.4%"
                    color="text-yellow-400"
                />
                <StatCard 
                    icon={BarChart3}
                    label="Conversion"
                    value={`${stats.conversion}%`}
                    trend="0.8%"
                    color="text-cyan-400"
                />

                {/* Echo Bars Graph */}
                <div className="flex-1 bg-[#1a1122]/60 border border-slate-800/60 rounded-xl p-4 backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Social Echo</span>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-[9px] text-cyan-400 font-bold">LIVE</span>
                    </div>
                    </div>
                    <div className="flex items-end justify-between h-full gap-1 pt-2">
                        {stats.echoBars.map((bar, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: `${bar}%` }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`w-full rounded-sm opacity-80 ${
                                    bar > 80 ? 'bg-cyan-400' : 'bg-[#2C097F]'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Channels */}
                <div className="bg-[#1a1122]/60 border border-slate-800/60 rounded-xl p-3 backdrop-blur-md space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-pink-500/10 flex items-center justify-center text-pink-500">
                            <Instagram className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-[10px] font-semibold mb-1">
                                <span>Instagram</span>
                                <span className="text-slate-300">48%</span>
                            </div>
                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: "48%" }} className="h-full bg-pink-500" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <Linkedin className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-[10px] font-semibold mb-1">
                                <span>LinkedIn</span>
                                <span className="text-slate-300">32%</span>
                            </div>
                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: "32%" }} className="h-full bg-blue-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </main>

        {/* Footer CTA */}
        <footer className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
            <div className="text-[10px] text-slate-500 font-medium">
                <span className="text-slate-300">Next scheduled post:</span> 14 mins
            </div>
            <button className="flex-1 max-w-[200px] bg-gradient-to-r from-[#2C097F] to-indigo-600 hover:to-indigo-500 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2 transition-all active:scale-95 group">
                <span>Boost Campaign</span>
                <MousePointer2 className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
        </footer>
        </div>
    </div>
  );
}