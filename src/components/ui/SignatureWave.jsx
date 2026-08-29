/**
 * Large-scale animated "signal" composition for the hero: two overlapping
 * flowing waveforms (cobalt + rust) that draw themselves in on load, then
 * settle into a slow continuous breathing motion — an oscilloscope/EEG
 * trace rather than generic particle dust, which ties directly to the
 * voice-biomarker and neuroscience work described in the About section
 * instead of being decoration for its own sake.
 *
 * Built from scratch for this site (not adapted from Kokonut UI) using
 * Motion's SVG path-drawing (`pathLength`) and path-morphing (`d` as a
 * keyframe array) techniques.
 */
import { motion } from 'motion/react'
import { useReducedMotion } from '../../lib/useReducedMotion'

// Two structurally-identical path variants (same command sequence, shifted
// control points) so Motion can interpolate `d` smoothly between them for
// the ambient "breathing" loop.
const WAVE_A =
  'M-50,180 C120,70 230,290 400,180 C570,70 680,290 850,180 C1000,90 1120,150 1260,150'
const WAVE_B =
  'M-50,180 C120,120 230,240 400,180 C570,120 680,240 850,180 C1000,140 1120,160 1260,150'
const WAVE_A2 =
  'M-50,230 C150,150 260,300 430,235 C600,170 720,300 880,235 C1020,180 1140,210 1260,205'
const WAVE_B2 =
  'M-50,230 C150,195 260,260 430,235 C600,200 720,260 880,235 C1020,210 1140,225 1260,205'

export default function SignatureWave({ className = '' }) {
  const reducedMotion = useReducedMotion()

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id="wave-primary" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" style={{ stopColor: 'var(--color-accent)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--color-accent-2)' }} />
        </linearGradient>
        <linearGradient id="wave-secondary" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" style={{ stopColor: 'var(--color-accent-2)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--color-accent)' }} />
        </linearGradient>
      </defs>

      {/* faint oscilloscope grid for scientific texture */}
      <g opacity="0.35">
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            x2="1200"
            y1={60 + i * 55}
            y2={60 + i * 55}
            stroke="var(--color-border-strong)"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* secondary, thinner trace */}
      <motion.path
        d={WAVE_A2}
        stroke="url(#wave-secondary)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
        initial={reducedMotion ? false : { pathLength: 0 }}
        animate={
          reducedMotion
            ? { pathLength: 1 }
            : { pathLength: 1, d: [WAVE_A2, WAVE_B2, WAVE_A2] }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                pathLength: { duration: 2, delay: 0.3, ease: [0.65, 0, 0.35, 1] },
                d: { duration: 7, delay: 2.2, repeat: Infinity, ease: 'easeInOut' },
              }
        }
      />

      {/* primary, bold trace */}
      <motion.path
        d={WAVE_A}
        stroke="url(#wave-primary)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        initial={reducedMotion ? false : { pathLength: 0 }}
        animate={
          reducedMotion
            ? { pathLength: 1 }
            : { pathLength: 1, d: [WAVE_A, WAVE_B, WAVE_A] }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                pathLength: { duration: 1.8, ease: [0.65, 0, 0.35, 1] },
                d: { duration: 6, delay: 1.9, repeat: Infinity, ease: 'easeInOut' },
              }
        }
      />
    </svg>
  )
}
