
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Layers, 
  Warehouse, 
  Building2, 
  Database, 
  Truck, 
  Banknote, 
  Leaf, 
  MapPin,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  X,
  Activity
} from 'lucide-react';

// --- Types & Constants ---

type Hub = {
  id: string;
  x: number;
  y: number;
  name: string;
  code: string;
  status: 'active' | 'warning' | 'idle';
  volume: number;
  type: 'Distribution' | 'Manufacturing' | 'HQ';
};

const INITIAL_HUBS: Hub[] = [
  { id: 'sfo', x: 15, y: 38, name: 'San Francisco', code: 'SFO', status: 'active', volume: 85, type: 'HQ' },
  { id: 'nyc', x: 28, y: 35, name: 'New York', code: 'JFK', status: 'active', volume: 92, type: 'Distribution' },
  { id: 'lon', x: 48, y: 28, name: 'London', code: 'LHR', status: 'warning', volume: 74, type: 'Distribution' },
  { id: 'ber', x: 52, y: 26, name: 'Berlin', code: 'BER', status: 'active', volume: 68, type: 'Manufacturing' },
  { id: 'dxb', x: 62, y: 38, name: 'Dubai', code: 'DXB', status: 'active', volume: 88, type: 'Distribution' },
  { id: 'sin', x: 78, y: 55, name: 'Singapore', code: 'SIN', status: 'active', volume: 95, type: 'HQ' },
  { id: 'tok', x: 88, y: 38, name: 'Tokyo', code: 'HND', status: 'active', volume: 82, type: 'Manufacturing' },
  { id: 'syd', x: 92, y: 75, name: 'Sydney', code: 'SYD', status: 'idle', volume: 45, type: 'Distribution' },
  { id: 'sao', x: 32, y: 65, name: 'São Paulo', code: 'GRU', status: 'warning', volume: 65, type: 'Distribution' },
  { id: 'cpt', x: 54, y: 70, name: 'Cape Town', code: 'CPT', status: 'active', volume: 55, type: 'Distribution' },
];

const ROUTES_DATA = [
  ['sfo', 'nyc'], ['nyc', 'lon'], ['lon', 'ber'], ['ber', 'dxb'],
  ['dxb', 'sin'], ['sin', 'tok'], ['tok', 'syd'], ['nyc', 'sao'],
  ['lon', 'sao'], ['lon', 'cpt'], ['sfo', 'tok'],
];

// --- Main Component ---

