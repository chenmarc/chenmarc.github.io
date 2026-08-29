import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useReducedMotion } from '../../lib/useReducedMotion'

export default function CursorGlow() {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  )

  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const springX = useSpring(x, { stiffness: 120, damping: 26, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 120, damping: 26, mass: 0.5 })

  useEffect(() => {
    // Only on devices with an actual pointer — skip touch, where a cursor
    // glow has no meaning and would just be dead weight.
    const mq = window.matchMedia('(pointer: fine)')
    const onChange = (e) => setEnabled(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled || reducedMotion) return
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled, reducedMotion, x, y])

  if (!enabled || reducedMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply"
      style={{
        x: springX,
        y: springY,
        background:
          'radial-gradient(circle, rgba(44,84,144,0.07) 0%, rgba(163,92,48,0.045) 45%, transparent 72%)',
      }}
    />
  )
}
