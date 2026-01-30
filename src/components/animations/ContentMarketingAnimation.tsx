'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Edit3, 
  Share2, 
  TrendingUp,
  Lightbulb,
  Palette,
  Send,
  BookOpen,
  MessageCircle,
  Mail,
  Video,
  Eye,
  Heart,
  Users
} from 'lucide-react'

// --- Types ---
interface ContentParticle {
  id: number
  type: 'blog' | 'social' | 'email' | 'video'
  startNode: number
  isActive: boolean
}

interface EngagementMetric {
  id: number
  type: 'view' | 'share' | 'convert'
  x: number
  y: number
}

interface WorkflowNode {
  id: string
  label: string
  icon: React.ElementType
  color: string
  glowColor: string
  x: number
  y: number
}

interface ChannelNode {
  id: string
  label: string
  icon: React.ElementType
  color: string
  x: number
  y: number
}

// --- Constants ---
const WORKFLOW_NODES: WorkflowNode[] = [
  { id: 'ideate', label: 'Ideate', icon: Lightbulb, color: 'from-cyan-400 to-cyan-500', glowColor: 'rgba(34, 211, 238, 0.4)', x: 60, y: 80 },
  { id: 'write', label: 'Write', icon: Edit3, color: 'from-cyan-500 to-teal-400', glowColor: 'rgba(20, 184, 166, 0.4)', x: 180, y: 80 },
  { id: 'design', label: 'Design', icon: Palette, color: 'from-teal-400 to-violet-400', glowColor: 'rgba(167, 139, 250, 0.4)', x: 300, y: 80 },
  { id: 'publish', label: 'Publish', icon: Send, color: 'from-violet-400 to-pink-400', glowColor: 'rgba(244, 114, 182, 0.4)', x: 420, y: 80 },
]

const CHANNEL_NODES: ChannelNode[] = [
  { id: 'blog', label: 'Blog', icon: BookOpen, color: 'text-cyan-400', x: 100, y: 220 },
  { id: 'social', label: 'Social', icon: MessageCircle, color: 'text-violet-400', x: 220, y: 220 },
  { id: 'email', label: 'Email', icon: Mail, color: 'text-pink-400', x: 340, y: 220 },
  { id: 'video', label: 'Video', icon: Video, color: 'text-teal-400', x: 460, y: 220 },
]

const METRIC_ICONS = {
  view: Eye,
  share: Share2,
  convert: TrendingUp,
}

const METRIC_COLORS = {
  view: 'text-cyan-400',
  share: 'text-violet-400',
  convert: 'text-pink-400',
}

