import { motion } from 'motion/react'
import SignatureWave from '../ui/SignatureWave'
import MagneticButton from '../ui/MagneticButton'
import { hero } from '../../content'
import { useReducedMotion } from '../../lib/useReducedMotion'

function InkReveal({ text }) {
  const reducedMotion = useReducedMotion()
  const words = text.split(' ')

  if (reducedMotion) return <>{text}</>

  return (
    <>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-visible whitespace-nowrap">
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.9,
                delay: 0.15 + (wi * 6 + ci) * 0.028,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      {/* the bold centerpiece — full-width, fully bold since it no longer
          has to fight for legibility under the text */}
      <SignatureWave className="absolute inset-x-0 top-1/2 h-[62vh] w-full -translate-y-1/2" />

      {/* Name "plaque" — an opaque card the wave flows behind, so the two
          coexist as separate layers (like a nameplate mounted in front of
          a drawing) instead of competing for the same pixels. */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="shadow-elevate-lg relative z-10 flex w-full max-w-xl flex-col items-center gap-6 overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-12 text-center sm:max-w-2xl sm:gap-7 sm:px-16 sm:py-16"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-2))' }}
        />

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="label-caps text-[0.65rem] text-[var(--color-accent-2)]"
        >
          Cybersecurity — AI — Computer Science
        </motion.p>

        <h1 className="font-display text-5xl font-medium tracking-tight text-[var(--color-text-primary)] sm:text-7xl">
          <InkReveal text={hero.name} />
        </h1>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="max-w-md text-base text-[var(--color-text-secondary)] sm:text-lg"
        >
          {hero.tagline}
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mt-1 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton as="a" href="#projects" variant="primary">
            View Projects
          </MagneticButton>
          <MagneticButton as="a" href="#contact" variant="outline">
            Get In Touch
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-9"
      >
        <span className="label-caps text-[0.6rem] text-[var(--color-text-tertiary)]">
          Scroll
        </span>
        <motion.span
          aria-hidden="true"
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-px bg-gradient-to-b from-[var(--color-accent)] to-transparent"
        />
      </motion.div>
    </section>
  )
}
