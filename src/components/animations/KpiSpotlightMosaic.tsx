'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Radio, 
  Sparkles, 
  Brain, 
  Link, 
  ChevronRight,
  TrendingUp,
  TrendingDown,
  X,
  Maximize2
} from 'lucide-react';

// --- Types ---
interface DashboardStats {
  conversionRate: number;
  conversionTrend: number;
  forecast: number;
  forecastTrend: number;
  trafficBoost: number;
  trafficTrend: number;
  referralRate: number;
  referralTrend: number;
  refreshMs: number;
  status: 'OPTIMIZED' | 'SYNCING' | 'PROCESSING';
}

// --- Mock Server-Sent Events Class ---
class MockEventSource {
  url: string;
  onmessage: ((event: { data: string }) => void) | null = null;
  private interval: ReturnType<typeof setInterval> | null = null;
  private currentStats: DashboardStats;

  constructor(url: string) {
    this.url = url;
    this.currentStats = {
      conversionRate: 3.42,
      conversionTrend: 12.5,
      forecast: 3.85,
      forecastTrend: 5.2,
      trafficBoost: 12,
      trafficTrend: 8.1,
      referralRate: 5.2,
      referralTrend: -2.4,
      refreshMs: 14,
      status: 'OPTIMIZED'
    };
    this.startStream();
  }

  private startStream() {
    this.interval = setInterval(() => {
      this.evolveData();
      if (this.onmessage) this.onmessage({ data: JSON.stringify(this.currentStats) });
    }, 1200);
  }

  private evolveData() {
    const r = Math.random();
    if (r > 0.95) this.currentStats.status = 'SYNCING';
    else if (r > 0.90) this.currentStats.status = 'PROCESSING';
    else this.currentStats.status = 'OPTIMIZED';

    const drift = (val: number, range: number) => Number((val + (Math.random() * range) - (range / 2)).toFixed(2));
    
    this.currentStats.conversionRate = drift(this.currentStats.conversionRate, 0.08);
    this.currentStats.forecast = drift(this.currentStats.forecast, 0.12);
    this.currentStats.referralRate = Math.min(9.8, Math.max(1.2, drift(this.currentStats.referralRate, 0.3)));
    
    if (r > 0.7) {
      this.currentStats.conversionTrend = drift(this.currentStats.conversionTrend, 0.5);
      this.currentStats.forecastTrend = drift(this.currentStats.forecastTrend, 0.5);
    }
    this.currentStats.refreshMs = Math.floor(Math.max(8, Math.min(60, this.currentStats.refreshMs + (Math.random() * 10 - 5))));
  }

