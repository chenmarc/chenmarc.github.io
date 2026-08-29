import { useState } from 'react'
import { Bot, ShieldAlert, Terminal, Sparkles, Globe } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import TiltCard from '../ui/TiltCard'
import { projects } from '../../content'

// Maps the icon name strings in content.js to actual imported components,
// so content.js stays framework-agnostic while imports stay tree-shakeable
// (importing `* as Icons from 'lucide-react'` would bundle all ~1500 icons).
const ICONS = { Bot, ShieldAlert, Terminal, Sparkles, Globe }

export default function Projects() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
      <SectionHeading title="Selected Projects & Workshops" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => {
          const Icon = ICONS[project.icon] ?? Sparkles
          return (
            <Reveal key={project.title} delay={(i % 3) * 0.08} className="h-full">
              <TiltCard
                icon={Icon}
                color={project.color}
                title={project.title}
                dimmed={hovered !== null && hovered !== project.title}
                onHoverStart={() => setHovered(project.title)}
                onHoverEnd={() => setHovered(null)}
              >
                <p>{project.description}</p>
                {project.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                    {project.links.map((link, i) => (
                      <a
                        key={`${link.href}-${i}`}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="label-caps text-[0.65rem] text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 underline-offset-4 transition-colors hover:decoration-[var(--color-accent)]"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