export default function ExecutiveLogisticsDashboard() {
  const [stats, setStats] = useState({
    globalNodes: 1422,
    supplyChain: 94.2,
    networkFlow: 98.9,
    revenue: 1.24,
    carbon: 840.5
  });

  const [hubs, setHubs] = useState<Hub[]>(INITIAL_HUBS);

  // Simulate organic live data jitter for stats and map data
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Update Top-level Stats
      setStats(prev => ({
        globalNodes: Math.floor(prev.globalNodes + (Math.random() - 0.5) * 4),
        supplyChain: +(prev.supplyChain + (Math.random() - 0.5) * 0.1).toFixed(1),
        networkFlow: +(prev.networkFlow + (Math.random() - 0.5) * 0.1).toFixed(1),
        revenue: +(prev.revenue + (Math.random() - 0.5) * 0.01).toFixed(2),
        carbon: +(prev.carbon + (Math.random() - 0.5) * 0.5).toFixed(1)
      }));

      // 2. Update Real-time Hub Data
      setHubs(currentHubs => currentHubs.map(hub => {
        // Random walk for volume
        const volChange = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const newVolume = Math.max(0, Math.min(100, hub.volume + volChange));
        
        // Status state machine simulation
        let newStatus = hub.status;
        const roll = Math.random();
        
        if (hub.status === 'active') {
          if (roll < 0.02) newStatus = 'warning'; // 2% chance to go warning
          else if (roll < 0.03) newStatus = 'idle'; // 1% chance to go idle
        } else if (hub.status === 'warning') {
          if (roll < 0.2) newStatus = 'active'; // 20% chance to recover
        } else if (hub.status === 'idle') {
          if (roll < 0.1) newStatus = 'active'; // 10% chance to reactivate
        }

        return { ...hub, volume: newVolume, status: newStatus };
      }));

    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full aspect-square flex items-center justify-center bg-slate-900 font-sans antialiased text-white p-2">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full h-full max-w-[600px] max-h-[600px] bg-[#0a0e14] border border-white/10 shadow-2xl overflow-hidden rounded-2xl flex flex-col"
      >
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#06b6d4]/10 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#6366f1]/10 blur-[80px] rounded-full -ml-24 -mb-24 pointer-events-none"></div>

        <div className="w-full h-full p-4 flex flex-col gap-4 relative z-10">
          
          {/* Header */}
          <div className="flex items-center justify-between px-2 shrink-0">
            <div className="flex items-center gap-2">
              <Network className="text-[#06b6d4] w-5 h-5" />
              <h2 className="font-bold text-sm tracking-tight">
                Executive Dashboard <span className="text-xs font-normal text-white/40 ml-1">v2.4</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-[#06b6d4] uppercase tracking-tighter">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#06b6d4]"></span>
                </span>
                System Healthy
              </span>
            </div>
          </div>

          {/* Main Visual / Map Area */}
          <div className="relative flex-1 w-full bg-slate-900/50 rounded-xl overflow-hidden border border-white/5 group z-0 min-h-0">
            {/* Dynamic Logistics Map */}
            <LogisticsMap hubs={hubs} />
            
            {/* Legend / Overlay Controls */}
            <div className="absolute right-3 top-3 flex flex-col gap-1.5 pointer-events-none">
              <TooltipIcon icon={<Layers className="w-3 h-3 text-[#06b6d4]" />} color="border-l-[#06b6d4]" label="TMS Active" />
              <TooltipIcon icon={<Warehouse className="w-3 h-3 text-[#6366f1]" />} color="border-l-[#6366f1]" label="WMS Active" />
              <TooltipIcon icon={<Building2 className="w-3 h-3 text-[#3d84f5]" />} color="border-l-[#3d84f5]" label="ERP Active" />
            </div>

            <div className="absolute bottom-4 left-4 flex flex-col gap-0.5 pointer-events-none">
              <div className="text-[10px] font-black text-[#06b6d4]/60 uppercase tracking-widest">Global Nodes</div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tighter flex items-center gap-2">
                <AnimateNumber value={stats.globalNodes} />
                <span className="text-xs sm:text-sm text-green-400 font-bold ml-1 bg-green-400/10 px-2 py-0.5 rounded-full">+4%</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 h-auto sm:h-[240px] shrink-0">
            {/* Card 1: Supply Chain */}
            <div className="bg-slate-900/70 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-xl flex flex-col justify-between border-l-4 border-l-[#06b6d4] hover:bg-slate-800/50 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Procurement</p>
                  <h4 className="text-base sm:text-lg font-bold leading-tight">Supply Chain</h4>
                </div>
                <Database className="text-[#06b6d4] w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex items-end justify-between mt-2 sm:mt-0">
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-green-400 flex">
                    <AnimateNumber value={stats.supplyChain} isFloat />%
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-white/60 uppercase">Optimized</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] sm:text-xs font-bold text-red-400">-12% <span className="text-[8px] opacity-60 block sm:inline">LEAD TIME</span></span>
                </div>
              </div>
            </div>

            {/* Card 2: Network Flow */}
            <div className="bg-slate-900/70 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-xl flex flex-col justify-between border-l-4 border-l-[#6366f1] hover:bg-slate-800/50 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Distribution</p>
                  <h4 className="text-base sm:text-lg font-bold leading-tight">Network Flow</h4>
                </div>
                <Truck className="text-[#6366f1] w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex items-end justify-between mt-2 sm:mt-0">
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-[#06b6d4] flex">
                    <AnimateNumber value={stats.networkFlow} isFloat />%
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-white/60 uppercase">On-Schedule</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] sm:text-xs font-bold text-green-400">+25% <span className="text-[8px] opacity-60 block sm:inline">EFFICIENCY</span></span>
                </div>
              </div>
            </div>

            {/* Card 3: Revenue Impact */}
            <div className="bg-slate-900/70 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-xl flex flex-col justify-center border-l-4 border-l-green-500 relative overflow-hidden group">
              <div className="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity">
                <Banknote className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>
              <p className="text-[9px] sm:text-[10px] text-white/50 font-black uppercase tracking-widest mb-1">Revenue Impact</p>
              <p className="text-2xl sm:text-3xl font-black text-green-400 flex items-center">
                $<AnimateNumber value={stats.revenue} isFloat />M
              </p>
            </div>

            {/* Card 4: Carbon Reduction */}
            <div className="bg-slate-900/70 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-xl flex flex-col justify-center border-l-4 border-l-white/40 relative overflow-hidden group">
              <div className="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity">
                <Leaf className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>
              <p className="text-[9px] sm:text-[10px] text-white/50 font-black uppercase tracking-widest mb-1">Carbon Reduction</p>
              <p className="text-2xl sm:text-3xl font-black flex items-center">
                <AnimateNumber value={stats.carbon} isFloat />t
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-1 shrink-0">
            <p className="text-[8px] sm:text-[9px] font-medium text-white/30 uppercase tracking-[0.15em]">Logistics Intelligence Platform</p>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6,182,212,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-[#06b6d4] to-[#6366f1] text-white text-[9px] sm:text-[10px] font-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all uppercase tracking-widest"
            >
              Detailed Analytics
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- Map Logic & Components ---

function LogisticsMap({ hubs }: { hubs: Hub[] }) {
  const [selectedHub, setSelectedHub] = useState<string | null>(null);
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  // Clear selection when clicking background
  const handleBgClick = () => setSelectedHub(null);

  const activeHoverHub = hubs.find(h => h.id === hoveredHub);
  const activeSelectedHub = hubs.find(h => h.id === selectedHub);

  return (
    <div className="absolute inset-0 w-full h-full bg-slate-900" onClick={handleBgClick}>
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} 
      />

      <svg className="w-full h-full pointer-events-none">
        {/* World Outline (Simplified Abstract Polyline) */}
        <motion.path
          d="M10,20 Q20,10 30,15 T50,15 T70,20 T90,15 M15,40 Q25,30 35,60 T55,70 T85,60 M10,35 Q15,45 20,40"
          fill="none"
          stroke="#3d84f5"
          strokeWidth="0.5"
          strokeOpacity="0.1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        {/* Routes */}
        {ROUTES_DATA.map(([start, end], i) => {
          const h1 = hubs.find(h => h.id === start);
          const h2 = hubs.find(h => h.id === end);
          if (!h1 || !h2) return null;
          
          // Determine if this route is connected to the selected hub
          const isConnected = selectedHub ? (start === selectedHub || end === selectedHub) : false;
          // Determine opacity: If a hub is selected, dim unrelated routes
          const isDimmed = selectedHub && !isConnected;

          return (
            <MapRoute 
              key={i} 
              x1={h1.x} 
              y1={h1.y} 
              x2={h2.x} 
              y2={h2.y} 
              delay={i * 0.2}
              isDimmed={isDimmed || false}
              isHighlighted={isConnected}
            />
          );
        })}

        {/* Hubs */}
        <g className="pointer-events-auto">
           {hubs.map(hub => {
             const isSelected = selectedHub === hub.id;
             const isDimmed = selectedHub && !isSelected;
             return (
              <MapHub 
                key={hub.id} 
                hub={hub}
                isSelected={isSelected}
                isDimmed={!!isDimmed}
                onSelect={(e) => {
                  e.stopPropagation();
                  setSelectedHub(isSelected ? null : hub.id);
                }}
                onHover={() => setHoveredHub(hub.id)}
                onLeave={() => setHoveredHub(null)}
              />
             );
           })}
        </g>
      </svg>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30 pointer-events-none"></div>

      {/* Floating Tooltip / Info Card */}
      <AnimatePresence>
        {activeHoverHub && (
          <HubTooltip hub={activeHoverHub} />
        )}
      </AnimatePresence>
      
      {/* Selected Info Panel - Sticky Bottom Left */}
      <AnimatePresence>
        {activeSelectedHub && !activeHoverHub && (
          <HubDetailPanel hub={activeSelectedHub} onClose={() => setSelectedHub(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function HubTooltip({ hub }: { hub: Hub }) {
  // Simple positioning logic: Determine if it should be left or right based on X coord
  const isRight = hub.x > 50;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`absolute top-0 pointer-events-none z-50 p-3 rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl flex flex-col gap-1 min-w-[140px]`}
      style={{
        left: isRight ? 'auto' : `${hub.x + 3}%`,
        right: isRight ? `${100 - hub.x + 3}%` : 'auto',
        top: `${hub.y - 10}%`
      }}
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1">
        <span className="text-xs font-bold text-white">{hub.name}</span>
        <span className="text-[9px] font-mono text-white/50">{hub.code}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${hub.status === 'active' ? 'bg-green-400' : hub.status === 'warning' ? 'bg-amber-400' : 'bg-slate-500'}`}></div>
        <span className="text-[10px] text-white/80 capitalize">{hub.status}</span>
      </div>
      <div className="flex justify-between items-end mt-1">
        <span className="text-[9px] text-white/40 uppercase tracking-wider">Volume</span>
        <span className="text-sm font-bold text-[#06b6d4]">{hub.volume}%</span>
      </div>
    </motion.div>
  );
}

function HubDetailPanel({ hub, onClose }: { hub: Hub, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute bottom-4 left-4 z-40 p-4 w-48 rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl"
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-white/40 hover:text-white">
        <X size={12} />
      </button>
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="text-[#6366f1] w-4 h-4" />
        <div>
          <h3 className="text-sm font-bold leading-none">{hub.name}</h3>
          <p className="text-[10px] text-white/40 font-mono mt-0.5">{hub.code} • {hub.type}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
          <span className="text-[10px] text-white/60">Status</span>
          {hub.status === 'active' ? (
             <div className="flex items-center gap-1 text-[10px] text-green-400 font-bold">
               <CheckCircle2 size={10} /> Optimal
             </div>
          ) : hub.status === 'warning' ? (
             <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
               <AlertCircle size={10} /> Congested
             </div>
          ) : (
             <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
               <Activity size={10} /> Idle
             </div>
          )}
        </div>
        
        <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
          <span className="text-[10px] text-white/60">Throughput</span>
          <div className="flex items-center gap-1 text-[10px] text-[#06b6d4] font-bold">
            <TrendingUp size={10} /> {hub.volume}k/day
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-white/10">
        <button className="w-full py-1.5 bg-white/10 hover:bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider transition-colors">
          View Node Analytics
        </button>
      </div>
    </motion.div>
  );
}

const MapHub: React.FC<{ 
  hub: Hub; 
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onHover: () => void;
  onLeave: () => void;
}> = ({ 
  hub, 
  isSelected, 
  isDimmed,
  onSelect, 
  onHover, 
  onLeave 
}) => {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isDimmed ? 0.3 : 1, 
        scale: isSelected ? 1.2 : 1 
      }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.3 }}
    >
      {/* Hit Area */}
      <circle cx={`${hub.x}%`} cy={`${hub.y}%`} r="8" fill="transparent" />
      
      {/* Core Dot */}
      <motion.circle 
        cx={`${hub.x}%`} 
        cy={`${hub.y}%`} 
        r={isSelected ? "3" : "2"} 
        fill={hub.status === 'warning' ? '#fbbf24' : (hub.status === 'idle' ? '#64748b' : (isSelected ? '#ffffff' : '#3d84f5'))}
        animate={{
           fill: isSelected ? '#ffffff' : (hub.status === 'warning' ? '#fbbf24' : (hub.status === 'idle' ? '#64748b' : '#3d84f5'))
        }}
      />
      
      {/* Pulse Effect - Only if active and not dimmed */}
      {!isDimmed && hub.status !== 'idle' && (
        <motion.circle 
          cx={`${hub.x}%`} 
          cy={`${hub.y}%`} 
          r="8" 
          stroke={hub.status === 'warning' ? '#fbbf24' : '#3d84f5'} 
          strokeWidth="0.5" 
          strokeOpacity="0.3" 
          fill="none"
        >
           <animate attributeName="r" values="2;8" dur="2s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
        </motion.circle>
      )}

      {/* Selected Ring */}
      {isSelected && (
        <motion.circle 
          cx={`${hub.x}%`} 
          cy={`${hub.y}%`} 
          r="5" 
          stroke="#fff" 
          strokeWidth="1" 
          fill="none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}
    </motion.g>
  );
}

const MapRoute: React.FC<{ 
  x1: number; y1: number; x2: number; y2: number; delay: number; isDimmed?: boolean; isHighlighted?: boolean 
}> = ({ 
  x1, y1, x2, y2, delay, isDimmed, isHighlighted 
}) => {
  return (
    <motion.g animate={{ opacity: isDimmed ? 0.1 : (isHighlighted ? 1 : 0.6) }}>
      {/* Static Line */}
      <motion.line
        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
        stroke={isHighlighted ? "#fff" : "#6366f1"}
        strokeWidth={isHighlighted ? "1" : "0.5"}
        strokeOpacity={isHighlighted ? 0.5 : 0.2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: delay * 0.5 }}
      />
      {/* Animated Packet - Only show if not dimmed */}
      {!isDimmed && (
        <motion.circle
          r={isHighlighted ? "2" : "1.5"}
          fill={isHighlighted ? "#fff" : "#06b6d4"}
        >
          <animate
            attributeName="cx"
            from={`${x1}%`} to={`${x2}%`}
            dur={`${2 + Math.random()}s`}
            repeatCount="indefinite"
            begin={`${delay}s`}
          />
          <animate
            attributeName="cy"
            from={`${y1}%`} to={`${y2}%`}
            dur={`${2 + Math.random()}s`}
            repeatCount="indefinite"
            begin={`${delay}s`}
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur={`${2 + Math.random()}s`}
            repeatCount="indefinite"
            begin={`${delay}s`}
          />
        </motion.circle>
      )}
    </motion.g>
  );
}

// --- Helper Components ---

function TooltipIcon({ icon, color, label }: { icon: React.ReactNode, color: string, label?: string }) {
  return (
    <div className="group relative flex items-center">
      <div className={`bg-slate-900/80 backdrop-blur-md w-7 h-7 rounded-lg flex items-center justify-center border-l ${color} border border-white/10 z-20`}>
        {icon}
      </div>
      {/* Hover Label */}
      {label && (
        <div className="absolute right-full mr-2 px-2 py-1 bg-slate-800 text-[9px] font-bold text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {label}
        </div>
      )}
    </div>
  );
}

function AnimateNumber({ value, isFloat = false }: { value: number, isFloat?: boolean }) {
  return (
    <span>{value.toLocaleString(undefined, { minimumFractionDigits: isFloat ? 1 : 0, maximumFractionDigits: isFloat ? 2 : 0 })}</span>
  );
}
