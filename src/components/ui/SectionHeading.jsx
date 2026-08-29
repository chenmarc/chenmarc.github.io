import Reveal from './Reveal'

export default function SectionHeading({ title, className = '' }) {
  return (
    <Reveal
      className={`mb-10 flex items-baseline gap-4 sm:mb-14 ${className}`}
    >
      <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
      {title && (
        <h2 className="font-display text-3xl font-medium tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          {title}
        </h2>
      )}
    </Reveal>
  )
}