// --- Main Component ---
export default function ContentMarketingAnimation() {
  const [activeWorkflowNode, setActiveWorkflowNode] = useState<number>(0)
  const [particles, setParticles] = useState<ContentParticle[]>([])
  const [engagementMetrics, setEngagementMetrics] = useState<EngagementMetric[]>([])
  const [stats, setStats] = useState({ views: 0, shares: 0, conversions: 0 })
  const particleIdRef = useRef(0)
  const metricIdRef = useRef(0)

  // Workflow node cycling animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWorkflowNode((prev) => (prev + 1) % WORKFLOW_NODES.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  // Spawn content particles flowing to channels
  useEffect(() => {
    const spawnParticle = () => {
      const id = ++particleIdRef.current
      const types: ContentParticle['type'][] = ['blog', 'social', 'email', 'video']
      const type = types[Math.floor(Math.random() * types.length)]
      
      setParticles((prev) => [...prev, { id, type, startNode: 3, isActive: true }])
      
      // Remove particle after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id))
      }, 2000)
    }

    const interval = setInterval(spawnParticle, 800)
    return () => clearInterval(interval)
  }, [])

  // Spawn engagement metrics
  useEffect(() => {
    const spawnMetric = () => {
      const id = ++metricIdRef.current
      const types: EngagementMetric['type'][] = ['view', 'share', 'convert']
      const type = types[Math.floor(Math.random() * types.length)]
      const channel = CHANNEL_NODES[Math.floor(Math.random() * CHANNEL_NODES.length)]
      
      setEngagementMetrics((prev) => [...prev, { 
        id, 
        type, 
        x: channel.x + Math.random() * 40 - 20,
        y: 280 + Math.random() * 60
      }])

      // Update stats
      setStats((prev) => ({
        views: prev.views + (type === 'view' ? 1 : 0),
        shares: prev.shares + (type === 'share' ? 1 : 0),
        conversions: prev.conversions + (type === 'convert' ? 1 : 0),
      }))
      
      // Remove metric after animation
      setTimeout(() => {
        setEngagementMetrics((prev) => prev.filter((m) => m.id !== id))
      }, 1500)
    }

    const interval = setInterval(spawnMetric, 400)
    return () => clearInterval(interval)
  }, [])

  const getChannelPosition = (type: ContentParticle['type']) => {
    const channel = CHANNEL_NODES.find((c) => c.id === type)
    return channel ? { x: channel.x, y: channel.y } : { x: 250, y: 220 }
  }

  return (
    <div 
      className="relative overflow-hidden rounded-2xl shadow-2xl font-sans text-white select-none border border-white/10"
      style={{
        width: '500px',
        height: '500px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)', top: '-10%', left: '-10%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)', bottom: '-10%', right: '-10%' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-pink-400 flex items-center justify-center shadow-lg">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-bold tracking-tight">Content Engine</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Publishing</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 p-5 h-[calc(100%-60px)] flex flex-col">
        
        {/* Section: Content Workflow */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Content Workflow</span>
          </div>

          {/* Workflow Nodes */}
          <div className="relative h-20">
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f472b6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {WORKFLOW_NODES.slice(0, -1).map((node, i) => (
                <motion.line
                  key={node.id}
                  x1={node.x + 20}
                  y1={35}
                  x2={WORKFLOW_NODES[i + 1].x - 20}
                  y2={35}
                  stroke="url(#flowGradient)"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: 1,
                    opacity: activeWorkflowNode > i ? 1 : 0.3 
                  }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </svg>

            {/* Workflow node cards */}
            <div className="flex justify-between px-2">
              {WORKFLOW_NODES.map((node, index) => {
                const Icon = node.icon
                const isActive = index === activeWorkflowNode
                const isPast = index < activeWorkflowNode

                return (
                  <motion.div
                    key={node.id}
                    className="relative flex flex-col items-center"
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      y: isActive ? -4 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center shadow-lg border border-white/20`}
                      animate={{
                        boxShadow: isActive 
                          ? `0 0 30px ${node.glowColor}, 0 8px 20px rgba(0,0,0,0.4)`
                          : isPast 
                            ? `0 0 15px ${node.glowColor}`
                            : '0 4px 12px rgba(0,0,0,0.3)'
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <span className={`mt-2 text-[10px] font-semibold transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {node.label}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Section: Distribution Channels */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Distribution Channels</span>
          </div>

          <div className="relative h-16">
            {/* Content particles flowing to channels */}
            <AnimatePresence>
              {particles.map((particle) => {
                const targetPos = getChannelPosition(particle.type)
                const colors = {
                  blog: '#22d3ee',
                  social: '#a78bfa',
                  email: '#f472b6',
                  video: '#14b8a6',
                }

                return (
                  <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 rounded-full"
                    style={{ 
                      background: colors[particle.type],
                      boxShadow: `0 0 10px ${colors[particle.type]}`,
                      left: 250,
                      top: -20
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1.5, 1, 0.5],
                      x: targetPos.x - 250,
                      y: 40
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                )
              })}
            </AnimatePresence>

            {/* Channel cards */}
            <div className="flex justify-between px-6">
              {CHANNEL_NODES.map((channel) => {
                const Icon = channel.icon
                return (
                  <motion.div
                    key={channel.id}
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <Icon className={`w-5 h-5 ${channel.color}`} />
                    </div>
                    <span className="mt-1.5 text-[9px] font-semibold text-slate-400">{channel.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Section: Engagement Metrics */}
        <div className="flex-1 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Engagement</span>
            </div>
            <span className="text-[9px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5">REAL-TIME</span>
          </div>

          {/* Floating engagement metrics */}
          <div className="relative h-20 rounded-xl bg-white/5 backdrop-blur border border-white/10 overflow-hidden">
            <AnimatePresence>
              {engagementMetrics.map((metric) => {
                const Icon = METRIC_ICONS[metric.type]
                const colorClass = METRIC_COLORS[metric.type]

                return (
                  <motion.div
                    key={metric.id}
                    className={`absolute flex items-center gap-1 ${colorClass}`}
                    style={{ left: metric.x - 200, top: 10 }}
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 1, 0], y: [-10, -30, -50, -60], scale: [0.5, 1, 1, 0.8] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="text-[9px] font-bold">+1</span>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Background pulse circles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-16 rounded-full border border-white/5"
                style={{ left: `${25 + i * 25}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 mt-4">
          <StatCard 
            icon={Eye} 
            label="Views" 
            value={stats.views} 
            color="text-cyan-400" 
            bgColor="from-cyan-500/10 to-cyan-500/5"
          />
          <StatCard 
            icon={Share2} 
            label="Shares" 
            value={stats.shares} 
            color="text-violet-400" 
            bgColor="from-violet-500/10 to-violet-500/5"
          />
          <StatCard 
            icon={TrendingUp} 
            label="Converts" 
            value={stats.conversions} 
            color="text-pink-400" 
            bgColor="from-pink-500/10 to-pink-500/5"
          />
        </div>
      </div>
    </div>
  )
}

// --- Sub-components ---
interface StatCardProps {
  icon: React.ElementType
  label: string
  value: number
  color: string
  bgColor: string
}

function StatCard({ icon: Icon, label, value, color, bgColor }: StatCardProps) {
  return (
    <div className={`rounded-xl bg-gradient-to-br ${bgColor} border border-white/5 p-3 text-center`}>
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <Icon className={`w-3 h-3 ${color}`} />
        <span className={`text-lg font-bold ${color}`}>{value.toLocaleString()}</span>
      </div>
      <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  )
}
