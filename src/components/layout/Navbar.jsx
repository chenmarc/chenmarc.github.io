import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { nav } from '../../content'
import { useScrollSpy } from '../../lib/useScrollSpy'
import { useReducedMotion } from '../../lib/useReducedMotion'

const sectionIds = nav.map((n) => n.href.replace('#', ''))

const drawerVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
}

export default function Navbar() {
  const activeId = useScrollSpy(sectionIds)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? 'border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 shadow-elevate backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a
          href="#about"
          className="font-sans text-sm font-semibold tracking-[0.14em] text-[var(--color-text-primary)]"
        >
          MARC&nbsp;CHENARD
        </a>

        {/* Desktop pill nav */}
        <ul className="shadow-elevate hidden items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-1 backdrop-blur-sm md:flex">
          {nav.map((item) => {
            const id = item.href.replace('#', '')
            const isActive = activeId === id
            return (
              <li key={item.href} className="relative">
                <a
                  href={item.href}
                  className={`relative z-10 block rounded-full px-4 py-1.5 label-caps text-[0.68rem] transition-colors duration-300 ${
                    isActive
                      ? 'text-[var(--color-on-accent)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {item.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[var(--color-accent)]"
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 400, damping: 32 }
                    }
                  />
                )}
              </li>
            )
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-text-primary)] md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={drawerVariants}
            className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/97 px-6 pb-6 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 pt-2">
              {nav.map((item) => {
                const id = item.href.replace('#', '')
                const isActive = activeId === id
                return (
                  <motion.li key={item.href} variants={itemVariants}>
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block rounded-xl px-3 py-3 label-caps text-xs transition-colors ${
                        isActive
                          ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                          : 'text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
