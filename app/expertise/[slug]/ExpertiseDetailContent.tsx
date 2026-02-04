'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ArrowRight, ArrowLeft, Compass, Sparkles, Layers, LineChart, ChevronRight } from 'lucide-react'
import { ExpertiseItem } from '@/lib/types'
import { CaseStudyItem } from '@/lib/types'
import { IndustryItem } from '@/lib/types'

/* Preserved: Animated dashboard element in hero upper right — do not delete or modify */
const ExpertiseHeroVisual = dynamic(
  () => import('@/components/expertise/ExpertiseHeroVisual.client').then((m) => m.ExpertiseHeroVisual),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 rounded-2xl bg-[#0A0F2D]/80 animate-pulse flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00A8A8]/40 border-t-[#00A8A8] rounded-full animate-spin" />
      </div>
    ),
  }
)

export type PillarId = 'content-engagement' | 'demand-growth' | 'strategy-insights' | 'systems-operations'

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: [0, 1, 1],
    opacity: [0, 0.2, 0.08],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      times: [0, 0.5, 1] as [number, number, number],
    },
  },
}

const ROUTE_STEPS = [
  { title: 'Map signals & ICP', detail: 'Clarify ICP tiers, buying triggers, and leading signals tied to this expertise.', icon: Compass },
  { title: 'Design the play', detail: 'Define the core motion, offer, and success criteria with measurable checkpoints.', icon: Sparkles },
  { title: 'Instrument & launch', detail: 'Wire data, routing, and orchestration; launch with gated stages and dashboards.', icon: Layers },
  { title: 'Optimize to proof', detail: 'Run sprints, tune levers, and lock proof points before scaling spend.', icon: LineChart },
]

interface ExpertiseDetailContentProps {
  item: ExpertiseItem
  pillarId: PillarId
  pillarTitle: string
  accent: string
  challenges: string[]
  executionStack: string[]
  results: { value: string; label: string }[]
  relatedExpertise: ExpertiseItem[]
  relatedCaseStudies: CaseStudyItem[]
  relatedIndustries: IndustryItem[]
  heroConfig?: { tagline?: string; metrics?: { label: string; value: string }[] }
}

