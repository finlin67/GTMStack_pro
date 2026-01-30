// FILE: DemandGenFlow.tsx
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BarChart2, 
  X, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Trophy, 
  CheckCircle2, 
  ArrowRight,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DemandGenFlow() {
  // Enhanced hover configuration for metric cards
  const cardHoverConfig = {
    y: -4,
    scale: 1.02,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(32, 191, 223, 0.5)',
    boxShadow: '0 10px 30px -5px rgba(32, 191, 223, 0.2)'
  };

  // Real-time data simulation state
  const [metrics, setMetrics] = useState({
    growthROI: 300,
    totalLeads: 50.2,
    conversionLift: 24.8,
    cplReduction: 42.0,
    iterationVelocity: 4.2,
    chartData: [0.2, 0.35, 0.25, 0.5, 0.75, 1.0, 0.6, 0.8],
    successRateHistory: Array.from({ length: 20 }, () => Math.floor(Math.random() * 20) + 60)
  });

  const chartRef = useRef<ChartJS>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMetrics(prev => {
        // Helper to drift values subtly
        const drift = (val: number, range: number) => val + (Math.random() * range * 2 - range);
        
        // New success rate point
        const lastRate = prev.successRateHistory[prev.successRateHistory.length - 1];
        const newRate = Math.min(95, Math.max(45, drift(lastRate, 4)));

        return {
          growthROI: Math.floor(Math.max(250, Math.min(350, drift(prev.growthROI, 5)))),
          totalLeads: parseFloat(Math.max(45, Math.min(55, drift(prev.totalLeads, 0.1))).toFixed(1)),
          conversionLift: parseFloat(Math.max(20, Math.min(30, drift(prev.conversionLift, 0.3))).toFixed(1)),
          cplReduction: parseFloat(Math.max(35, Math.min(50, drift(prev.cplReduction, 0.4))).toFixed(1)),
          iterationVelocity: parseFloat(Math.max(3, Math.min(5.5, drift(prev.iterationVelocity, 0.1))).toFixed(1)),
          chartData: prev.chartData.map(h => Math.max(0.15, Math.min(1.0, drift(h, 0.1)))),
          successRateHistory: [...prev.successRateHistory.slice(1), newRate]
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Chart configuration
  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 9,
            family: "'Inter', sans-serif"
          },
          callback: (value: any) => value + '%'
        },
        min: 40,
        max: 100
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(17, 30, 33, 0.95)',
        titleColor: '#fff',
        bodyColor: '#20bfdf',
        borderColor: 'rgba(32, 191, 223, 0.3)',
        borderWidth: 1,
        padding: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => `Success: ${context.raw.toFixed(1)}%`
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 0,
        hoverRadius: 4,
        hoverBackgroundColor: '#fff',
        hoverBorderColor: '#20bfdf'
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart' as const
    }
  }), []);

  const chartDataConfig = useMemo(() => ({
    labels: metrics.successRateHistory.map((_, i) => i),
    datasets: [
      {
        label: 'Success Rate',
        data: metrics.successRateHistory,
        borderColor: '#20bfdf',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(32, 191, 223, 0.25)');
          gradient.addColorStop(1, 'rgba(32, 191, 223, 0)');
          return gradient;
        },
        fill: true,
        borderWidth: 2
      }
    ]
  }), [metrics.successRateHistory]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#111e21] p-2 sm:p-4">
      {/* Inner Container: Constrained to max 600x600 but fills available space up to that point */}
      <div className="w-full h-full max-w-[600px] max-h-[600px] bg-[#111e21] text-white overflow-hidden relative font-sans selection:bg-[#20bfdf] selection:text-black flex flex-col shadow-2xl rounded-xl border border-white/5">
        
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Background Glows */}
        <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] bg-[#20bfdf]/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[60px] pointer-events-none" />

        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#1a2629]/80 backdrop-blur-md z-30 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <BarChart2 className="text-[#20bfdf] w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#20bfdf]/80">Project Apex</span>
            </div>
            <h3 className="text-xl font-black tracking-tight text-white leading-none">
              Experiment Engine <span className="text-[#20bfdf]">v2.0</span>
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wider">Status</span>
              <span className="text-[10px] font-bold text-[#0bda54] flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0bda54] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0bda54]"></span>
                </span>
                Active
              </span>
            </div>
            <button className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="flex-1 p-5 grid grid-cols-2 gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent content-start z-10">
          
          {/* Metric Card: Growth ROI */}
          <motion.div 
            whileHover={cardHoverConfig}
            className="col-span-1 bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col justify-between group transition-all duration-300 min-h-[100px]"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Growth ROI</span>
                <span className="text-2xl font-black text-white group-hover:text-[#20bfdf] transition-colors">{metrics.growthROI}%</span>
              </div>
              <div className="p-1.5 rounded-md bg-[#20bfdf]/10 text-[#20bfdf]">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="h-8 w-full flex items-end gap-1 overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity">
              {metrics.chartData.map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex-1 rounded-t-[1px]"
                  style={{ backgroundColor: `rgba(32, 191, 223, ${0.3 + (i * 0.1)})` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Metric Card: Total Leads */}
          <motion.div 
            whileHover={cardHoverConfig}
            className="col-span-1 bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col justify-between group transition-all duration-300 min-h-[100px]"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Total Leads</span>
                <span className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors">{metrics.totalLeads}k</span>
              </div>
              <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-400">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="w-full">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-1.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(metrics.totalLeads / 60) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-purple-600 to-[#20bfdf] rounded-full"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-gray-500 font-medium">Target: 60k</span>
                <span className="text-[9px] text-purple-400 font-bold">+12% MoM</span>
              </div>
            </div>
          </motion.div>

          {/* Wide Card: Strategy */}
          <motion.div 
            whileHover={cardHoverConfig}
            className="col-span-2 bg-white/[0.03] border border-white/5 rounded-xl p-4 relative overflow-hidden group transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="w-20 h-20" />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-full bg-[#20bfdf] flex items-center justify-center text-[#111e21]">
                <Trophy className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-sm font-bold text-white">Strategy: <span className="text-[#20bfdf] italic">Variant B</span></h4>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 relative z-10">
              {[
                "Hyper-personalized headlines",
                "Zero-latency API middleware",
                "Predictive CTA triggers",
                "Segmented attribution"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="text-[#20bfdf] w-3 h-3 mt-[3px] shrink-0" />
                  <span className="text-[10px] font-medium text-gray-300 leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Metric Card: Conversion Lift */}
          <motion.div 
            whileHover={cardHoverConfig}
            className="col-span-1 bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col justify-between group transition-all duration-300 border-l-2 border-l-[#0bda54] min-h-[100px]"
          >
            <div>
              <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest block mb-1">Conversion Lift</span>
              <span className="text-2xl font-black text-white">+{metrics.conversionLift}%</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
              <div className="flex flex-col">
                <span className="text-[8px] text-gray-500 uppercase">Confidence</span>
                <span className="text-[10px] font-bold text-[#20bfdf]">99.2%</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] text-gray-500 uppercase">Dev.</span>
                <span className="text-[10px] font-bold text-gray-300">±0.4%</span>
              </div>
            </div>
          </motion.div>

          {/* Metric Card: CPL Reduction */}
          <motion.div 
            whileHover={cardHoverConfig}
            className="col-span-1 bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col justify-between group transition-all duration-300 border-l-2 border-l-purple-500 min-h-[100px]"
          >
            <div>
              <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest block mb-1">CPL Reduction</span>
              <span className="text-2xl font-black text-white">-{metrics.cplReduction}%</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-full bg-purple-500"
                />
              </div>
              <span className="text-[9px] font-bold text-gray-400">Optimized</span>
            </div>
          </motion.div>

          {/* Wide Card: Iteration Velocity */}
          <motion.div 
            whileHover={cardHoverConfig}
            className="col-span-2 bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col justify-between group transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Iteration Velocity</span>
              <div className="px-1.5 py-0.5 rounded bg-[#20bfdf]/10 border border-[#20bfdf]/20 text-[8px] font-bold text-[#20bfdf] uppercase">Active Cycle</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-[8px] mb-1.5 font-bold uppercase text-gray-500">
                  <span>Stage</span>
                  <span>Scale</span>
                </div>
                <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-[#20bfdf] rounded-full shadow-[0_0_10px_rgba(32,191,223,0.4)]"
                    animate={{ 
                      width: ["0%", "100%", "0%"],
                      x: ["-100%", "0%", "100%"]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="absolute inset-y-0 left-0 w-full bg-[#20bfdf] opacity-10 rounded-full"></div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-white">{metrics.iterationVelocity}</span>
                <span className="text-[9px] text-gray-500 font-bold block">Exp / Week</span>
              </div>
            </div>
          </motion.div>

          {/* New Card: Success Rate Trend (Line Chart) */}
          <motion.div 
            whileHover={cardHoverConfig}
            className="col-span-2 bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col group transition-all duration-300 min-h-[200px]"
          >
             <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Success Rate Trend (30d)</span>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-white group-hover:text-[#20bfdf] transition-colors">
                      {metrics.successRateHistory[metrics.successRateHistory.length - 1].toFixed(1)}%
                    </span>
                    <span className="text-[10px] font-bold text-[#0bda54] mb-1">
                      ▲ 4.2%
                    </span>
                  </div>
                </div>
                <div className="p-1.5 rounded-md bg-[#20bfdf]/10 text-[#20bfdf]">
                  <Activity className="w-3.5 h-3.5" />
                </div>
            </div>
            <div className="flex-1 w-full min-h-0 relative">
              <Line options={chartOptions} data={chartDataConfig} />
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <div className="px-5 py-4 bg-[#1a2629]/90 border-t border-white/10 flex items-center justify-between gap-3 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              <div className="w-6 h-6 rounded-full border border-[#1a2629] bg-gray-600"></div>
              <div className="w-6 h-6 rounded-full border border-[#1a2629] bg-[#20bfdf]/20 flex items-center justify-center text-white text-[7px] font-bold">JD</div>
              <div className="w-6 h-6 rounded-full border border-[#1a2629] bg-purple-600/20 flex items-center justify-center text-white text-[7px] font-bold">+4</div>
            </div>
            <span className="hidden sm:inline-block text-[10px] text-gray-400 font-medium">Reviewing data</span>
          </div>
          <div className="flex gap-2">
            <button className="px-4 h-9 rounded-md bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] transition-colors border border-white/10">
              Export
            </button>
            <button className="px-4 h-9 rounded-md relative overflow-hidden font-bold text-[10px] flex items-center justify-center gap-1.5 group transition-all text-white">
              <div className="absolute inset-0 bg-white/5 border border-transparent rounded-md z-0" />
              <div className="absolute inset-[-1px] rounded-md bg-gradient-to-r from-[#20bfdf] to-purple-600 -z-10" />
              <div className="absolute inset-[1px] rounded-md bg-[#1a2629] -z-10 group-hover:bg-[#1a2629]/80 transition-colors" />
              <span className="relative z-10 flex items-center gap-1">
                Full Report
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}