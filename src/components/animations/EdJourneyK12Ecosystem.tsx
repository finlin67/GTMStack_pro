'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Vote, X, ClipboardList, CheckCircle2, Users, User, Calendar, 
  Search, Building, Heart, TrendingUp, Briefcase, 
  ShieldCheck, Menu, ArrowRight, Sparkles, Zap, Award
} from 'lucide-react';

// --- Types ---
interface Stats {
  adoption: number;
  satisfaction: number;
  outcomes: number;
}

// --- Animation Variants ---
const overlayVariants: Variants = {
  hidden: { opacity: 0, y: '110%' },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 120 }
  },
  exit: { 
    opacity: 0, 
    y: '110%',
    transition: { ease: "anticipate", duration: 0.5 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: { opacity: 1, scale: 1, y: 0 }
};

const listVariants: Variants = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

// --- Helper Components ---

const StatCard = ({ 
  label, 
  value, 
  sub, 
  icon: Icon,
  delay,
  isDark
}: { 
  label: string; 
  value: React.ReactNode; 
  sub: string; 
  icon: any;
  delay: number;
  isDark: boolean;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: "spring", stiffness: 150 }}
    className={`
      flex-1 p-4 rounded-3xl min-w-[30%] flex flex-col justify-between relative overflow-hidden group
      ${isDark 
        ? 'bg-slate-800/40 border border-white/10 backdrop-blur-xl shadow-2xl hover:bg-slate-800/60' 
        : 'bg-white border border-slate-100 shadow-[0_12px_40px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]'
      }
      transition-all duration-500
    `}
  >
    <div className={`absolute -top-2 -right-2 p-4 opacity-[0.05] transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 ${isDark ? 'text-white' : 'text-slate-900'}`}>
      <Icon className="size-16" />
    </div>
    
    <div className="relative z-10">
      <div className={`text-xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</div>
      <div className={`text-[9px] font-extrabold uppercase tracking-widest mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
    </div>
    
    <div className={`text-[9px] mt-3 font-bold flex items-center gap-1.5 ${isDark ? 'text-amber-400' : 'text-orange-600'}`}>
      <TrendingUp className="size-3" /> 
      <span className="opacity-90">{sub}</span>
    </div>
  </motion.div>
);

const TrackNode = ({ Icon, pulse, onClick, color, isDark }: { Icon: any, pulse?: boolean, onClick?: () => void, color: 'blue' | 'orange' | 'gold', isDark: boolean }) => {
  const colorStyles = {
    blue: isDark ? 'text-blue-400 border-blue-500/40 bg-blue-500/10' : 'text-blue-700 border-blue-200 bg-blue-50',
    orange: isDark ? 'text-orange-400 border-orange-500/40 bg-orange-500/10' : 'text-orange-600 border-orange-100 bg-orange-50',
    gold: isDark ? 'text-amber-400 border-amber-500/40 bg-amber-500/10' : 'text-amber-600 border-amber-200 bg-amber-50',
  };

  return (
    <div className={`flex flex-col items-center relative group ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      <motion.div 
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className={`
          size-12 rounded-2xl border-2 flex items-center justify-center z-10 transition-all duration-300
          ${colorStyles[color]}
          ${pulse ? 'shadow-[0_0_20px_rgba(249,115,22,0.4)] animate-pulse' : 'shadow-md'}
        `}
      >
        <Icon className="size-5" />
      </motion.div>
      {pulse && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -bottom-9 bg-orange-600 text-white text-[8px] font-black px-2.5 py-1 rounded-xl whitespace-nowrap z-20 shadow-xl shadow-orange-500/20 uppercase tracking-tighter"
        >
          Gate Approval Required
        </motion.div>
      )}
    </div>
  );
};

// --- Overlay View ---

const BoardApprovalView: React.FC<{ onClose: () => void, isDark: boolean }> = ({ onClose, isDark }) => {
  const readinessItems = [
    { id: 'readiness-1', t: "Budget Impact Analysis", d: "Projected $2.4M Reallocation" },
    { id: 'readiness-2', t: "Data Privacy (COPPA) Audit", d: "100% Compliance Score" },
    { id: 'readiness-3', t: "Pilot Efficacy Report", d: "12% Improvement in Literacy" }
  ];

  const stakeholders = [
    { id: 'sh-1', role: 'Supt.' },
    { id: 'sh-2', role: 'Pres.' },
    { id: 'sh-3', role: 'Treas.' },
    { id: 'sh-4', role: 'Sec.' },
    { id: 'sh-5', role: 'Mem.' }
  ];

  return (
    <motion.div 
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`
        absolute inset-0 z-50 flex flex-col overflow-hidden backdrop-blur-3xl
        ${isDark ? 'bg-slate-950/90' : 'bg-white/95'}
      `}
    >
      {/* Header */}
      <div className={`px-8 py-6 shrink-0 flex justify-between items-center ${isDark ? 'bg-white/5 border-b border-white/10' : 'bg-white border-b border-slate-100'}`}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-700 to-indigo-900 rounded-2xl shadow-xl shadow-blue-900/30">
            <Vote className="size-6 text-white" />
          </div>
          <div>
            <h2 className={`text-xl font-black leading-none tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Board Approval</h2>
            <div className="flex items-center gap-2 mt-1.5">
               <span className="px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-600 text-[9px] font-black uppercase tracking-widest">Priority 1</span>
               <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Fiscal Gate 4 Clearance</p>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className={`size-10 flex items-center justify-center rounded-2xl transition-all hover:rotate-90 ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
        
        <section>
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className={`size-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
            <h3 className={`font-black text-[10px] uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Readiness Audit</h3>
          </div>
          <motion.div 
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-3"
          >
            {readinessItems.map((item) => (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                className={`
                  flex items-center gap-4 p-4 rounded-2xl border transition-all group
                  ${isDark 
                    ? 'bg-slate-900/50 border-white/5 hover:border-white/20' 
                    : 'bg-white border-slate-100 shadow-sm hover:shadow-lg'}
                `}
              >
                <div className={`p-2 rounded-xl ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                   <CheckCircle2 className="text-emerald-500 size-4" />
                </div>
                <div>
                   <div className={`text-xs font-black ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{item.t}</div>
                   <div className={`text-[10px] mt-0.5 font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{item.d}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Users className={`size-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
            <h3 className={`font-black text-[10px] uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Voting Projection</h3>
          </div>
          <div className={`p-6 rounded-[2rem] border ${isDark ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/40'}`}>
            <div className="flex justify-between items-center px-2">
              {stakeholders.map((person, i) => (
                <div key={person.id} className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <motion.div 
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1), type: "spring" }}
                      className={`size-11 rounded-xl flex items-center justify-center border-2 ${isDark ? 'bg-slate-800 border-slate-700 shadow-lg' : 'bg-slate-50 border-white shadow-xl'}`}
                    >
                      <User className={`size-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9 + (i * 0.1), type: "spring" }}
                      className="absolute -top-1.5 -right-1.5 size-5 bg-emerald-500 rounded-lg border-2 border-white flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle2 className="text-white size-3" />
                    </motion.div>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{person.role}</span>
                </div>
              ))}
            </div>
            <div className={`mt-8 pt-6 border-t flex justify-between items-center ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
              <div className="flex flex-col">
                <span className={`text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Risk Assessment</span>
                <span className="text-lg font-black text-emerald-500">98.5% Approval</span>
              </div>
              <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                 <Zap className="size-5 text-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className={`p-6 border-t ${isDark ? 'bg-slate-950 border-white/10' : 'bg-white border-slate-100'} flex gap-4`}>
        <button onClick={onClose} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl transition-all ${isDark ? 'text-slate-400 bg-white/5 hover:bg-white/10' : 'text-slate-600 bg-slate-50 hover:bg-slate-100'}`}>
          Cancel
        </button>
        <button className="flex-[2] py-4 text-[10px] font-black uppercase tracking-[0.15em] text-white bg-gradient-to-r from-blue-700 to-indigo-900 rounded-xl shadow-xl shadow-blue-900/40 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2">
          Deploy Packet <ArrowRight className="size-3.5" />
        </button>
      </div>
    </motion.div>
  );
};

// --- Main Application Component ---

export default function EdJourneyK12Ecosystem() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [stats, setStats] = useState<Stats>({ adoption: 65, satisfaction: 4.2, outcomes: 72 });
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const randomTheme = Math.random() > 0.5;
    setIsDark(randomTheme);
  }, []);

  const startCounters = useCallback(() => {
    const update = () => {
      setStats(prev => {
        const nextAdoption = Math.min(95, prev.adoption + (Math.random() > 0.7 ? 1 : 0));
        const nextSatisfaction = Number(Math.min(4.9, prev.satisfaction + (Math.random() * 0.04)).toFixed(1));
        const nextOutcomes = Math.min(88, prev.outcomes + (Math.random() > 0.7 ? 1 : 0));

        if (nextAdoption < 95) {
          timeoutRef.current = setTimeout(update, 200 + Math.random() * 200);
        }
        
        return {
          adoption: nextAdoption,
          satisfaction: nextSatisfaction,
          outcomes: nextOutcomes
        };
      });
    };
    update();
  }, []);

  useEffect(() => {
    const delay = setTimeout(startCounters, 800);
    return () => {
      clearTimeout(delay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startCounters]);

  const parentTrackIcons = [
    { id: 'pt-search', icon: Search },
    { id: 'pt-sparkles', icon: Sparkles },
    { id: 'pt-heart', icon: Heart }
  ];

  return (
    <div className={`w-full h-full flex items-center justify-center overflow-hidden transition-all duration-1000 ${isDark ? 'bg-[#0F172A]' : 'bg-[#FDFCF9]'}`}>
      
      {/* Subtle Radial Lighting Background */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${isDark ? 'from-indigo-900/30 via-transparent to-transparent' : 'from-orange-100/40 via-transparent to-transparent'} pointer-events-none z-0`} />

      {/* Main Container - Strictly Constrained to 600x600 */}
      <div className={`
        w-full h-full max-w-[600px] max-h-[600px] aspect-square overflow-hidden relative 
        flex flex-col font-display border transition-all duration-700 z-10
        ${isDark 
          ? 'bg-slate-900/60 border-white/10 shadow-[0_32px_120px_rgb(0,0,0,0.6)]' 
          : 'bg-[#FCFCFA]/80 border-white shadow-[0_32px_120px_rgba(30,58,138,0.12)]'}
        sm:rounded-[2.5rem]
      `}>
        
        {/* Navigation Bar */}
        <header className={`flex items-center justify-between px-8 py-6 shrink-0 relative z-20 ${isDark ? 'border-b border-white/5' : ''}`}>
          <div className="flex items-center gap-4">
             <div className="size-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center shadow-xl shadow-blue-700/40 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <ShieldCheck className="size-6" />
             </div>
             <div>
               <h1 className={`text-lg font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>EdJourney</h1>
               <div className="flex items-center gap-2 mt-0.5">
                 <motion.div 
                   animate={{ opacity: [0.4, 1, 0.4] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="size-1 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" 
                 />
                 <p className={`text-[9px] font-black uppercase tracking-[0.25em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>K-12 Network Live</p>
               </div>
             </div>
          </div>
          <button className={`size-10 flex items-center justify-center rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-500'}`}>
            <Menu className="size-5" />
          </button>
        </header>

        {/* Dashboard Main View */}
        <main className="flex-1 overflow-hidden p-8 flex flex-col gap-8 relative z-10">
          
          {/* Dynamic Hero Section */}
          <div className="space-y-3">
            <h2 className={`text-3xl font-black leading-none tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ecosystem <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">Sync</span>
            </h2>
            <p className={`text-xs font-medium leading-relaxed max-w-[90%] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Autonomous harmonization of regional parent demand signals with localized district procurement lifecycles.
            </p>
          </div>

          {/* Performance Widgets */}
          <div className="flex gap-4">
            <StatCard 
              label="Adoption" 
              value={<span className={`${isDark ? 'text-white' : 'text-blue-900'}`}>{stats.adoption}%</span>} 
              sub="Market Capacity" 
              icon={Building}
              delay={0.2}
              isDark={isDark}
            />
             <StatCard 
              label="Sentiment" 
              value={<span className="text-orange-500">{stats.satisfaction}</span>} 
              sub="Teacher NPS" 
              icon={Heart}
              delay={0.3}
              isDark={isDark}
            />
             <StatCard 
              label="Outcomes" 
              value={<span className="text-amber-500">+{stats.outcomes}%</span>} 
              sub="Proficiency Delta" 
              icon={Award}
              delay={0.4}
              isDark={isDark}
            />
          </div>

          {/* Bi-Directional Journey Visualization */}
          <div className={`
            flex-1 rounded-[2rem] p-6 relative overflow-hidden flex flex-col justify-center gap-10
            ${isDark 
              ? 'bg-gradient-to-br from-white/5 to-transparent border border-white/5 shadow-2xl' 
              : 'bg-white border border-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.06)]'}
          `}>
             <div className={`absolute top-0 right-0 size-48 bg-gradient-to-bl from-blue-700/10 to-transparent rounded-bl-full pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-40'}`} />

             <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2.5">
                      <div className="h-1 w-8 bg-blue-700 rounded-full" />
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-blue-400' : 'text-blue-900'}`}>Parent Demand Path</span>
                   </div>
                   <div className="flex gap-1">
                      <div className="size-1 rounded-full bg-blue-700" />
                      <div className="size-1 rounded-full bg-blue-700 opacity-30" />
                   </div>
                </div>
                <div className="flex justify-between items-center relative px-3">
                   <div className={`absolute top-1/2 left-0 right-0 h-0.5 -z-10 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`} />
                   {parentTrackIcons.map((item) => (
                      <TrackNode key={item.id} Icon={item.icon} color="blue" isDark={isDark} />
                   ))}
                </div>
             </div>

             <div className="flex justify-center -my-3 relative z-20">
                <div className={`
                  px-5 py-2 rounded-xl shadow-xl flex items-center gap-2 transform -rotate-1 border group hover:rotate-0 transition-all duration-500
                  ${isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-100'}
                `}>
                   <ShieldCheck className="size-4 text-amber-400" />
                   <span className={`text-[9px] font-black tracking-[0.15em] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>AI-DRIVEN COMPLIANCE SYNC</span>
                </div>
             </div>

             <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2.5">
                      <div className="h-1 w-8 bg-orange-600 rounded-full" />
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-orange-400' : 'text-orange-900'}`}>District Fiscal Cycle</span>
                   </div>
                </div>
                <div className="flex justify-between items-center relative px-3">
                   <div className={`absolute top-1/2 left-0 right-0 h-0.5 -z-10 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`} />
                   <TrackNode Icon={Briefcase} color="gold" isDark={isDark} />
                   <TrackNode Icon={Users} color="gold" isDark={isDark} />
                   <TrackNode 
                      Icon={Vote} 
                      color="orange" 
                      isDark={isDark}
                      pulse={!showOverlay} 
                      onClick={() => setShowOverlay(true)}
                   />
                </div>
             </div>
          </div>

        </main>

        <AnimatePresence>
          {showOverlay && (
            <BoardApprovalView 
              onClose={() => setShowOverlay(false)} 
              isDark={isDark} 
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
