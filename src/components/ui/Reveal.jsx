/**
 * Scroll-triggered entrance animation. Replaces the original site's
 * `.scroll-trigger` + manual rAF/getBoundingClientRect system with Motion's
 * `whileInView`, which is IntersectionObserver-backed under the hood.
 *
 * Two variants: 'rise' (fade + translate, for text/blocks) and 'scale'
 * (fade + scale, for imagery/cards) — the same two effects the original
 * site had (fade-in / scale-up), just smoother and reduced-motion-aware.
 */
import { motion } from 'motion/react'
import { useReducedMotion } from '../../lib/useReducedMotion'

const VARIANTS = {
  rise: {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
}

export default function Reveal({
  children,
  as: Tag = motion.div,
  variant = 'rise',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  className,
  ...props
}) {
  const reducedMotion = useReducedMotion()

  // `as` may be a plain tag name ('div', 'section') or an actual motion.*
  // component. Resolve strings through the `motion` proxy so Motion-only
  // props (whileInView, variants, viewport) never leak onto a raw DOM node.
  const MotionTag = typeof Tag === 'string' ? motion[Tag] : Tag

  if (reducedMotion) {
    const Static = typeof Tag === 'string' ? Tag : 'div'
    return (
      <Static className={className} {...props}>
        {children}
      </Static>
    )
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={VARIANTS[variant]}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
