import { motion } from 'motion/react'
import type { Score } from '../../content/capabilities'

interface Props {
  score: Score
  size?: number
  delay?: number
  /** Animate the fill when scrolled into view. */
  animate?: boolean
  className?: string
}

const R = 10
const INNER = R / 2
const C = 2 * Math.PI * INNER

/** Quarter-step harvey ball. The fill is a thick stroke on a half-radius circle, so it can sweep in. */
export function HarveyBall({ score, size = 22, delay = 0, animate = true, className = '' }: Props) {
  const fill = (score / 4) * C
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} role="img" aria-label={`${score} of 4`}>
      <circle cx="12" cy="12" r={R} fill="white" stroke="currentColor" strokeWidth="1.6" />
      {score > 0 && (
        <motion.circle
          cx="12"
          cy="12"
          r={INNER}
          fill="none"
          stroke="currentColor"
          strokeWidth={R}
          transform="rotate(-90 12 12)"
          initial={animate ? { strokeDasharray: `0 ${C}` } : false}
          whileInView={{ strokeDasharray: `${fill} ${C}` }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
          style={animate ? undefined : { strokeDasharray: `${fill} ${C}` }}
        />
      )}
    </svg>
  )
}
