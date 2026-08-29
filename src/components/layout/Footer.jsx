import { footer } from '../../content'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] px-6 py-10 sm:px-8">
      <p className="mx-auto max-w-6xl text-center label-caps text-[0.65rem] text-[var(--color-text-tertiary)]">
        {footer.copyright}
      </p>
    </footer>
  )
}
