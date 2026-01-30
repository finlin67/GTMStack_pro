// FILE: Marketing-Automation-Live-Feed.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Bell, 
  HardDriveDownload, 
  Database, 
  LineChart, 
  Rocket, 
  User, 
  Building2, 
  Star, 
  Send, 
  Mail, 
  Archive, 
  TrendingUp, 
  CheckCircle, 
  ShieldCheck
} from 'lucide-react';

export default function MarketingAutomationLiveFeed() {
  // Centralized State for "Live" Stats
  const [stats, setStats] = useState({
    inQueue: 2401,
    enriched: 1842,
    routed: 1500,
    totalReceived: 12400,
    processed: 9203,
    successRate: 98.2,
    latency: 42
  });

  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  // Effect to simulate live data jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        inQueue: prev.inQueue + Math.floor(Math.random() * 5) - 2,
        enriched: prev.enriched + Math.floor(Math.random() * 3) - 1,
        routed: prev.routed + Math.floor(Math.random() * 3) - 1,
        totalReceived: prev.totalReceived + Math.floor(Math.random() * 10),
        processed: prev.processed + Math.floor(Math.random() * 8),
        successRate: parseFloat((98.0 + Math.random() * 0.5).toFixed(1)),
        latency: 40 + Math.floor(Math.random() * 10)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleStageClick = (stage: string) => {
    setSelectedStage(prev => prev === stage ? null : stage);
  };

  // Helper to determine opacity based on selection
  const getItemOpacity = (stage: string) => {
    if (!selectedStage) return 1;
    return selectedStage === stage ? 1 : 0.2;
  };

  // Log Data
  const logs = [
    { id: 1, time: "14:22:01", msg: <span>Lead <span className="text-[#137fec]">#AF-2091</span> routed to Salesforce</span>, tag: "ROUTED", tagColor: "text-emerald-400 border-emerald-500/30", stage: "Route" },
    { id: 2, time: "14:21:58", msg: <span>Lead <span className="text-[#137fec]">#AF-2092</span> scored <span className="text-violet-400 font-bold">88</span></span>, tag: "SCORED", tagColor: "text-violet-400 border-violet-500/30", stage: "Score" },
    { id: 3, time: "14:21:55", msg: <span>Enriching <span className="text-[#137fec]">techcorp.io</span> via Clearbit</span>, tag: "ENRICH", tagColor: "text-[#137fec] border-[#137fec]/30", stage: "Enrich" },
    { id: 4, time: "14:21:52", msg: <span>Ingested raw payload from Webhook</span>, tag: "INGEST", tagColor: "text-slate-400 border-slate-500/30", stage: "Ingest" },
  ];

  const filteredLogs = selectedStage ? logs.filter(log => log.stage === selectedStage) : logs;

  // Common Styles
  const glassClass = "bg-white/[0.03] backdrop-blur-xl border border-white/10";

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0c10]">
      <div className="w-full h-full max-w-[600px] max-h-[600px] overflow-hidden relative text-white font-sans flex flex-col selection:bg-[#137fec]/30">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#131824] to-[#0a0c10] -z-10" />
        <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] bg-[#137fec]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] bg-violet-600/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Header - Compact */}
        <header className={`flex items-center justify-between border-b border-white/10 px-4 py-3 ${glassClass} shrink-0 z-20`}>
          <div className="flex items-center gap-3">
            <div className="size-6 text-[#137fec]">
              <Box className="w-full h-full fill-current/20" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold tracking-tight">Marketing Auto Feed</h1>
              <div className="flex items-center gap-1.5">
                <motion.span 
                  className="flex h-1.5 w-1.5 rounded-full bg-red-500"
                  animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[9px] uppercase tracking-widest text-[#9dabb9] font-bold">V1.02 • LIVE</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center rounded-md h-7 w-7 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
              <Bell size={14} />
            </button>
            <div className="h-7 w-7 rounded-full bg-cover bg-center border border-white/20" style={{ backgroundImage: "url('https://picsum.photos/100/100')" }}></div>
          </div>
        </header>

        <main className="flex-1 p-4 flex flex-col gap-3 overflow-hidden relative z-10">
          
          {/* Pipeline Stages - Compact Grid - Interactive */}
          <div className="grid grid-cols-4 gap-2 h-16 shrink-0">
            <StageCard 
              number="01" title="Ingest" icon={<HardDriveDownload size={14} />} 
              colorClass="text-slate-400" bgClass="bg-white/5" 
              isActive={selectedStage === 'Ingest'} 
              onClick={() => handleStageClick('Ingest')}
            />
            <StageCard 
              number="02" title="Enrich" icon={<Database size={14} />} 
              colorClass="text-[#137fec]" bgClass="border-[#137fec]/30 bg-[#137fec]/5" 
              isActive={selectedStage === 'Enrich'} 
              onClick={() => handleStageClick('Enrich')}
            />
            <StageCard 
              number="03" title="Score" icon={<LineChart size={14} />} 
              colorClass="text-violet-400" bgClass="bg-white/5" 
              isActive={selectedStage === 'Score'} 
              onClick={() => handleStageClick('Score')}
            />
            <StageCard 
              number="04" title="Route" icon={<Rocket size={14} />} 
              colorClass="text-emerald-400" bgClass="bg-white/5" 
              isActive={selectedStage === 'Route'} 
              onClick={() => handleStageClick('Route')}
            />
          </div>

          {/* Conveyor Belt Section - Scaled Down */}
          <div className={`relative p-3 ${glassClass} rounded-xl overflow-hidden flex flex-col shrink-0 h-[170px]`}>
            <div className="flex justify-between items-center mb-4 px-1">
               <h2 className="text-white text-xs font-bold uppercase tracking-wider opacity-80">Pipeline Conveyor</h2>
               <div className="flex items-center gap-2">
                 {selectedStage && (
                   <button onClick={() => setSelectedStage(null)} className="text-[9px] text-white/50 hover:text-white transition-colors uppercase font-bold tracking-wider">
                     Reset Filter
                   </button>
                 )}
                 <span className="text-[10px] text-[#137fec] bg-[#137fec]/10 px-2 py-0.5 rounded border border-[#137fec]/20">Active</span>
               </div>
            </div>

            {/* The Belt Track */}
            <div className="w-full h-16 relative rounded-lg border border-white/5 flex items-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] overflow-hidden">
               <div className="absolute inset-0 flex justify-around items-center pointer-events-none opacity-10">
                  <div className="h-full w-px bg-white/50"></div>
                  <div className="h-full w-px bg-white/50"></div>
                  <div className="h-full w-px bg-white/50"></div>
               </div>
               
               <motion.div 
                  className="flex gap-16 absolute items-center pl-16"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  style={{ width: "200%" }} // Ensure enough width for smooth loop
               >
                  {/* Loop Items Twice */}
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className="flex gap-16">
                       <motion.div animate={{ opacity: getItemOpacity('Ingest') }} className="transition-opacity duration-300">
                          <ConveyorItem icon={<User size={16} className="text-slate-400" />} label="ID: 8841" color="border-white/10" />
                       </motion.div>
                       <motion.div animate={{ opacity: getItemOpacity('Enrich') }} className="transition-opacity duration-300">
                          <ConveyorItem icon={<Building2 size={16} className="text-[#137fec]" />} label="ENRICH" color="border-[#137fec]/50 shadow-[0_0_15px_rgba(19,127,236,0.3)]" />
                       </motion.div>
                       <motion.div animate={{ opacity: getItemOpacity('Score') }} className="transition-opacity duration-300">
                          <ConveyorItem icon={<Star size={16} className="text-violet-400" />} label="SCORE" color="border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]" />
                       </motion.div>
                       <motion.div animate={{ opacity: getItemOpacity('Route') }} className="transition-opacity duration-300">
                          <ConveyorItem icon={<Send size={16} className="text-emerald-400" />} label="ROUTE" color="border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                       </motion.div>
                       <motion.div animate={{ opacity: getItemOpacity('Ingest') }} className="transition-opacity duration-300">
                          <ConveyorItem icon={<Mail size={16} className="text-slate-400" />} label="ID: 9021" color="border-white/10" />
                       </motion.div>
                    </div>
                  ))}
               </motion.div>
            </div>

            {/* Mini Metrics */}
            <div className="mt-auto grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
              <MiniMetric label="In Queue" value={stats.inQueue} color="text-white" opacity={getItemOpacity('Ingest')} />
              <MiniMetric label="Enriched" value={stats.enriched} color="text-[#137fec]" opacity={getItemOpacity('Enrich')} />
              <MiniMetric label="Routed" value={stats.routed} color="text-emerald-400" opacity={getItemOpacity('Route')} />
            </div>
          </div>

          {/* Key Stats Row */}
          <div className="grid grid-cols-3 gap-3 h-[90px] shrink-0">
            <StatCard 
              label="Total Rx" 
              value={`${(stats.totalReceived / 1000).toFixed(1)}k`} 
              icon={<Archive size={14} />} 
              trend="+14%" 
              trendColor="text-emerald-400"
              accentColor="slate"
            />
            <StatCard 
              label="Processed" 
              value={stats.processed.toLocaleString()} 
              icon={<CheckCircle size={14} />} 
              trend="42/s" 
              trendColor="text-[#137fec]"
              accentColor="blue"
              isPrimary
            />
            <StatCard 
              label="Success" 
              value={`${stats.successRate}%`} 
              icon={<ShieldCheck size={14} />} 
              trend="+0.4%" 
              trendColor="text-emerald-400"
              accentColor="emerald"
            />
          </div>

          {/* Live Logs - Fill Remaining Space */}
          <div className={`flex-1 ${glassClass} rounded-xl overflow-hidden flex flex-col min-h-0`}>
            <div className="px-3 py-2 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#9dabb9]">Live Log</h3>
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="overflow-y-auto custom-scrollbar p-1">
               <div className="flex flex-col gap-1">
                 <AnimatePresence mode='popLayout'>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <motion.div 
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        layout
                      >
                        <LogItem time={log.time} msg={log.msg} tag={log.tag} tagColor={log.tagColor} />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="p-4 text-center text-xs text-slate-500 italic"
                    >
                      No logs for {selectedStage}...
                    </motion.div>
                  )}
                 </AnimatePresence>
               </div>
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className={`${glassClass} border-t border-white/10 px-4 py-2 flex justify-between items-center text-[9px] text-[#9dabb9] uppercase tracking-widest font-bold shrink-0 z-20`}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500"></span>
              Online
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#137fec]"></span>
              {stats.latency}ms
            </span>
          </div>
          <div>v1.02.4</div>
        </footer>
      </div>
    </div>
  );
}

