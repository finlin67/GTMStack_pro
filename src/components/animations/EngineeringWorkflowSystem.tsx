// FILE: EngineeringWorkflowSystem.tsx
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  PlaneTakeoff, 
  Package, 
  ShieldAlert, 
  Award, 
  Shield, 
  Settings,
  Activity,
  ChevronRight,
  Database,
  Cpu,
  Globe,
  LayoutDashboard,
  Bell,
  Search,
  Terminal,
  Server,
  RefreshCw,
  Lock,
  Target,
  Layers,
  Cpu as Microchip
} from 'lucide-react';

/** 
 * ============================================================================
 * TYPE DEFINITIONS
 * ============================================================================
 */

type ViewType = 'operations' | 'diagnostics' | 'network';

interface WorkflowItemData {
  id: string;
  icon: React.ElementType;
  title: string;
  duration: string;
  description?: string;
  tags?: string[];
  isFinal?: boolean;
  status: 'complete' | 'active' | 'pending';
}

interface StatData {
  label: string;
  value: string | number;
  unit?: string;
  trend: 'up' | 'down';
  color: string;
  icon: React.ElementType;
}

interface TelemetryState {
  cpu: number;
  ram: number;
  latency: number;
  progress: number;
  nodeCount: number;
  uptime: string;
}

/** 
 * ============================================================================
 * INTERNAL SUB-COMPONENTS (INLINED)
 * ============================================================================
 */

