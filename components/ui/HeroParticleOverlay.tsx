'use client'

import { motion, useReducedMotion } from 'framer-motion'

const baseTransition = {
  duration: 4,
  repeat: Infinity,
  ease: 'easeInOut' as const,
  times: [0, 0.5, 1] as [number, number, number],
}

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: [0, 1, 1],
    opacity: [0, 0.15, 0.06],
    transition: baseTransition,
  },
}

/**
 * Subtle teal/cyan animated connecting lines for hero — adapted from
 * EnterpriseSalesMotionDashboard path animations.
 */
export function HeroParticleOverlay() {
  const reduced = useReducedMotion() ?? false

  if (reduced) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 opacity-60"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 800"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#5a6cf2" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g stroke="url(#heroLineGrad)" strokeWidth="0.8" fill="none" strokeLinecap="round">
          <motion.path
            d="M 0 200 C 200 180, 400 220, 600 200 C 800 180, 1000 220, 1200 200"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{ ...baseTransition, delay: 0 }}
          />
          <motion.path
            d="M 0 400 C 250 380, 500 420, 750 400 C 950 380, 1100 420, 1200 400"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{ ...baseTransition, delay: 0.8 }}
          />
          <motion.path
            d="M 0 600 C 300 580, 600 620, 900 600 C 1050 580, 1150 620, 1200 600"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{ ...baseTransition, delay: 1.6 }}
          />
          <motion.path
            d="M 100 0 L 100 200 M 500 0 L 500 400 M 900 0 L 900 250"
            strokeOpacity="0.12"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{ ...baseTransition, delay: 0.4 }}
          />
          <motion.path
            d="M 300 400 L 300 800 M 700 300 L 700 800"
            strokeOpacity="0.1"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{ ...baseTransition, delay: 1.2 }}
          />
        </g>
      </svg>
    </div>
  )
}
