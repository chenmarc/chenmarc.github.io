import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useReducedMotion } from '../../lib/useReducedMotion'

function AccordionItem({ item, isOpen, onToggle }) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="border-b border-[var(--color-border)]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-[var(--color-accent)]"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="flex flex-col gap-1">
          <span className="font-display text-base font-medium text-[var(--color-text-primary)] sm:text-lg">
            {item.title}
          </span>
          <span className="label-caps text-[0.68rem] text-[var(--color-text-tertiary)]">
            {item.company}
          </span>
        </span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.3, ease: 'easeOut' }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-text-secondary)]"
        >
          <Plus size={15} />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="flex flex-col gap-4 pb-7 pr-10 text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]">
          {item.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {item.links?.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
              {item.links.map((link, i) => (
                <a
                  key={`${link.href}-${i}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="label-caps text-[0.68rem] text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 underline-offset-4 transition-colors hover:decoration-[var(--color-accent)]"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function Accordion({ items, defaultOpenIndex = null }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)

  return (
    <div className="border-t border-[var(--color-border)]">
      {items.map((item, i) => (
        <AccordionItem
          key={item.title}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  )
}
