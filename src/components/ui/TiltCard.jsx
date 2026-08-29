/**
 * Project card: a flat, upright card (no tilt or rotation of any kind)
 * that pops dramatically off the page on hover via scale, an assertive
 * lift, an escalating shadow, and a color-matched glow blooming behind it
 * — depth communicated entirely through elevation and light, not
 * perspective distortion.
 *
 * The glow/shimmer/dim-siblings layout pattern originated in Kokonut UI's
 * `SpotlightCards` Card component (https://github.com/kokonut-labs/kokonutui,
 * MIT licensed, © kokonutUI); the cursor-tilt mechanic has since been
 * removed entirely (no rotation of any kind, by design) — see
 * THIRD_PARTY_LICENSES.md.
 */
import { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../lib/useReducedMotion'

export default function TiltCard({
  icon: Icon,
  color = '#2c5490',
  title,
  children,
  dimmed = false,
  onHoverStart,
  onHoverEnd,
  className,
  style,
}) {
  const reducedMotion = useReducedMotion()
  const [isHovering, setIsHovering] = useState(false)

  const handleEnter = () => {
    setIsHovering(true)
    onHoverStart?.()
  }
  const handleLeave = () => {
    setIsHovering(false)
    onHoverEnd?.()
  }

  const popped = isHovering && !dimmed && !reducedMotion

  return (
    <motion.div
      className={cn('group relative h-full', className)}
      animate={{ scale: dimmed ? 0.96 : 1, opacity: dimmed ? 0.5 : 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* soft color bloom that grows behind the card on hover — the "pop"
          reads through light and shadow, not tilt */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-[1.75rem] blur-2xl"
        style={{ background: `radial-gradient(60% 60% at 50% 65%, ${color}30, transparent 75%)` }}
        animate={{ opacity: popped ? 1 : 0, scale: popped ? 1.08 : 0.9 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      <motion.div
        className={cn(
          'relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border p-6',
          'border-[var(--color-border)] bg-[var(--color-surface)]',
          'transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-border-strong)]',
          popped ? 'shadow-elevate-lg' : 'shadow-elevate',
        )}
        style={style}
        animate={{
          y: popped ? -10 : 0,
          scale: popped ? 1.025 : 1,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
      >
        {/* static tint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: `radial-gradient(ellipse at 20% 15%, ${color}12, transparent 65%)` }}
        />
        {/* hover glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          animate={{ opacity: popped ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: `radial-gradient(ellipse at 20% 15%, ${color}22, transparent 65%)` }}
        />
        {/* shimmer sweep — accent-tinted so it reads on a light card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
          style={{ background: `linear-gradient(to right, transparent, ${color}14, transparent)` }}
        />

        {Icon && (
          <div
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `${color}16`, boxShadow: `inset 0 0 0 1px ${color}38` }}
          >
            <Icon size={18} strokeWidth={1.9} style={{ color }} />
          </div>
        )}

        <div className="relative z-10 flex flex-1 flex-col gap-2.5">
          <h3 className="font-display text-lg font-medium tracking-tight text-[var(--color-text-primary)]">
            {title}
          </h3>
          <div className="text-[0.925rem] leading-relaxed text-[var(--color-text-secondary)]">
            {children}
          </div>
        </div>

        {/* accent underline */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
          style={{ background: `linear-gradient(to right, ${color}90, transparent)` }}
        />
      </motion.div>
    </motion.div>
  )
}
