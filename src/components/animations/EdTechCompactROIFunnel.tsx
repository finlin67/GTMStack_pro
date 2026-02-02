'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from "framer-motion";
import { 
  BarChart3, 
  MousePointerClick, 
  ShieldCheck, 
  FileEdit, 
  Info, 
  PartyPopper, 
  TrendingUp, 
  GraduationCap, 
  DollarSign, 
  LineChart, 
  Calendar, 
  Download 
} from "lucide-react";

export default function EdTechCompactROIFunnel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const barVariants: Variants = {
    hidden: { height: "0%" },
    visible: (custom: number) => ({
      height: custom + "%",
      transition: { 
        duration: 0.8, 
        delay: 0.2 + (custom * 0.005),
        type: "spring",
        stiffness: 50
      }
    })
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-[#F1F5F9] font-display">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[600px] h-full max-h-[600px] bg-white rounded-3xl overflow-hidden relative flex flex-col p-4 shadow-lg border border-slate-200"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 shrink-0">
          <div>
            <h1 className="text-xl font-black text-slate-800">Compact ROI Funnel</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">EdTech Marketing Agency</p>
          </div>
          <div className="flex gap-2">
            <BarChart3 className="text-sky-500 w-6 h-6" />
          </div>
        </div>

        {/* Main Funnel Section */}
        <div className="flex-1 flex flex-col gap-2 mb-4 min-h-0 overflow-y-auto pr-2">
          {/* Step 1: Awareness */}
          <div className="relative group shrink-0">
            <div className="h-10 w-full relative rounded-lg flex items-center justify-between px-0 cursor-help overflow-hidden bg-slate-50 border border-slate-200">
                <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute inset-0 funnel-step-gradient"
                />
                <div className="relative z-10 flex items-center justify-between w-full px-4">
                    <div className="flex items-center gap-2">
                        <MousePointerClick className="text-slate-500 w-4 h-4" />
                        <span className="text-[11px] font-bold text-slate-700">Awareness Phase</span>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">12,400</span>
                </div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-3 top-0 w-48 p-3 rounded-lg bg-white border border-indigo-200 shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
              <p className="text-[10px] font-black text-indigo-500 mb-1 uppercase">Stage Insight</p>
              <p className="text-[11px] text-slate-600">Consideration: 1-2 Months</p>
              <p className="text-[11px] text-slate-600">Channels: Paid & Social</p>
            </div>
          </div>

          {/* Step 2: Interest */}
          <div className="relative group ml-4 shrink-0">
            <div className="h-10 w-[calc(100%-1rem)] relative rounded-lg flex items-center justify-between px-0 cursor-help overflow-hidden bg-slate-50 border border-slate-200">
                <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="absolute inset-0 funnel-step-gradient opacity-85"
                />
                <div className="relative z-10 flex items-center justify-between w-full px-4">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-slate-500 w-4 h-4" />
                        <span className="text-[11px] font-bold text-slate-700">Interest & Eval</span>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">4,820</span>
                </div>
            </div>
            <div className="absolute left-full ml-3 top-0 w-48 p-3 rounded-lg bg-white border border-indigo-200 shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
              <p className="text-[10px] font-black text-indigo-500 mb-1 uppercase">Evaluation</p>
              <p className="text-[11px] text-slate-600">Conv. Rate: 38.8%</p>
              <p className="text-[11px] text-slate-600">Content: Program Guides</p>
            </div>
          </div>

          {/* Step 3: Application */}
          <div className="relative group ml-8 shrink-0">
            <div className="h-10 w-[calc(100%-2rem)] relative rounded-lg flex items-center justify-between px-0 cursor-help overflow-hidden bg-slate-50 border border-slate-200">
                <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="absolute inset-0 funnel-step-gradient opacity-70"
                />
                <div className="relative z-10 flex items-center justify-between w-full px-4">
                    <div className="flex items-center gap-2">
                        <FileEdit className="text-slate-500 w-4 h-4" />
                        <span className="text-[11px] font-bold text-slate-700">Application Stage</span>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">1,150</span>
                </div>
            </div>
            <div className="absolute left-full ml-3 top-0 w-56 p-3 rounded-lg bg-white border border-indigo-200 shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
              <div className="flex items-center gap-1.5 text-indigo-500 mb-1.5">
                <Info className="w-3 h-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">Enrollment Context</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-medium"><span className="text-slate-500">Conversion Rate:</span><span className="font-bold text-emerald-500">12.5%</span></div>
                <div className="flex flex-col text-[11px]"><span className="text-slate-500">Key Decision Makers:</span><span className="font-medium text-slate-700">Parents & Admins</span></div>
                <div className="pt-1.5 border-t border-slate-200 text-[10px] text-indigo-400">3-6 month window</div>
              </div>
            </div>
          </div>

          {/* Step 4: Enrolled */}
          <div className="relative group ml-12 shrink-0">
            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="h-10 w-[calc(100%-3rem)] border-2 border-sky-500 bg-sky-50 rounded-lg flex items-center justify-between px-4 cursor-help overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <PartyPopper className="text-sky-500 w-4 h-4" />
                <span className="text-[11px] font-black text-sky-600">ENROLLED</span>
              </div>
              <span className="text-[10px] font-bold bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">640</span>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 shrink-0">
          {[
            { icon: TrendingUp, label: 'Marketing ROI', value: '4.8x', trend: '+12%', trendColor: 'text-emerald-500', delay: 1.0 },
            { icon: GraduationCap, label: 'Growth', value: '24.5%', trend: 'New Peak', trendColor: 'text-emerald-500', delay: 1.1 },
            { icon: DollarSign, label: 'CPE', value: '$1,420', trend: '-8%', trendColor: 'text-rose-500', delay: 1.2 },
            { icon: LineChart, label: 'Proj. LTV', value: '$32.4k', trend: '+5.4%', trendColor: 'text-emerald-500', delay: 1.3 }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: stat.delay }}
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className="text-sky-500 w-4 h-4" />
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-slate-800">{stat.value}</span>
                <span className={`text-[10px] font-bold ${stat.trendColor}`}>{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="mb-4 shrink-0">
          <div className="flex justify-between items-center mb-1.5 px-1">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Academic Alignment</span>
            <span className="text-[9px] text-sky-600 font-bold">Peak Intake: March & Sept</span>
          </div>
          <div className="h-6 flex items-end gap-1 px-1">
            {[40, 50, 95, 60, 45, 35, 30, 55, 100, 80, 50, 40].map((height, index) => {
              const isPeak = index === 2 || index === 8;
              return (
                <motion.div
                  key={index}
                  custom={height}
                  variants={barVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex-1 rounded-t-sm ${
                    isPeak ? "funnel-step-gradient" : "bg-sky-100"
                  }`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-[7px] font-black text-slate-400 uppercase mt-1 px-1">
            <span>Jan</span><span>Feb</span><span className="text-sky-500">Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span className="text-sky-500">Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto shrink-0">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors py-2.5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-slate-500" />
            Book Session
          </button>
          <button className="bg-sky-500 text-white hover:bg-sky-600 transition-colors shadow-sm py-2.5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider">
            <Download className="w-4 h-4" />
            ROI Report
          </button>
        </div>
      </motion.div>
    </div>
  );
}
