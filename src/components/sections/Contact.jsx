import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { AnimatePresence, motion } from 'motion/react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import MagneticButton from '../ui/MagneticButton'

// EmailJS's public key is designed to be exposed client-side — see
// https://www.emailjs.com/docs/sdk/installation/. Same service/template as
// the original site, now loaded from env vars instead of hardcoded so the
// values live in one place (see .env.example).
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_4l5nwii'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_3y9vasc'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '3De2b7Mbti7e03ONz'

const FIELD_CLASS =
  'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] shadow-[inset_0_1px_3px_rgba(30,42,54,0.12)] transition-colors focus:border-[var(--color-accent)] focus:outline-none'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    setStatus('sending')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
        },
        { publicKey: PUBLIC_KEY },
      )
      setStatus('success')
      form.reset()
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-2xl px-6 py-24 sm:px-8 sm:py-32">
      <SectionHeading title="Get In Touch" />

      <Reveal variant="scale">
        <form
          onSubmit={handleSubmit}
          className="shadow-elevate flex flex-col gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="label-caps text-[0.65rem] text-[var(--color-text-tertiary)]">
              Name
            </label>
            <input id="name" name="name" type="text" required className={FIELD_CLASS} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="label-caps text-[0.65rem] text-[var(--color-text-tertiary)]">
              Email
            </label>
            <input id="email" name="email" type="email" required className={FIELD_CLASS} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="label-caps text-[0.65rem] text-[var(--color-text-tertiary)]">
              Message
            </label>
            <textarea id="message" name="message" rows={5} required className={FIELD_CLASS} />
          </div>

          <div className="mt-2 flex items-center gap-4">
            <MagneticButton
              as="button"
              type="submit"
              variant="primary"
              disabled={status === 'sending'}
              className="disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </MagneticButton>

            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-[var(--color-accent)]"
                >
                  Thanks for reaching out — I'll get back to you shortly. 💫
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-400"
                >
                  Something went wrong — please try again.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </Reveal>
    </section>
  )
}
