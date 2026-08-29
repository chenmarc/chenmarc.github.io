import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { about } from '../../content'
import { useReducedMotion } from '../../lib/useReducedMotion'
import headshotWebp from '../../assets/headshot.webp'
import headshotJpg from '../../assets/headshot.jpg'

const TILT_MAX = 5

function HeadshotFrame() {
  const reducedMotion = useReducedMotion()
  const ref = useRef(null)
  const normX = useMotionValue(0.5)
  const normY = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]), {
    stiffness: 200,
    damping: 22,
  })
  const rotateY = useSpring(useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]), {
    stiffness: 200,
    damping: 22,
  })

  const handleMove = (e) => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    normX.set((e.clientX - rect.left) / rect.width)
    normY.set((e.clientY - rect.top) / rect.height)
  }
  const handleLeave = () => {
    normX.set(0.5)
    normY.set(0.5)
  }

  return (
    <div className="relative">
      {/* soft color bloom behind the frame — the main source of "lift" */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] opacity-70 blur-2xl"
        style={{
          background:
            'radial-gradient(60% 60% at 30% 20%, rgba(44,84,144,0.18), transparent 70%), radial-gradient(50% 50% at 80% 90%, rgba(163,92,48,0.16), transparent 70%)',
        }}
      />
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformPerspective: 1000,
        }}
        className="shadow-elevate-lg relative overflow-hidden rounded-2xl border border-[var(--color-border)]"
      >
        <picture>
          <source srcSet={headshotWebp} type="image/webp" />
          <img
            src={headshotJpg}
            alt="Headshot of Marc Chenard, a stupendous looking guy in a blue buttoned shirt."
            width={1200}
            height={1574}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full object-cover"
          />
        </picture>
      </motion.div>
      {/* accent corner mark, decorative only */}
      <span
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 h-16 w-16 rounded-2xl border border-[var(--color-accent)]/40"
      />
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
      <SectionHeading title="About" />

      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
        <Reveal variant="scale">
          <HeadshotFrame />
        </Reveal>

        <div className="flex flex-col gap-5">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-[1.05rem] leading-relaxed text-[var(--color-text-secondary)]">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