// Sub-components for cleaner render
function StageCard({ number, title, icon, colorClass, bgClass, onClick, isActive }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col justify-center items-center p-2 rounded-lg border transition-all duration-200 relative overflow-hidden group w-full ${isActive ? 'bg-white/10 border-white/30 ring-1 ring-white/20' : 'border-white/5 hover:bg-white/5 hover:border-white/10'} ${bgClass}`}
    >
       <div className={`absolute top-1 right-2 text-xs font-black italic transition-opacity duration-200 ${isActive ? 'opacity-50' : 'opacity-20'} ${colorClass}`}>{number}</div>
       <div className={`mb-1 transition-transform duration-200 ${isActive ? 'scale-110' : ''} ${colorClass}`}>{icon}</div>
       <span className={`text-[10px] font-bold uppercase tracking-wider ${colorClass}`}>{title}</span>
    </button>
  );
}

function ConveyorItem({ icon, label, color }: any) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-12 shrink-0">
      <div className={`size-9 bg-[#1a202c]/80 backdrop-blur-sm rounded-lg flex items-center justify-center border ${color}`}>
        <motion.div
           animate={{ scale: [1, 1.15, 1] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
      </div>
      <span className="text-[9px] text-slate-500 font-mono whitespace-nowrap">{label}</span>
    </div>
  );
}

function MiniMetric({ label, value, color, opacity = 1 }: any) {
  return (
    <motion.div 
      animate={{ opacity }} 
      className="flex flex-col items-center text-center transition-opacity duration-300"
    >
      <span className="text-[9px] text-[#9dabb9] uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-black tabular-nums tracking-tight ${color}`}>{value.toLocaleString()}</span>
    </motion.div>
  );
}

function StatCard({ label, value, icon, trend, trendColor, accentColor, isPrimary }: any) {
  const bg = isPrimary ? "bg-[#137fec]/5 border-[#137fec]/30" : "bg-white/5 border-white/10";
  return (
    <div className={`p-3 rounded-xl border flex flex-col justify-between relative overflow-hidden ${bg}`}>
       <div className="flex justify-between items-start">
          <span className="text-[10px] font-semibold text-[#9dabb9]">{label}</span>
          <div className={`opacity-70 ${isPrimary ? 'text-[#137fec]' : 'text-slate-500'}`}>{icon}</div>
       </div>
       <div>
         <div className="text-xl font-black tracking-tight tabular-nums mt-1">{value}</div>
         <div className={`text-[9px] font-bold flex items-center gap-0.5 mt-1 ${trendColor}`}>
            <TrendingUp size={8} />
            {trend}
         </div>
       </div>
    </div>
  );
}

function LogItem({ time, msg, tag, tagColor }: any) {
  return (
    <div className="px-3 py-2 flex items-center gap-2 hover:bg-white/5 transition-colors rounded-lg border border-transparent hover:border-white/5">
      <div className="size-1.5 rounded-full bg-white/20 shrink-0"></div>
      <span className="text-[9px] text-slate-500 font-mono shrink-0">{time}</span>
      <span className="text-[10px] font-medium truncate leading-tight">{msg}</span>
      <span className={`ml-auto px-1.5 py-0.5 rounded-[4px] border text-[8px] font-bold ${tagColor} bg-black/20`}>{tag}</span>
    </div>
  );
}