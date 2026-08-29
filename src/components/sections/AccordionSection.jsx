import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Accordion from '../ui/Accordion'

export default function AccordionSection({ id, title, items }) {
  return (
    <section id={id} className="relative mx-auto max-w-4xl px-6 py-24 sm:px-8 sm:py-32">
      <SectionHeading title={title} />
      <Reveal>
        <Accordion items={items} />
      </Reveal>
    </section>
  )
}
