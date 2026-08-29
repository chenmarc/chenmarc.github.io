import { motion, useScroll } from 'motion/react'
import { useReducedMotion } from '../../lib/useReducedMotion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
