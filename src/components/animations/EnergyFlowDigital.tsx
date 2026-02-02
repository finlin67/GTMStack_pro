// FILE: EnergyFlowDigital.tsx
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Factory, 
  Calendar, 
  RefreshCcw, 
  Gauge, 
  TrendingUp, 
  ChevronRight, 
  Leaf, 
  Gavel, 
  Activity,
  Map as MapIcon,
  CircleCheck,
  ArrowUpRight
} from 'lucide-react';

// --- Types ---

interface LifecycleStats {
  complianceScore: number;
  trirTrend: number[];
  carbonOffset: {
    alpha7: number;
    delta: number;
  };
}

interface AssetLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'OPTIMAL' | 'WARNING';
  output: string;
}

// --- Sub-components ---

const StatCard = ({ label, value, trend, isGrowth }: { label: string; value: string; trend: string; isGrowth?: boolean }) => (
  <div className="bg-white border border-indigo-50 p-3 rounded-xl shadow-sm flex-1 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-bold text-slate-900">{value}</p>
    </div>
    <div className="mt-2 flex items-center gap-1">
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isGrowth ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'}`}>
        {trend}
      </span>
      <ArrowUpRight className={`size-3 ${isGrowth ? 'text-emerald-500' : 'text-sky-500'}`} />
    </div>
  </div>
);

const StagePill = ({ title, status, isActive }: { title: string; status: string; isActive?: boolean }) => (
  <div className={`p-2.5 rounded-xl border transition-all flex items-center gap-3 ${isActive ? 'bg-white border-sky-200 shadow-sm' : 'bg-slate-50 border-indigo-50'}`}>
    <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-sky-500 text-white' : 'bg-indigo-100 text-indigo-400'}`}>
      <Activity className="size-4" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-bold text-slate-900 truncate">{title}</p>
      <p className={`text-[9px] font-medium ${isActive ? 'text-sky-600' : 'text-slate-400'}`}>{status}</p>
    </div>
    {isActive && <CircleCheck className="size-4 text-emerald-500 shrink-0" />}
  </div>
);

// --- Main Component ---

/**
 * EnergyFlowDigital
 * A Modern SaaS Minimal control plane for industrial asset performance and lifecycle management.
 * Consolidates metrics, asset mapping, and lifecycle tracking into a high-fidelity 600x600 interface.
 */
