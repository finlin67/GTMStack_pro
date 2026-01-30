import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, Mail, MousePointerClick, UserSearch, 
  Touchpad, Zap, Activity
} from 'lucide-react';

// --- Types --- 
export interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ElementType;
  colorClass: string;
  iconBgClass: string;
  tag?: string;
  conversionText?: string;
  conversionSubtext?: string;
}

export interface TouchpointItemProps {
  icon: React.ElementType;
  title: string;
  value: number;
  percentage: number;
  colorClass: string;
  iconBorderClass: string;
  iconBgClass: string;
  barColorClass: string;
}

// --- Components ---

const NetworkTopology: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleNodeClick = (node: string) => {
    setActiveNode(node);
    setTimeout(() => setActiveNode(null), 1000);
  };

  return (
    <div className="relative w-full h-full aspect-square rounded-2xl overflow-hidden group">
      {/* Background Dots */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Connecting Lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Mail Line */}
        <motion.line 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: activeNode === 'mail' ? [0.4, 1, 0.4] : 0.4,
            strokeDasharray: activeNode === 'mail' ? "8 8" : "4 4",
            strokeWidth: activeNode === 'mail' ? [2, 4, 2] : 2
          }}
          transition={{ duration: activeNode === 'mail' ? 1 : 1.5, ease: "easeInOut" }}
          x1="50%" y1="50%" x2="20%" y2="25%" 
          stroke="#fbbf24" 
        />
        {/* Ads Line */}
        <motion.line 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: activeNode === 'ads' ? [0.4, 1, 0.4] : 0.4,
            strokeDasharray: activeNode === 'ads' ? "8 8" : "4 4",
            strokeWidth: activeNode === 'ads' ? [2, 4, 2] : 2
          }}
          transition={{ duration: activeNode === 'ads' ? 1 : 1.5, delay: activeNode ? 0 : 0.2, ease: "easeInOut" }}
          x1="50%" y1="50%" x2="80%" y2="25%" 
          stroke="#60a5fa" 
        />
        {/* Search Line */}
        <motion.line 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: activeNode === 'search' ? [0.4, 1, 0.4] : 0.4,
            strokeDasharray: activeNode === 'search' ? "8 8" : "4 4",
            strokeWidth: activeNode === 'search' ? [2, 4, 2] : 2
          }}
          transition={{ duration: activeNode === 'search' ? 1 : 1.5, delay: activeNode ? 0 : 0.4, ease: "easeInOut" }}
          x1="50%" y1="50%" x2="50%" y2="80%" 
          stroke="#a78bfa" 
        />
      </svg>

      {/* Central Hub */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-24 rounded-full border-2 border-primary bg-primary/10 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(96,165,250,0.2)] backdrop-blur-sm z-20"
      >
        <span className="text-primary text-2xl font-black tracking-tight">1,240</span>
        <span className="text-blue-200/50 text-[10px] font-bold uppercase tracking-widest mt-1">Hub</span>
        
        {/* Ripple Effect */}
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-primary/30"
        />
      </motion.div>

      {/* Satellite Nodes */}
      
      {/* Mail Node (Top Left) */}
      <motion.div 
        initial={{ scale: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: activeNode === 'mail' ? 1.15 : 1, x: "-50%", y: "-50%" }}
        transition={{ delay: activeNode ? 0 : 0.5, type: "spring" }}
        className="absolute top-[25%] left-[20%] size-12 rounded-full border border-accent/50 bg-accent/5 flex items-center justify-center z-30 hover:bg-accent/20 transition-colors cursor-pointer"
        onClick={() => handleNodeClick('mail')}
        onMouseEnter={() => setHoveredNode('mail')}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <Mail className="text-accent w-5 h-5" />
        <div className="absolute -top-1 -right-1 size-3 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
        <AnimatePresence>
            {hoveredNode === 'mail' && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900/90 text-accent border border-accent/20 text-[10px] font-bold px-3 py-1.5 rounded-lg backdrop-blur-md whitespace-nowrap shadow-xl z-50 pointer-events-none"
                >
                    Mail Node
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>

      {/* Ads Node (Top Right) */}
      <motion.div 
        initial={{ scale: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: activeNode === 'ads' ? 1.15 : 1, x: "-50%", y: "-50%" }}
        transition={{ delay: activeNode ? 0 : 0.7, type: "spring" }}
        className="absolute top-[25%] left-[80%] size-12 rounded-full border border-primary/50 bg-primary/5 flex items-center justify-center z-30 hover:bg-primary/20 transition-colors cursor-pointer"
        onClick={() => handleNodeClick('ads')}
        onMouseEnter={() => setHoveredNode('ads')}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <MousePointerClick className="text-primary w-5 h-5" />
        <AnimatePresence>
            {hoveredNode === 'ads' && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900/90 text-primary border border-primary/20 text-[10px] font-bold px-3 py-1.5 rounded-lg backdrop-blur-md whitespace-nowrap shadow-xl z-50 pointer-events-none"
                >
                    Ads Node
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>

      {/* Search Node (Bottom) */}
      <motion.div 
        initial={{ scale: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: activeNode === 'search' ? 1.15 : 1, x: "-50%", y: "-50%" }}
        transition={{ delay: activeNode ? 0 : 0.9, type: "spring" }}
        className="absolute top-[80%] left-1/2 size-12 rounded-full border border-secondary/50 bg-secondary/5 flex items-center justify-center z-30 hover:bg-secondary/20 transition-colors cursor-pointer"
        onClick={() => handleNodeClick('search')}
        onMouseEnter={() => setHoveredNode('search')}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <UserSearch className="text-secondary w-5 h-5" />
        <AnimatePresence>
            {hoveredNode === 'search' && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900/90 text-secondary border border-secondary/20 text-[10px] font-bold px-3 py-1.5 rounded-lg backdrop-blur-md whitespace-nowrap shadow-xl z-50 pointer-events-none"
                >
                    Search Node
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Animated Counter Hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count;
};

// Compact Stat Component for Thumbnail
const CompactStat = ({ label, value, sub, color }: { label: string, value: string | number, sub?: string, color: string }) => (
  <div className="flex-1 flex flex-col justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-display">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className={`text-2xl font-black ${color} tracking-tight font-display`}>{value}</span>
      {sub && <span className="text-[9px] font-bold text-success bg-success/10 px-1.5 py-0.5 rounded font-display">{sub}</span>}
    </div>
  </div>
);

// Compact Row Component for Thumbnail
const CompactTouchpoint = ({ icon: Icon, label, value, color, barColor }: { icon: any, label: string, value: string, color: string, barColor: string }) => (
  <div className="flex items-center gap-3 group cursor-default">
    <div className={`size-8 rounded-lg flex items-center justify-center ${color} bg-white/5 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="size-4" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between mb-1.5">
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wide font-display group-hover:text-white transition-colors">{label}</span>
        <span className="text-[10px] font-bold text-white font-display">{value}</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.random() * 30 + 50}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full ${barColor} rounded-full shadow-[0_0_8px_currentColor]`} 
        />
      </div>
    </div>
  </div>
);

export default function App() {
  const total = useCounter(1240);
  const engaged = useCounter(856);
  const pipeline = useCounter(214);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black/90">
      {/* 600x600 Container - STRICT DIMENSIONS */}
      <div className="w-[600px] h-[600px] bg-background-dark relative overflow-hidden flex flex-col shadow-2xl font-display selection:bg-primary/30 rounded-none border border-white/5">
        
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#60a5fa 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        {/* Header */}
        <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-white/5 bg-background-dark/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-3">
            <div className="size-7 bg-primary rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(96,165,250,0.3)]">
              <Share2 className="size-4 text-slate-900 fill-current" />
            </div>
            <span className="text-sm font-extrabold text-white tracking-tight uppercase italic">ABM Network</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-success/10 border border-success/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
            <span className="size-1.5 rounded-full bg-success animate-pulse shadow-[0_0_5px_currentColor]" />
            <span className="text-success text-[10px] font-bold uppercase tracking-widest">Live</span>
          </div>
        </header>

        {/* Main Grid Content */}
        <div className="flex-1 p-6 flex flex-col gap-4 z-20 overflow-hidden">
          
          {/* Top Section: Visualization & Key Metrics */}
          <div className="h-[280px] flex gap-4">
            
            {/* Visual - Network Topology */}
            <div className="flex-1 relative glass-card rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-slate-500 group-hover:bg-primary transition-colors duration-500"></span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-primary transition-colors duration-500">Topology Map</span>
                </div>
                {/* Visual Anchor */}
                <div className="absolute inset-0 flex items-center justify-center scale-90 translate-y-2">
                   <NetworkTopology />
                </div>
            </div>

            {/* Key Stats Column */}
            <div className="w-[190px] flex flex-col gap-3">
               <CompactStat label="Total Accounts" value={total.toLocaleString()} sub="+5.2%" color="text-white" />
               <CompactStat label="Engaged Accounts" value={engaged} sub="+12%" color="text-primary" />
               
               {/* Hero Stat */}
               <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 flex flex-col justify-center relative overflow-hidden group">
                  <div className="absolute -right-6 -top-6 text-secondary/10 group-hover:text-secondary/20 transition-colors duration-500">
                    <Zap className="size-28 rotate-12" />
                  </div>
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1 block">Active Pipeline</span>
                    <div className="text-4xl font-black text-white mb-2 tracking-tighter">{pipeline}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-medium">
                      <div className="p-0.5 rounded bg-secondary/20 text-secondary">
                        <Activity className="size-3" />
                      </div>
                      <span>High Intent</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom Section: Engagement Flow */}
          <div className="flex-1 glass-card rounded-2xl p-5 border border-white/10 flex flex-col shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Touchpad className="size-24 text-slate-400" />
            </div>

            <div className="flex justify-between items-center mb-5 relative z-10">
               <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                 <div className="size-1.5 bg-primary rounded-full shadow-[0_0_8px_currentColor]" />
                 Engagement Flow
               </h3>
               <span className="text-[9px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5">REAL-TIME DATA</span>
            </div>
            
            <div className="flex-1 flex flex-col justify-around relative z-10">
               <CompactTouchpoint icon={Mail} label="Email Sequence" value="248 Active" color="text-accent" barColor="bg-accent" />
               <CompactTouchpoint icon={MousePointerClick} label="Ad Impressions" value="1.2k Views" color="text-primary" barColor="bg-primary" />
               <CompactTouchpoint icon={UserSearch} label="SDR Outreach" value="86 Calls" color="text-secondary" barColor="bg-secondary" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}