export function ExpertiseDetailContent({
  item,
  pillarId,
  pillarTitle,
  accent,
  challenges,
  executionStack,
  results,
  relatedExpertise,
  relatedCaseStudies,
  relatedIndustries,
  heroConfig,
}: ExpertiseDetailContentProps) {
  const challengesRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const isChallengesInView = useInView(challengesRef, { once: true, margin: '-10% 0px' })
  const isResultsInView = useInView(resultsRef, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  const [resultValues, setResultValues] = useState(results.map((r) => r.value))

  const jitter = useCallback(() => {
    if (shouldReduceMotion) return
    setResultValues((prev) =>
      prev.map((v) => {
        const m = v.match(/^([^0-9.-]*)([0-9.,]+)(.*)$/)
        if (!m) return v
        const [, pre = '', num, suf = ''] = m
        const n = parseFloat(num.replace(/,/g, ''))
        const jittered = n + (Math.random() - 0.5) * 0.08 * Math.max(n, 1)
        return `${pre}${Math.round(Math.max(jittered, 0))}${suf}`
      })
    )
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!isResultsInView || shouldReduceMotion) return
    const t = setInterval(jitter, 2500 + Math.random() * 2000)
    return () => clearInterval(t)
  }, [isResultsInView, jitter, shouldReduceMotion])

  type IconName = keyof typeof Icons
  const IconComponent = Icons[(item.icon || 'Sparkles') as IconName] as React.ComponentType<{ className?: string }> | undefined
  const tagline = heroConfig?.tagline ?? item.description ?? item.positioning ?? ''

  return (
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      {/* ========== HERO ========== */}
      <section
        className="relative overflow-hidden pt-14 pb-10 md:pt-20 md:pb-12"
        style={{
          background: `linear-gradient(to bottom, #0A0F2D 0%, ${accent}15 40%, #1E2A5E 70%, #0A0F2D 100%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 opacity-50">
          <svg viewBox="0 0 1200 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`heroGrad-${pillarId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00A8A8" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <g stroke={`url(#heroGrad-${pillarId})`} strokeWidth="0.8" fill="none" strokeLinecap="round">
              <motion.path
                d="M 0 150 C 300 120, 600 180, 900 150 C 1100 130, 1200 160, 1200 150"
                variants={pathVariants}
                initial="initial"
                animate="animate"
              />
              <motion.path
                d="M 0 350 C 400 320, 800 380, 1200 350"
                variants={pathVariants}
                initial="initial"
                animate="animate"
                transition={{ ...pathVariants.animate.transition, delay: 0.8 }}
              />
            </g>
          </svg>
        </div>
        <div className="container-width relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6 text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#00A8A8] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/expertise" className="hover:text-[#00A8A8] transition-colors">Expertise</Link>
            <span>/</span>
            <Link href={`/expertise/${pillarId}`} className="hover:text-[#00A8A8] transition-colors">
              {pillarTitle}
            </Link>
            <span>/</span>
            <span className="text-white">{item.title}</span>
          </nav>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm mb-4"
                style={{ borderColor: `${accent}50`, backgroundColor: `${accent}15` }}
              >
                {IconComponent && (
                  <span style={{ color: accent }} className="inline-flex">
                    <IconComponent className="w-4 h-4" />
                  </span>
                )}
                <span style={{ color: accent }}>{pillarTitle}</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-white"
              >
                {item.title} Expertise
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-lg text-slate-200 max-w-2xl"
              >
                {tagline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 flex flex-wrap gap-3"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,168,168,0.4)]"
                  style={{ backgroundColor: '#00A8A8' }}
                >
                  Book a Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              {heroConfig?.metrics && heroConfig.metrics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 grid grid-cols-2 gap-3 max-w-md"
                >
                  {heroConfig.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border p-3 backdrop-blur-sm"
                      style={{ borderColor: `${accent}40`, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    >
                      <div className="text-xs text-slate-400">{m.label}</div>
                      <div className="text-lg font-bold text-[#FFD700]">{m.value}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
            {/* Preserved: Animated dashboard element in upper right */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="relative hidden lg:block"
            >
              <div
                className="relative mx-auto w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden border"
                style={{ borderColor: `${accent}40` }}
              >
                <ExpertiseHeroVisual
                  config={heroConfig ? { engine: 'scan', accent: 'cyan', metrics: heroConfig.metrics ?? [], tagline: heroConfig.tagline ?? '' } : undefined}
                  borderClassName="border-white/20"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CHALLENGES ========== */}
      <section ref={challengesRef} className="relative py-10 md:py-12 bg-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">Common Challenges</h2>
          <motion.ul
            initial="hidden"
            animate={isChallengesInView ? 'visible' : 'hidden'}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            className="grid sm:grid-cols-2 gap-3"
          >
            {challenges.map((c) => (
              <motion.li
                key={c}
                variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 rounded-xl border p-4 transition-colors bg-[#1E2A5E]/40"
                style={{ borderColor: `${accent}60` }}
              >
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                <span className="text-slate-200">{c}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ========== ROUTE MAP ========== */}
      <section className="relative py-10 md:py-12 bg-gradient-to-b from-[#0A0F2D] via-[#1E2A5E]/50 to-[#0A0F2D] overflow-hidden">
        <div className="container-width relative">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <svg viewBox="0 0 400 200" className="w-full h-48" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`routeGrad-${pillarId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={accent} stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 20 50 Q 100 50 180 70 T 360 90"
                fill="none"
                stroke={`url(#routeGrad-${pillarId})`}
                strokeWidth="2"
                strokeLinecap="round"
                variants={pathVariants}
                initial="initial"
                animate="animate"
              />
            </svg>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8 relative z-10">Route Map</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {ROUTE_STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.03, y: -4, boxShadow: `0 8px 32px ${accent}40` }}
                  className="rounded-xl border p-5 backdrop-blur-sm transition-all bg-[#1E2A5E]/50 border-white/10"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${accent}25`, color: accent }}
                  >
                    <motion.div
                      animate={shouldReduceMotion ? {} : { rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <span className="text-sm font-bold" style={{ color: accent }}>
                    Step {i + 1}
                  </span>
                  <h3 className="font-bold text-white mt-1 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.detail}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== EXECUTION STACK ========== */}
      <section className="relative py-10 md:py-12 bg-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">Execution Stack</h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {executionStack.map((tool, i) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, rotateY: -5 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl border p-4 text-center text-slate-200 text-sm font-medium transition-colors hover:text-white bg-[#1E2A5E]/40 border-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                {tool}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== RESULTS ========== */}
      <section ref={resultsRef} className="relative py-10 md:py-12 bg-gradient-to-b from-[#0A0F2D] via-[#1E2A5E]/40 to-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8">Results</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {results.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 24 }}
                animate={isResultsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 50px rgba(255,215,0,0.2)',
                  borderColor: 'rgba(255,215,0,0.4)',
                }}
                className="rounded-2xl border-2 p-8 text-center backdrop-blur-sm transition-all bg-[#1E2A5E]/60 border-[#FFD700]/30"
              >
                <motion.span
                  key={resultValues[i]}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  className="block text-4xl md:text-5xl font-bold text-[#FFD700] tabular-nums mb-2"
                >
                  {resultValues[i] ?? r.value}
                </motion.span>
                <p className="text-slate-300 font-medium">{r.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== RELATED ========== */}
      <section className="relative py-10 md:py-12 bg-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Related</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedExpertise.slice(0, 3).map((e, i) => (
              <motion.div
                key={e.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={`/expertise/${e.slug}`}
                  className="block rounded-xl border p-5 bg-[#1E2A5E]/40 border-[#6A4C93]/50 hover:bg-[#1E2A5E]/60 transition-all duration-300 group"
                >
                  <h4 className="font-semibold text-white group-hover:text-[#00A8A8] transition-colors mb-1">
                    {e.title}
                  </h4>
                  <p className="text-sm text-slate-400 line-clamp-2">{e.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#6A4C93]">
                    Explore <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
            {relatedCaseStudies.slice(0, 2).map((cs, i) => (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (3 + i) * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="block rounded-xl border p-5 bg-[#1E2A5E]/40 border-[#6A4C93]/50 hover:bg-[#1E2A5E]/60 transition-all duration-300 group"
                >
                  <h4 className="font-semibold text-white group-hover:text-[#00A8A8] transition-colors mb-1">
                    {cs.title}
                  </h4>
                  <p className="text-sm text-slate-400 line-clamp-2">{cs.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#6A4C93]">
                    View Case Study <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
            {relatedIndustries.slice(0, 2).map((ind, i) => (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (5 + i) * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={`/industries/${ind.slug}`}
                  className="block rounded-xl border p-5 bg-[#1E2A5E]/40 border-[#6A4C93]/50 hover:bg-[#1E2A5E]/60 transition-all duration-300 group"
                >
                  <h4 className="font-semibold text-white group-hover:text-[#00A8A8] transition-colors mb-1">
                    {ind.title}
                  </h4>
                  <p className="text-sm text-slate-400 line-clamp-2">{ind.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#6A4C93]">
                    Explore <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/expertise"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-[#00A8A8] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Expertise
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FOOTER CTA ========== */}
      <section
        className="relative py-14 md:py-16"
        style={{
          background: `linear-gradient(to bottom, #1E2A5E 0%, #0A0F2D 100%)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-width text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for {item.title} results?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,168,168,0.45)]"
            style={{ backgroundColor: '#00A8A8' }}
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