export default function EnergyFlowDigital() {
  const [viewMode, setViewMode] = useState<'METRICS' | 'MAP'>('METRICS');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState<LifecycleStats>({
    complianceScore: 98,
    trirTrend: [0.8, 0.7, 0.75, 0.6, 0.5, 0.4],
    carbonOffset: { alpha7: 72, delta: 88 }
  });

  const assetLocations: AssetLocation[] = useMemo(() => [
    { id: '1', name: 'Permian Hub', x: 30, y: 60, status: 'OPTIMAL', output: '450 GW/h' },
    { id: '2', name: 'Pacific Grid', x: 15, y: 40, status: 'OPTIMAL', output: '310 GW/h' },
    { id: '3', name: 'Gulf Stream', x: 75, y: 75, status: 'WARNING', output: '560 GW/h' },
  ], []);

  // Simulated live data jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        complianceScore: Math.max(90, Math.min(100, prev.complianceScore + (Math.random() * 0.4 - 0.2)))
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        complianceScore: 94 + Math.floor(Math.random() * 6)
      }));
      setIsRefreshing(false);
    }, 1200);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-200 font-display p-4">
      <div className="w-[600px] h-[600px] bg-[#F1F5F9] border border-slate-300 shadow-2xl overflow-hidden flex flex-col relative rounded-2xl">
        
        {/* Hub-style Navbar */}
        <header className="bg-white border-b border-indigo-50 px-5 py-3.5 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-lg shadow-sky-100">
              <Zap className="text-white size-4.5 fill-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-none mb-0.5">EnergyFlow</h2>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">Digital Assets • Enterprise</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-lg gap-1 border border-indigo-50">
              <button 
                onClick={() => setViewMode('METRICS')}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${viewMode === 'METRICS' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Metrics
              </button>
              <button 
                onClick={() => setViewMode('MAP')}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${viewMode === 'MAP' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Asset Map
              </button>
            </div>
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`p-2 rounded-lg hover:bg-slate-50 border border-indigo-50 transition-all ${isRefreshing ? 'animate-spin text-sky-500' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <RefreshCcw className="size-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Main View */}
        <main className="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth">
          
          {/* Header Section */}
          <div className="space-y-1">
            <motion.h1 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-slate-900 tracking-tight"
            >
              Engineering Lifecycle
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[11px] font-medium text-slate-500 leading-relaxed max-w-[90%]"
            >
              Unified control plane for industrial asset performance, regulatory compliance, and environmental footprint reduction.
            </motion.p>
          </div>

          {/* Quick Metrics Cards */}
          <section className="flex gap-3 shrink-0">
            <StatCard label="Compliance" value={`${stats.complianceScore.toFixed(1)}%`} trend="+2.4%" isGrowth />
            <StatCard label="Net Carbon" value="2,400" trend="-12%" />
            <StatCard label="Active Hubs" value="08" trend="Steady" isGrowth />
          </section>

          {/* Core Visualizer Widget */}
          <section className="bg-white border border-indigo-100 rounded-2xl shadow-sm p-5 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Live Performance Stream</h3>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-bold text-emerald-600">SYSTEM STABLE</span>
              </div>
            </div>

            <div className="relative min-h-[160px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {viewMode === 'METRICS' ? (
                  <motion.div 
                    key="metrics" 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -5 }}
                    className="w-full grid grid-cols-2 gap-8 items-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative size-28">
                        <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                          <motion.circle 
                            cx="50" cy="50" r="42" fill="none" stroke="#0ea5e9" strokeWidth="8" strokeLinecap="round"
                            initial={{ strokeDasharray: 264, strokeDashoffset: 264 }}
                            animate={{ strokeDashoffset: 264 - (264 * stats.complianceScore) / 100 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-black text-slate-800">{Math.round(stats.complianceScore)}</span>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-wider">Integrity Score</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-slate-500 uppercase">Energy Distribution</span>
                          <span className="text-sky-600">88%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '88%' }} 
                            className="h-full bg-sky-500" 
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-slate-500 uppercase">Safety Rating</span>
                          <span className="text-emerald-600">Grade A</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '94%' }} 
                            className="h-full bg-emerald-500" 
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="map" 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full h-[160px] bg-slate-50 rounded-xl border border-indigo-50 relative overflow-hidden"
                  >
                    {/* Simplified Map Background */}
                    <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
                      <path d="M10,20 Q30,15 45,30 T80,25 T95,50 T75,85 T40,90 T15,70 Z" fill="none" stroke="#000" strokeWidth="0.5" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="#000" strokeWidth="0.2" className="opacity-50" />
                    </svg>

                    {/* Interactive Asset Markers */}
                    {assetLocations.map(asset => (
                      <motion.div 
                        key={asset.id} 
                        className={`absolute size-3 rounded-full border-2 border-white shadow-lg cursor-pointer transition-transform`}
                        style={{ left: `${asset.x}%`, top: `${asset.y}%`, backgroundColor: asset.status === 'OPTIMAL' ? '#10b981' : '#f59e0b' }}
                        whileHover={{ scale: 1.5, zIndex: 10 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <motion.div 
                          className="absolute inset-0 rounded-full opacity-20"
                          style={{ backgroundColor: 'inherit' }}
                          animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      </motion.div>
                    ))}

                    <div className="absolute bottom-3 left-3 right-3 p-2 bg-white/95 backdrop-blur-sm border border-indigo-50 rounded-lg shadow-sm flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MapIcon className="size-3 text-sky-500" />
                        <span className="text-[10px] font-bold text-slate-800">Operational Density</span>
                      </div>
                      <span className="text-[10px] font-bold text-sky-600">High Reliability</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Sequence Timeline Section */}
          <section className="space-y-3">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active Lifecycle Phase</h3>
            <div className="grid grid-cols-2 gap-3">
              <StagePill title="Asset Validation" status="Completed 100%" />
              <StagePill title="Approval Window" status="4 of 5 Stakeholders" isActive />
              <StagePill title="Risk Assessment" status="Scanning Grid..." />
              <StagePill title="Global Release" status="Scheduled Q4" />
            </div>
          </section>

          {/* Environmental Insight Card */}
          <section className="bg-white border border-indigo-50 p-4 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="size-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Leaf className="size-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Environmental Score</p>
                <p className="text-[10px] font-medium text-slate-500">Tier 1 ESG Compliance Achieved</p>
              </div>
            </div>
            <button className="text-[10px] font-black text-sky-600 uppercase tracking-wider hover:text-sky-700 transition-colors">
              Download Report
            </button>
          </section>

        </main>

        {/* Action Bar Footer */}
        <footer className="p-4 bg-white border-t border-indigo-50 flex gap-3 shrink-0 z-20">
          <motion.button 
            whileHover={{ scale: 1.01, backgroundColor: '#0284c7' }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-sky-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-sky-50 transition-all flex items-center justify-center gap-2"
          >
            Initiate Governance Audit <ChevronRight className="size-4" />
          </motion.button>
          <motion.button 
            whileHover={{ backgroundColor: '#f8fafc' }}
            whileTap={{ scale: 0.95 }}
            className="px-4 border border-indigo-100 bg-slate-50 text-slate-600 font-bold rounded-xl transition-all"
          >
            <Gavel className="size-4" />
          </motion.button>
        </footer>

        {/* Subtle Brand Overlay */}
        <div className="absolute top-0 right-0 p-1 pointer-events-none opacity-5">
           <Zap className="size-24 text-slate-900" />
        </div>
      </div>
    </div>
  );
}
