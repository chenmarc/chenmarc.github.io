/**
 * Button whose surrounding micro-particles get "attracted" inward on
 * hover/touch.
 *
 * Adapted from Kokonut UI's `AttractButton` component
 * (https://github.com/kokonut-labs/kokonutui, MIT licensed, © kokonutUI).
 * The original wraps shadcn/ui's <Button>; this version is a standalone
 * element restyled to the site's accent palette, so it doesn't drag in
 * Radix/shadcn as a dependency for one button.
 */
import { useCallback, useState } from 'react'
import { motion, useAnimation } from 'motion/react'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../lib/useReducedMotion'

const VARIANTS = {
  primary:
    'bg-[var(--color-accent)] text-[var(--color-on-accent)] border border-transparent shadow-[0_16px_32px_-12px_rgba(44,84,144,0.45)] hover:shadow-[0_20px_40px_-10px_rgba(44,84,144,0.55)] hover:brightness-110',
  outline:
    'shadow-elevate bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border-strong)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
}

export default function MagneticButton({
  children,
  className,
  variant = 'primary',
  particleCount = 10,
  as: Tag = 'button',
  ...props
}) {
  const reducedMotion = useReducedMotion()
  const [isAttracting, setIsAttracting] = useState(false)
  const [particles] = useState(() =>
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 30 - 15,
      y: Math.random() * 30 - 15,
    })),
  )
  const controls = useAnimation()

  const start = useCallback(async () => {
    if (reducedMotion) return
    setIsAttracting(true)
    await controls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 60, damping: 12 } })
  }, [controls, reducedMotion])

  const end = useCallback(async () => {
    if (reducedMotion) return
    setIsAttracting(false)
    await controls.start((i) => ({
      x: particles[i]?.x ?? 0,
      y: particles[i]?.y ?? 0,
      transition: { type: 'spring', stiffness: 110, damping: 16 },
    }))
  }, [controls, particles, reducedMotion])

  return (
    <Tag
      className={cn(
        'relative inline-flex min-w-[9.5rem] touch-none items-center justify-center gap-2',
        'overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide',
        'transition-[color,border-color,box-shadow,background-color,filter] duration-300',
        VARIANTS[variant],
        className,
      )}
      onMouseEnter={start}
      onMouseLeave={end}
      onTouchStart={start}
      onTouchEnd={end}
      {...props}
    >
      {!reducedMotion &&
        particles.map((_, index) => (
          <motion.span
            key={index}
            animate={controls}
            custom={index}
            initial={{ x: particles[index]?.x, y: particles[index]?.y }}
            className={cn(
              'pointer-events-none absolute h-1 w-1 rounded-full bg-current transition-opacity duration-300',
              isAttracting ? 'opacity-60' : 'opacity-0',
            )}
          />
        ))}
      <span className="relative">{children}</span>
    </Tag>
  )
}
