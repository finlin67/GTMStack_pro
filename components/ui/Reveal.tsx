'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  /** DIAGNOSTIC: when true, renders a plain div (no motion) to confirm Reveal is causing content to disappear */
  noMotion?: boolean
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  noMotion = false,
}: RevealProps) {
  const [hydrated, setHydrated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (noMotion || !hydrated || shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

