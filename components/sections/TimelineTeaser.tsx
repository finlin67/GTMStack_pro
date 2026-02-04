'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const TEASER_ITEMS = ['Discovery', 'Strategy', 'Execution', 'Scale']

/**
 * Horizontal auto-scrolling timeline teaser with pause on hover.
 * Uses Framer Motion for reveal; CSS for seamless scroll (dashboard has no marquee pattern).
 */
export function TimelineTeaser({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [isPaused, setIsPaused] = useState(false)
  const shouldReduceMotion = useReducedMotion() ?? false

  const renderSegment = (keyPrefix: string) =>
    TEASER_ITEMS.map((item, i) => (
      <span
        key={`${keyPrefix}-${item}-${i}`}
        className="inline-flex items-center gap-4 text-sm font-medium text-slate-400"
      >
        <span className="text-brand-400/80">{item}</span>
        {i < TEASER_ITEMS.length - 1 && (
          <span className="text-slate-600">→</span>
        )}
      </span>
    ))

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.3, 1] }}
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex w-max gap-8 whitespace-nowrap py-3"
        style={{
          animation: isPaused || shouldReduceMotion ? 'none' : 'marquee 28s linear infinite',
        }}
      >
        {renderSegment('a')}
        {renderSegment('b')}
      </div>
    </motion.div>
  )
}