  close() { if (this.interval) clearInterval(this.interval); }
}

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.08 } }
};
const tileVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { scale: 1.02, zIndex: 10, transition: { duration: 0.2 } }
};
const tooltipVariants: Variants = {
  hidden: { opacity: 0, y: 5, scale: 0.95 },
  visible: { opacity: 0, y: 5, scale: 0.95 }, // Start hidden
  hover: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, delay: 0.1 } }
};
const numberVariants: Variants = { initial: { opacity: 0.5, y: 5 }, animate: { opacity: 1, y: 0 } };
const radioVariants: Variants = {
  OPTIMIZED: { color: '#93E7FB', scale: 1, transition: { duration: 0.3 } },
  SYNCING: { color: '#FF6B00', scale: [1, 1.1, 1], transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" } },
  PROCESSING: { color: '#C084FC', rotate: 360, transition: { duration: 1.5, repeat: Infinity, ease: "linear" } }
};
const footerStatusVariants: Variants = {
  OPTIMIZED: { color: '#93E7FB' },
  SYNCING: { color: '#FF6B00', opacity: [1, 0.7, 1], transition: { duration: 0.8, repeat: Infinity } },
  PROCESSING: { color: '#C084FC' }
};

// --- Helper Components ---
const Tooltip = ({ label, value, trend, suffix = "" }: { label: string; value: string | number; trend: number; suffix?: string }) => (
  <motion.div variants={tooltipVariants} className="absolute bottom-3 left-3 bg-card-blue/80 border border-neutral-700/50 p-2 rounded-md shadow-lg backdrop-blur-sm pointer-events-none min-w-[110px] z-20">
    <div className="flex justify-between items-center mb-1">
      <div className="text-[8px] text-neutral-400 font-bold tracking-widest uppercase">{label}</div>
      {trend >= 0 ? <TrendingUp className="w-3 h-3 text-neon-orange" /> : <TrendingDown className="w-3 h-3 text-rose-400" />}
    </div>
    <div className="flex items-baseline gap-1.5">
      <span className="text-white font-mono text-xs font-bold">{value}{suffix}</span>
      <span className={`text-[9px] font-mono ${trend >= 0 ? "text-neon-orange" : "text-rose-400"}`}>
        {trend > 0 ? "+" : ""}{trend}%
      </span>
    </div>
  </motion.div>
);

const ChartInteractionPoint = ({ x, y, value, label, color }: { x: number; y: number; value: string; label: string; color: string }) => {
    const xOffset = x > 80 ? -35 : x < 20 ? 5 : -15;
    return (
        <motion.g initial="idle" whileHover="active">
            <circle cx={x} cy={y} r={8} fill="transparent" className="cursor-pointer" />
            <motion.circle cx={x} cy={y} r={3} fill={color} stroke="#050C16" strokeWidth="1.5" variants={{ idle: { scale: 1 }, active: { scale: 1.5 } }} />
            <motion.g variants={{ idle: { opacity: 0, y: 5 }, active: { opacity: 1, y: 0 } }} transition={{ duration: 0.2 }} style={{ pointerEvents: 'none' }}>
                <g transform={`translate(${x + xOffset}, ${y - 25})`}>
                    <rect width="30" height="18" rx="2" fill="#0D1B2A" fillOpacity="0.9" stroke="rgba(147, 231, 251, 0.2)" strokeWidth="0.5" />
                    <text x="15" y="7" textAnchor="middle" fill="#9ca3af" fontSize="4" fontWeight="600" className="uppercase">{label}</text>
                    <text x="15" y="14" textAnchor="middle" fill="white" fontSize="5" fontWeight="700">{value}</text>
                </g>
            </motion.g>
        </motion.g>
    );
};

const InsightModal = ({ isOpen, onClose, stats }: { isOpen: boolean; onClose: () => void; stats: DashboardStats }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-ink-blue border border-ice-blue/30 shadow-2xl shadow-ice-blue/10 rounded-lg z-[101] overflow-hidden flex flex-col">
          <div className="h-1 w-full bg-ice-blue shadow-glow-ice" />
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2.5">
                <Brain className="w-5 h-5 text-ice-blue" />
                <span className="text-xs font-black text-ice-blue uppercase tracking-widest">Neural Analysis</span>
              </div>
              <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <h2 className="font-impact text-3xl text-neutral-100 leading-none mb-4">PREDICTIVE TRAFFIC SURGE</h2>
            <p className="text-sm text-neutral-300 mb-5 leading-relaxed font-mono">Anomaly detected: +{stats.trafficBoost}% traffic deviation correlated with "Summer Sale" campaign vectors.</p>
            <div className="bg-card-blue p-3 border border-ice-blue/20 rounded-md mb-5">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-ice-blue/80">Server Load Forecast</span>
                <span className="text-ice-blue font-bold text-xs">{(stats.trafficBoost * 2).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-ink-blue h-1.5 rounded-full overflow-hidden border border-ice-blue/10"><motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, stats.trafficBoost * 2)}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-ice-blue" /></div>
            </div>
            <button onClick={onClose} className="w-full py-2.5 bg-ice-blue hover:bg-white text-ink-blue font-bold text-xs uppercase tracking-widest transition-colors rounded-md">Acknowledge</button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const ZoomableSVG = ({ children, initialViewBox, className, preserveAspectRatio = "xMidYMid meet" }: { children?: React.ReactNode; initialViewBox: string; className?: string; preserveAspectRatio?: string; }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [vb, setVb] = useState(() => { const [x, y, w, h] = initialViewBox.split(' ').map(Number); return { x, y, w, h, origX: x, origY: y, origW: w, origH: h }; });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = svgRef.current; if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 1.05 : 0.95;
      setVb(p => {
        const nW = Math.min(p.origW, Math.max(p.origW / 4, p.w * zoomFactor)), nH = Math.min(p.origH, Math.max(p.origH / 4, p.h * zoomFactor));
        const dX = (p.w - nW) / 2, dY = (p.h - nH) / 2;
        let nX = Math.max(p.origX, Math.min(p.x + dX, p.origX + p.origW - nW)), nY = Math.max(p.origY, Math.min(p.y + dY, p.origY + p.origH - nH));
        return { ...p, w: nW, h: nH, x: nX, y: nY };
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => { setIsDragging(true); setDragStart({ x: e.clientX, y: e.clientY }); };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !svgRef.current) return;
    const { width, height } = svgRef.current.getBoundingClientRect();
    const dX = (e.clientX - dragStart.x) * (vb.w / width), dY = (e.clientY - dragStart.y) * (vb.h / height);
    setDragStart({ x: e.clientX, y: e.clientY });
    setVb(p => ({ ...p, x: Math.max(p.origX, Math.min(p.x - dX, p.origX + p.origW - p.w)), y: Math.max(p.origY, Math.min(p.y - dY, p.origY + p.origH - p.h)) }));
  };
  const stopDrag = () => setIsDragging(false);
  const handleDoubleClick = () => setVb(p => ({ ...p, x: p.origX, y: p.origY, w: p.origW, h: p.origH }));

  return (
    <div className="w-full h-full relative">
      <motion.svg ref={svgRef} className={`${className} cursor-${isDragging ? 'grabbing' : 'grab'} rounded-md`} viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} preserveAspectRatio={preserveAspectRatio} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDrag} onMouseLeave={stopDrag} onDoubleClick={handleDoubleClick}>
        {children}
      </motion.svg>
      {(vb.w < vb.origW || vb.h < vb.origH) && (<div className="absolute top-1.5 right-1.5 pointer-events-none opacity-50"><Maximize2 className="w-3 h-3 text-neutral-500" /></div>)}
    </div>
  );
};

export default function KpiSpotlightMosaic() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({ conversionRate: 3.42, conversionTrend: 12.5, forecast: 3.85, forecastTrend: 5.2, trafficBoost: 12, trafficTrend: 8.1, referralRate: 5.2, referralTrend: -2.4, refreshMs: 14, status: 'OPTIMIZED' });

  useEffect(() => {
    const eventSource = new MockEventSource('/api/live-metrics');
    eventSource.onmessage = (event) => { try { const data = JSON.parse(event.data); setStats(prev => ({ ...prev, ...data })); } catch (e) { console.error("Failed to parse metric", e); } };
    return () => eventSource.close();
  }, []);

  const TARGET_REFERRAL_RATE = 8.0;
  const radialRadius = 32;
  const radialCircumference = 2 * Math.PI * radialRadius;
  const getDayStr = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`; };

  return (
    <div className="w-full h-full flex justify-center items-center bg-ink-blue p-4 font-sans text-neutral-200">
      <motion.div className="w-full max-w-[600px] max-h-[600px] aspect-square overflow-hidden relative flex flex-col gap-2.5" variants={containerVariants} initial="hidden" animate="visible">
        {/* --- Header --- */}
        <header className="h-[50px] flex justify-between items-center px-4 bg-card-blue/50 border border-ice-blue/20 rounded-lg backdrop-blur-sm shrink-0">
          <div>
            <span className="font-impact text-xl leading-none tracking-widest text-neutral-100">KPI SPOTLIGHT</span>
            <span className="block text-[7px] font-black uppercase tracking-[0.2em] text-neutral-400">EXECUTIVE BRIEFING</span>
          </div>
          <div className="flex items-center gap-2.5">
            <motion.div variants={radioVariants} animate={stats.status}><Radio className="w-5 h-5" /></motion.div>
            <span className="font-impact text-lg text-neon-orange tracking-widest">LIVE</span>
          </div>
        </header>

        {/* --- Grid --- */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2.5">
          <motion.div variants={tileVariants} whileHover="hover" className="group flex flex-col p-3 relative bg-card-blue border border-ice-blue/20 rounded-lg shadow-lg shadow-black/20 hover:border-ice-blue/60 hover:shadow-glow-ice transition-all">
            <Tooltip label="Conversion" value={stats.conversionRate} trend={stats.conversionTrend} suffix="%" />
            <span className="text-[9px] font-black text-ice-blue uppercase tracking-widest mb-1">CONVERSION RATE</span>
            <div className="flex-1 flex items-center">
                <motion.div key={stats.conversionRate} variants={numberVariants} initial="initial" animate="animate" className="text-[4rem] leading-[0.85] font-impact tracking-tighter text-neutral-100">
                    {stats.conversionRate}<span className="text-2xl ml-1 text-ice-blue/80">%</span>
                </motion.div>
            </div>
            <div className="absolute bottom-3 right-3 w-20 h-8 opacity-90"><ZoomableSVG initialViewBox="0 0 100 30"><motion.path d="M0,25 Q15,28 30,15 T60,10 T100,5" fill="none" stroke="currentColor" strokeWidth="2" className="text-neon-orange" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} /><ChartInteractionPoint x={100} y={5} value={`${stats.conversionRate}%`} label="NOW" color="#FF6B00" /></ZoomableSVG></div>
          </motion.div>

          <motion.div variants={tileVariants} whileHover="hover" className="group flex flex-col p-3 relative bg-card-blue border border-ice-blue/20 rounded-lg shadow-lg shadow-black/20 hover:border-ice-blue/60 hover:shadow-glow-ice transition-all">
            <Tooltip label="AI Projection" value={stats.forecast} trend={stats.forecastTrend} suffix="%" />
            <div className="flex justify-between items-start"><span className="text-[9px] font-black text-neon-orange uppercase tracking-widest">AI 7D FORECAST</span><Sparkles className="text-neon-orange/80 w-4 h-4" /></div>
            <div className="flex-1 flex flex-col justify-end">
                <motion.div key={stats.forecast} variants={numberVariants} initial="initial" animate="animate" className="font-impact text-5xl text-neutral-100 leading-none">{stats.forecast}<span className="text-2xl text-neon-orange/80">%</span></motion.div>
                <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Confidence: 98.2%</span>
                <div className="w-full h-12"><ZoomableSVG initialViewBox="0 0 100 40" preserveAspectRatio="none">
                    <defs><linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF6B00" stopOpacity="0.4" /><stop offset="100%" stopColor="#FF6B00" stopOpacity="0" /></linearGradient></defs>
                    <motion.path d={`M0,40 L0,25 Q25,20 50,25 T100,${Math.max(5, 40 - (stats.forecast * 6))} L100,40 Z`} fill="url(#orangeGradient)" animate={{ d: `M0,40 L0,25 Q25,20 50,25 T100,${Math.max(5, 40 - (stats.forecast * 6))} L100,40 Z` }} transition={{ duration: 0.8, ease: "easeOut" }} />
                    <motion.path d={`M0,25 Q25,20 50,25 T100,${Math.max(5, 40 - (stats.forecast * 6))}`} fill="none" stroke="#FF6B00" strokeWidth="1.5" animate={{ d: `M0,25 Q25,20 50,25 T100,${Math.max(5, 40 - (stats.forecast * 6))}` }} transition={{ duration: 0.8, ease: "easeOut" }} />
                    <motion.g animate={{ y: Math.max(5, 40 - (stats.forecast * 6)) }} transition={{ duration: 0.8, ease: "easeOut" }}><ChartInteractionPoint x={100} y={0} value={`${stats.forecast}%`} label="+7D" color="#FF6B00" /></motion.g>
                </ZoomableSVG></div>
            </div>
          </motion.div>

          <motion.div variants={tileVariants} whileHover="hover" className="group flex flex-col p-3 relative bg-card-blue border border-ice-blue/20 rounded-lg shadow-lg shadow-black/20 hover:border-ice-blue/60 hover:shadow-glow-ice transition-all">
            <Tooltip label="Traffic Delta" value={stats.trafficBoost} trend={stats.trafficTrend} suffix=" pts" />
            <div className="flex items-center gap-2 mb-2"><Brain className="text-fuchsia-400 w-4 h-4" /><span className="text-[9px] font-black text-fuchsia-400 uppercase tracking-widest">NEURAL ALERT</span></div>
            <div className="flex-1 flex flex-col justify-center"><span className="font-impact text-2xl text-neutral-100 leading-[1.1] tracking-tight">TRAFFIC SURGE: +{stats.trafficBoost}%</span></div>
            <button onClick={() => setIsModalOpen(true)} className="self-start text-[10px] font-bold text-fuchsia-400/80 hover:text-fuchsia-400 transition-colors uppercase tracking-wider">Details &gt;</button>
          </motion.div>

          <motion.div variants={tileVariants} whileHover="hover" className="group flex flex-col p-3 relative bg-card-blue border border-ice-blue/20 rounded-lg shadow-lg shadow-black/20 hover:border-ice-blue/60 hover:shadow-glow-ice transition-all">
            <Tooltip label="Ref. Efficacy" value={stats.referralRate} trend={stats.referralTrend} suffix="%" />
            <div className="flex items-center gap-2 mb-2"><Link className="text-emerald-400 w-4 h-4" /><span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">TOP CHANNEL</span></div>
            <div className="flex-1 flex items-center justify-between gap-2.5">
               <div>
                  <div className="font-impact text-2xl text-neutral-100 leading-tight">REFERRAL<br/>NETWORK</div>
                  <div className="text-[9px] font-bold text-emerald-400/70 uppercase tracking-wider mt-1">Target: {TARGET_REFERRAL_RATE}%</div>
               </div>
               <div className="relative w-20 h-20 flex items-center justify-center">
                   <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r={radialRadius} strokeWidth="6" className="stroke-ink-blue" fill="none" />
                      <motion.circle cx="40" cy="40" r={radialRadius} strokeWidth="6" className="stroke-emerald-400" fill="none" strokeLinecap="round" initial={{ strokeDasharray: `0 ${radialCircumference}` }} animate={{ strokeDasharray: `${(stats.referralRate / TARGET_REFERRAL_RATE) * radialCircumference} ${radialCircumference}` }} transition={{ duration: 1, ease: "easeOut" }} />
                   </svg>
                   <motion.span key={stats.referralRate} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-lg font-impact text-emerald-300">{stats.referralRate}%</motion.span>
               </div>
            </div>
          </motion.div>
        </div>

        {/* --- Footer --- */}
        <footer className="h-[35px] flex justify-between items-center px-4 bg-card-blue/50 border border-ice-blue/20 rounded-lg backdrop-blur-sm shrink-0">
          <div className="text-[8px] font-bold text-neutral-400 tracking-widest">STATUS: <motion.span className="font-black" variants={footerStatusVariants} animate={stats.status}>{stats.status}</motion.span></div>
          <div className="text-[8px] font-bold text-neutral-400 tracking-widest">PING: <span className="text-neutral-200 font-black">{stats.refreshMs}MS</span></div>
        </footer>

        <InsightModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} stats={stats} />
      </motion.div>
    </div>
  );
}