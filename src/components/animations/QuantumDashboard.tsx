'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  BarChart3, 
  Settings, 
  Database, 
  TrendingUp, 
  Cpu, 
  Lightbulb, 
  Cloud, 
  LineChart, 
  ShieldCheck,
  X,
  Activity,
  Zap,
  ChevronDown,
  Clock
} from 'lucide-react';

// Animation variants for the nebula clouds
const driftVariants: Variants = {
  animate: (custom: number) => ({
    rotate: [0, 180, 360],
    scale: [1, 1.2, 1],
    transition: {
      duration: custom, 
      repeat: Infinity,
      ease: "linear",
    },
  }),
};

// Pulse animation for the connector dots
const pulseVariants: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.2, 1],
    boxShadow: ["0 0 0px #fff", "0 0 10px #fff", "0 0 0px #fff"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Mock data configuration
const stageDetails = {
  dataIn: {
    title: "Data Ingestion",
    color: "blue",
    metrics: [
      { label: "Latency", value: "8ms", icon: Zap },
      { label: "Loss", value: "0.01%", icon: ShieldCheck },
      { label: "Nodes", value: "42", icon: Database }
    ],
    history: [45, 60, 55, 70, 65, 80, 75, 90, 85, 95]
  },
  processed: {
    title: "Neural Core",
    color: "indigo",
    metrics: [
      { label: "Throughput", value: "98%", icon: Activity },
      { label: "Check", value: "Clean", icon: ShieldCheck },
      { label: "Load", value: "34%", icon: Cpu }
    ],
    history: [30, 40, 35, 50, 45, 60, 55, 65, 60, 70]
  },
  insights: {
    title: "Predictive Engine",
    color: "fuchsia",
    metrics: [
      { label: "Conf.", value: "94%", icon: Lightbulb },
      { label: "Signals", value: "12", icon: TrendingUp },
      { label: "ROI", value: "+15%", icon: BarChart3 }
    ],
    history: [50, 65, 70, 85, 80, 92, 90, 95, 98, 92]
  }
};

export default function QuantumDashboard() {
  const [stats, setStats] = useState({
    dataIn: 1.2,
    processed: 980,
    insights: 42.5,
    accuracy: 99.8,
  });

  const [selectedStage, setSelectedStage] = useState<keyof typeof stageDetails | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [refreshRate, setRefreshRate] = useState(2500);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        dataIn: +(prev.dataIn + (Math.random() * 0.02 - 0.01)).toFixed(2),
        processed: Math.floor(prev.processed + (Math.random() * 10 - 5)),
        insights: +(prev.insights + (Math.random() * 0.1 - 0.05)).toFixed(1),
        accuracy: +(99.8 + (Math.random() * 0.1 - 0.05)).toFixed(1),
      }));
    }, refreshRate);
    return () => clearInterval(interval);
  }, [refreshRate]);

  const handleStageClick = (stage: keyof typeof stageDetails) => {
    setSelectedStage(stage);
    setShowHistory(false);
  };

  const getStageColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500';
      case 'indigo': return 'bg-indigo-500';
      case 'fuchsia': return 'bg-fuchsia-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center font-sans select-none p-4">
      
      {/* Responsive Inner Tile Container */}
      <div className="relative w-full max-w-[600px] aspect-square max-h-[600px] bg-[#020617]/40 text-slate-100 rounded-[2.5rem] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            custom={25}
            variants={driftVariants}
            animate="animate"
            className="absolute w-[400px] h-[400px] -top-20 -left-20 rounded-full bg-blue-600/10 blur-[60px] opacity-40"
          />
          <motion.div 
            custom={30}
            variants={driftVariants}
            animate="animate"
            className="absolute w-[300px] h-[300px] bottom-0 right-0 rounded-full bg-purple-600/10 blur-[60px] opacity-40"
          />
        </div>

        {/* Header */}
        <header className="relative z-10 px-6 py-5 flex items-center justify-between border-b border-white/5 bg-[#020617]/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-fuchsia-600 p-[1px]">
              <div className="w-full h-full bg-[#020617] rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium tracking-tight text-white/90 leading-none">Quantum Analytics</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400/60 font-medium mt-1">Real-time Monitor</p>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[9px] font-bold text-emerald-400 tracking-wider">LIVE</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-400'}`}
              >
                <Settings className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-[#0f172a] border border-white/10 rounded-2xl p-4 shadow-xl z-40 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                      <Clock size={12} className="text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Configuration</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] text-slate-500 uppercase font-medium">Refresh Rate</span>
                          <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">{refreshRate}ms</span>
                        </div>
                        <input 
                          type="range" 
                          min="500" 
                          max="5000" 
                          step="500"
                          value={refreshRate}
                          onChange={(e) => setRefreshRate(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-colors"
                        />
                        <div className="flex justify-between text-[9px] text-slate-600 mt-1.5 font-medium">
                          <span>Fast (0.5s)</span>
                          <span>Slow (5s)</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main Content - Vertical Pipeline */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center py-4 w-full">
          
          {/* Stage 1 */}
          <StageCard 
            icon={Database}
            color="blue"
            label="Stage 1"
            title="Data In"
            sub="Raw ingestion"
            value={`${stats.dataIn}M`}
            trend="+12.5%"
            onClick={() => handleStageClick('dataIn')}
          />

          <VerticalConnector color="from-blue-500/40 to-indigo-500/40" />

          {/* Stage 2 */}
          <StageCard 
            icon={Cpu}
            color="indigo"
            label="Stage 2"
            title="Processed"
            sub="Normalization active"
            value={`${stats.processed}K`}
            trend="92% Flow"
            onClick={() => handleStageClick('processed')}
          />

          <VerticalConnector color="from-indigo-500/40 to-fuchsia-500/40" />

          {/* Stage 3 */}
          <StageCard 
            icon={Lightbulb}
            color="fuchsia"
            label="Stage 3"
            title="Insights"
            sub="Signals detected"
            value={`${stats.insights}K`}
            trend="+24.1%"
            onClick={() => handleStageClick('insights')}
          />

        </main>

        {/* Footer */}
        <footer className="relative z-20 px-6 py-4 border-t border-white/5 flex items-center justify-between bg-[#020617]/80 backdrop-blur-md shrink-0">
          <div className="flex gap-6 sm:gap-8">
            <FooterStat icon={Cloud} label="Sources" value="12" />
            <FooterStat icon={LineChart} label="Metrics" value="4.2k" />
            <FooterStat icon={ShieldCheck} label="Accuracy" value={`${stats.accuracy}%`} color="text-emerald-400" />
          </div>
          <div className="hidden sm:flex items-center gap-2 opacity-50">
            <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[8px] uppercase tracking-widest text-slate-400">Sync</span>
          </div>
        </footer>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedStage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[2px] p-6"
              onClick={() => setSelectedStage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 10, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm bg-[#0f172a] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl"
              >
                {/* Modal Glow */}
                <div className={`absolute top-0 right-0 w-48 h-48 ${getStageColor(stageDetails[selectedStage].color)}/10 rounded-full blur-[60px] -mr-12 -mt-12 pointer-events-none`} />

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-light text-white">{stageDetails[selectedStage].title}</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Telemetry & History</p>
                  </div>
                  <button onClick={() => setSelectedStage(null)} className="p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white">
                    <X size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {stageDetails[selectedStage].metrics.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${getStageColor(stageDetails[selectedStage].color)}/20 mb-2`}>
                          <Icon size={12} className="text-white/90" />
                        </div>
                        <p className="text-[9px] text-slate-500 uppercase mb-0.5">{m.label}</p>
                        <p className="text-sm font-medium text-white">{m.value}</p>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full py-2.5 mb-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] uppercase tracking-widest text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <LineChart size={14} className="text-slate-400 group-hover:text-white" />
                  <span>{showHistory ? 'Hide Historical Data' : 'View Historical Data'}</span>
                  <ChevronDown 
                    size={14} 
                    className={`text-slate-500 transition-transform duration-300 ${showHistory ? 'rotate-180' : ''}`} 
                  />
                </button>

                <AnimatePresence>
                  {showHistory && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white/[0.02] rounded-xl border border-white/5 p-4 mt-2">
                        <div className="flex items-center gap-2 mb-3">
                          <Activity size={10} className="text-slate-400" />
                          <span className="text-[9px] uppercase tracking-wider text-slate-500">Live Stream (10s)</span>
                        </div>
                        <div className="h-24 flex items-end justify-between gap-2">
                           {stageDetails[selectedStage].history.map((h, i) => {
                             const colorMap: Record<string, string> = {
                               blue: 'text-blue-400',
                               indigo: 'text-indigo-400',
                               fuchsia: 'text-fuchsia-400'
                             };
                             const textColor = colorMap[stageDetails[selectedStage].color] || 'text-slate-400';

                             return (
                              <div key={i} className={`w-full relative group h-full bg-white/[0.01] rounded-sm ${textColor}`}>
                                {/* Vertical Grid Line on Hover */}
                                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2" />
                                
                                {/* Scatter Point */}
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0, bottom: '0%' }}
                                  animate={{ opacity: 1, scale: 1, bottom: `${h}%` }}
                                  transition={{ duration: 0.4, delay: i * 0.05, type: 'spring' }}
                                  className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]"
                                />
                              </div>
                            );
                           })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// Sub-components
function StageCard({ icon: Icon, color, label, title, sub, value, trend, onClick }: any) {
  const colorClasses = {
    blue: "text-blue-400 border-blue-500/20 hover:border-blue-500/40 shadow-blue-500/10",
    indigo: "text-indigo-400 border-indigo-500/20 hover:border-indigo-500/40 shadow-indigo-500/10",
    fuchsia: "text-fuchsia-400 border-fuchsia-500/20 hover:border-fuchsia-500/40 shadow-fuchsia-500/10",
  }[color as string] || "text-slate-400 border-slate-500/20";

  return (
    <motion.div 
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`group cursor-pointer relative w-[85%] bg-white/[0.02] backdrop-blur-md border rounded-2xl p-4 flex items-center justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0)] ${colorClasses} hover:bg-white/[0.04]`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-white/[0.03] border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
          <Icon className={`w-5 h-5 ${colorClasses.split(' ')[0]}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[9px] font-bold uppercase tracking-wider ${colorClasses.split(' ')[0]}`}>{label}</span>
          </div>
          <h3 className="text-lg font-light text-white leading-tight">{title}</h3>
          <p className="text-[10px] text-slate-500">{sub}</p>
        </div>
      </div>
      
      <div className="text-right">
        <div className={`text-2xl font-light tracking-tight text-white drop-shadow-md`}>{value}</div>
        <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-400 mt-0.5 font-medium">
          <TrendingUp className="w-3 h-3" /> {trend}
        </div>
      </div>
    </motion.div>
  );
}

function VerticalConnector({ color }: { color: string }) {
  return (
    <div className={`w-[1px] h-6 sm:h-8 bg-gradient-to-b ${color} relative my-1`}>
      <motion.div 
        variants={pulseVariants}
        animate="animate"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" 
      />
    </div>
  );
}

function FooterStat({ icon: Icon, label, value, color = "text-slate-200" }: any) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5">
        <Icon className="w-3 h-3 text-slate-500" />
        <span className="text-[8px] uppercase tracking-[0.2em] text-slate-500 font-bold">{label}</span>
      </div>
      <span className={`text-sm font-medium ${color}`}>{value}</span>
    </div>
  );
}