const StatCard: React.FC<StatData> = ({ label, value, unit, trend, color, icon: Icon }) => (
  <motion.div 
    whileHover={{ y: -4, scale: 1.02 }}
    className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-1 transition-all duration-500 shadow-2xl overflow-hidden group"
  >
    {/* Subtle Glow */}
    <div className={`absolute -right-4 -top-4 w-16 h-16 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity ${color === 'text-blue-400' ? 'bg-blue-500' : color === 'text-amber-400' ? 'bg-amber-500' : 'bg-white'}`} />
    
    <div className="flex items-center justify-between mb-1">
      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">{label}</span>
      <Icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
    </div>
    
    <div className="flex items-baseline gap-1 leading-none">
      <span className={`text-2xl font-black font-mono tracking-tighter ${color}`}>{value}</span>
      {unit && <span className="text-[10px] font-bold text-slate-500 uppercase">{unit}</span>}
    </div>
    
    <div className={`text-[8px] font-bold flex items-center gap-1.5 mt-2 ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
      <span className={`w-1 h-1 rounded-full ${trend === 'up' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
      {trend === 'up' ? 'OPTIMAL PERFORMANCE' : 'NOMINAL DEVIATION'}
    </div>
  </motion.div>
);

const NavItem: React.FC<{ active: boolean; icon: React.ElementType; label: string; onClick: () => void }> = ({ active, icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-xl transition-all duration-500 group relative flex items-center gap-2 ${
      active ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'text-slate-500 hover:text-slate-300'
    }`}
  >
    <Icon className={`w-4 h-4 ${active ? 'scale-110' : 'group-hover:scale-110 transition-transform'}`} />
    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{label}</span>
    {active && (
      <motion.div layoutId="nav-glow" className="absolute inset-0 bg-blue-500/5 blur-lg rounded-xl -z-10" />
    )}
  </button>
);

const WorkflowNode: React.FC<WorkflowItemData & { index: number }> = ({ index, icon: Icon, title, duration, description, status, isFinal }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="relative pl-8 mb-4 group"
  >
    {!isFinal && <div className="absolute left-[13px] top-10 w-[1px] h-full bg-slate-800 z-0" />}
    
    <div className={`absolute left-0 top-1 w-7 h-7 rounded-xl flex items-center justify-center z-10 border transition-all duration-700 ${
      status === 'active' ? 'bg-blue-500 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 
      status === 'complete' ? 'bg-slate-800 border-emerald-500/50 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-600'
    }`}>
      <Icon className={`w-3.5 h-3.5 ${status === 'active' ? 'animate-pulse text-white' : ''}`} />
    </div>
    
    <div className={`bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 transition-all duration-500 hover:bg-slate-800/60 hover:border-white/10 hover:-translate-y-0.5 ${status === 'active' ? 'ring-1 ring-blue-500/30 bg-slate-800/80 shadow-2xl' : ''}`}>
      <div className="flex justify-between items-center mb-1.5">
        <h4 className={`text-[11px] font-black uppercase tracking-tight ${status === 'active' ? 'text-blue-400' : 'text-slate-200'}`}>{title}</h4>
        <div className="flex items-center gap-2">
           <span className="text-[8px] font-black font-mono bg-blue-500/10 px-2 py-0.5 rounded-full text-blue-400 border border-blue-500/20">{duration}</span>
           {status === 'complete' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_emerald]" />}
        </div>
      </div>
      <p className="text-[10px] text-slate-400 leading-normal font-medium pr-4">{description}</p>
    </div>
  </motion.div>
);

/** 
 * ============================================================================
 * MAIN APPLICATION COMPONENT
 * ============================================================================
 */

export default function EngineeringWorkflowSystem() {
  const [activeView, setActiveView] = useState<ViewType>('operations');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    cpu: 31,
    ram: 5.4,
    latency: 14,
    progress: 0,
    nodeCount: 124,
    uptime: '12d 04h'
  });

  const workflow: WorkflowItemData[] = useMemo(() => [
    { id: 'v1', icon: PlaneTakeoff, title: 'Asset Validation', duration: 'PHASE A', description: 'Deep-spectrum simulation and structural variance analysis.', status: 'complete' },
    { id: 'v2', icon: Package, title: 'Strategic Sourcing', duration: 'PHASE B', description: 'Multi-node logistics sync and material acquisition readiness.', status: 'active', tags: ['SECURED'] },
    { id: 'v3', icon: ShieldAlert, title: 'Safety Integrity', duration: 'PHASE C', description: 'Regulatory structural audits and risk mitigation protocols.', status: 'pending' },
    { id: 'v4', icon: Award, title: 'Commercial Scale', duration: 'PHASE D', description: 'Final integration and global market distribution activation.', status: 'pending', isFinal: true }
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        cpu: Math.floor(28 + Math.random() * 15),
        ram: parseFloat((5.2 + Math.random() * 0.4).toFixed(1)),
        latency: Math.floor(10 + Math.random() * 6),
        progress: (prev.progress + 0.15) % 100,
        nodeCount: prev.nodeCount + (Math.random() > 0.95 ? 1 : 0)
      }));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  }, []);

  return (
    <div className="w-[600px] h-[600px] overflow-hidden relative bg-[#06080d] text-slate-100 flex flex-col font-display border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
      
      {/* 10% ACCENT LAYER: Sophisticated Radial Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-[0.15]" />
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-900/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-radial-vignette" />
      </div>

      {/* 30% SECONDARY LAYER: Structural Elements */}
      <header className="relative z-50 h-16 border-b border-white/5 bg-slate-900/40 backdrop-blur-3xl px-6 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group cursor-pointer transition-transform hover:rotate-3">
            <Zap className="text-white w-5 h-5 fill-white/10" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight uppercase leading-none text-slate-100">Aether <span className="text-blue-500">OS</span></h1>
            <div className="text-[7px] font-black text-slate-500 tracking-[0.4em] uppercase mt-1">Strategic Command Console</div>
          </div>
        </div>
        
        <nav className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/20 border border-white/5">
          <NavItem active={activeView === 'operations'} icon={LayoutDashboard} label="Ops" onClick={() => setActiveView('operations')} />
          <NavItem active={activeView === 'diagnostics'} icon={Activity} label="Scan" onClick={() => setActiveView('diagnostics')} />
          <NavItem active={activeView === 'network'} icon={Globe} label="Mesh" onClick={() => setActiveView('network')} />
        </nav>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:text-blue-400">
            <Bell className="w-4 h-4" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-800 border border-white/10 p-0.5 shadow-xl">
            <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center">
              <Lock className="w-4 h-4 text-slate-600" />
            </div>
          </div>
        </div>
      </header>

      {/* 60% BASE LAYER: High-Fidelity Content */}
      <main className="relative z-10 flex-grow p-6 flex flex-col gap-6 overflow-hidden">
        
        {/* Telemetry Surface */}
        <section className="grid grid-cols-4 gap-4">
          <StatCard label="Computation" value={telemetry.cpu} unit="%" trend="up" color="text-blue-400" icon={Microchip} />
          <StatCard label="Memory Bus" value={telemetry.ram} unit="GB" trend="up" color="text-emerald-400" icon={Database} />
          <StatCard label="Sync Delay" value={telemetry.latency} unit="MS" trend="down" color="text-amber-400" icon={Activity} />
          <StatCard label="Global Nodes" value={telemetry.nodeCount} trend="up" color="text-slate-100" icon={Globe} />
        </section>

        {/* Surface Elevation View Content */}
        <div className="flex-grow flex flex-col min-h-0 bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl relative">
          <AnimatePresence mode="wait">
            {activeView === 'operations' && (
              <motion.div key="ops" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full">
                
                {/* Workflow Column (65%) */}
                <div className="w-[65%] p-6 overflow-y-auto custom-scrollbar flex flex-col">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                    <div>
                      <h2 className="text-sm font-black tracking-widest flex items-center gap-2 uppercase text-slate-200">
                        <Terminal className="text-blue-500 w-4 h-4" />
                        Production Lifecycle
                      </h2>
                      <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Operational Roadmap v4.2</p>
                    </div>
                    <button 
                      onClick={handleRefresh} 
                      className={`p-2.5 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-blue-500/10 hover:border-blue-500/30 ${isRefreshing ? 'animate-spin' : ''}`}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'text-blue-400' : 'text-slate-500'}`} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1 pr-1">
                    {workflow.map((item, i) => <WorkflowNode key={item.id} index={i} {...item} />)}
                  </div>
                </div>

                {/* Focus Inspector (35%) */}
                <div className="w-[35%] border-l border-white/5 bg-slate-900/30 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Asset Data</span>
                    <Target className="w-4 h-4 text-blue-500 animate-pulse" />
                  </div>

                  <div className="aspect-square bg-slate-900 border border-white/10 rounded-3xl relative overflow-hidden flex items-center justify-center shadow-inner group mb-6">
                      {/* Scanning Line */}
                      <motion.div 
                        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_15px_blue] z-10"
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      />
                      <Layers className="w-12 h-12 text-slate-800 group-hover:text-blue-500 transition-all duration-700" />
                      
                      {/* Live Bar */}
                      <div className="absolute bottom-4 left-4 right-4 space-y-2">
                        <div className="flex justify-between text-[7px] font-black text-slate-600 uppercase">
                          <span>Sector Sync</span>
                          <span className="text-blue-500">{telemetry.progress.toFixed(1)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                          <motion.div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500" animate={{ width: `${telemetry.progress}%` }} />
                        </div>
                      </div>
                  </div>

                  <div className="space-y-4 flex-grow">
                    <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 flex flex-col gap-2">
                      <div className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Next Milestone</div>
                      <div className="text-xs font-bold text-slate-200 leading-tight">M34 Regulatory Pass Verification</div>
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02, backgroundColor: '#3b82f6' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-blue-600 text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 transition-colors"
                    >
                      Authorize Update <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="mt-6 flex flex-col gap-1.5 opacity-40">
                    <div className="h-[1px] w-full bg-slate-700" />
                    <div className="flex justify-between text-[6px] font-mono text-slate-500 uppercase">
                      <span>SEC: GCM_256</span>
                      <span>NOMINAL</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'diagnostics' && (
              <motion.div key="diag" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full p-12 text-center">
                <div className="relative mb-8">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }} 
                    className="w-24 h-24 rounded-full border-[6px] border-blue-500/10 border-t-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.1)]" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="w-10 h-10 text-blue-500 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-black tracking-tighter mb-3 uppercase text-slate-100">Neural Scan Active</h3>
                <p className="text-[11px] text-slate-500 max-w-[280px] leading-relaxed font-medium">Verifying cross-node structural parity and hardware integrity across distributed sectors.</p>
                <div className="flex gap-2.5 mt-8">
                  {[1,2,3,4,5,6].map(i => (
                    <motion.div key={i} animate={{ height: [15, 45, 20, 50, 15] }} transition={{ repeat: Infinity, duration: 1.8, delay: i*0.15 }} className="w-1.5 bg-blue-500/40 rounded-full" />
                  ))}
                </div>
              </motion.div>
            )}

            {activeView === 'network' && (
              <motion.div key="net" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                     <Globe className="w-6 h-6 text-blue-400" />
                   </div>
                   <div>
                     <h3 className="text-base font-black uppercase tracking-widest text-slate-100">Distributed Mesh</h3>
                     <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter mt-0.5">Global Sync Stability Index: 98.2%</p>
                   </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { reg: 'EU-CENTRAL-ALPHA', loc: 'FRANKFURT DATA HUB', lat: '12ms', status: 'optimal' },
                    { reg: 'US-WEST-SIGMA', loc: 'OREGON SECURE NODE', lat: '45ms', status: 'active' },
                    { reg: 'AP-NORTHEAST-DELTA', loc: 'TOKYO EDGE CLUSTER', lat: '114ms', status: 'nominal' }
                  ].map((node, idx) => (
                    <div key={node.reg} className="bg-slate-800/30 border border-white/5 p-5 rounded-[1.5rem] flex items-center justify-between group hover:bg-slate-800/60 transition-all cursor-default">
                      <div className="flex items-center gap-4">
                        <div className={`w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-emerald-500 shadow-[0_0_10px_emerald]' : 'bg-blue-500 shadow-[0_0_10px_blue]'} animate-pulse`} />
                        <div>
                          <div className="text-[11px] font-black text-slate-200">{node.reg}</div>
                          <div className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{node.loc}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono font-black text-blue-400 tracking-tighter">{node.lat}</div>
                        <div className="text-[7px] text-slate-600 font-black uppercase">SYNC DELAY</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto p-5 bg-blue-500/5 border border-blue-500/10 rounded-[1.5rem] flex items-center gap-4">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">Encrypted via Quantum-Resistant Bridge Protocol v2</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Surface */}
      <footer className="h-10 border-t border-white/5 bg-slate-950/80 px-6 flex items-center justify-between text-[8px] font-mono text-slate-600 uppercase tracking-widest relative z-20">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> 
            Link Stabilized
          </span>
          <span className="hidden sm:inline-flex opacity-50 border-l border-white/5 pl-6">Sector 7-Alpha</span>
        </div>
        <div className="flex items-center gap-4">
          <span>TH_C: 12</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10 text-slate-400 font-bold tracking-tighter">REV_4.2.1-EX</span>
        </div>
      </footer>

      {/* Surface Styling */}
      <style>{`
        .blueprint-grid {
          background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .bg-radial-vignette {
          background: radial-gradient(circle at center, transparent 0%, rgba(3, 7, 18, 0.4) 100%);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfAZ9hiA.woff2) format('woff2');
        }
      `}</style>
    </div>
  );
}
