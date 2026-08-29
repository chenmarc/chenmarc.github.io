import { useEffect, useState } from 'react'

/**
 * Tracks `prefers-reduced-motion` reactively (it can change mid-session,
 * e.g. a user toggling an OS accessibility setting). Every animated
 * component in this project reads this instead of hardcoding motion,
 * so the whole site degrades to instant, static transitions together.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
