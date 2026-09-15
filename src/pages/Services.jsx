import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import ServiceCard from '../components/ui/ServiceCard.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import Modal from '../components/common/Modal.jsx'
import { categories, services } from '../data/servicesData.js'

const FAQS = [
  {
    id: 'insurance',
    title: 'Do you accept dental insurance?',
    answer: 'Most PPO plans are accepted. Bring your insurance details to your first visit and our front desk will verify coverage before treatment begins.',
  },
  {
    id: 'payment-plans',
    title: 'Are payment plans available?',
    answer: 'Yes — treatments over $500 can be split into monthly installments with 0% interest for up to 12 months.',
  },
  {
    id: 'first-visit',
    title: 'What happens at my first visit?',
    answer: 'A full 3D intraoral scan, a review of any current concerns, and a walkthrough of your options with transparent pricing — no treatment starts on day one unless it\u2019s an emergency.',
  },
  {
    id: 'reschedule',
    title: 'Can I reschedule my appointment?',
    answer: 'Yes, up to 24 hours before your slot with no fee. Changes inside 24 hours may include a short rebooking fee.',
  },
]

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeService, setActiveService] = useState(null)

  const filtered = useMemo(
    () => (activeCategory === 'All' ? services : services.filter((s) => s.category === activeCategory)),
    [activeCategory]
  )

  return (
    <div>
      <section className="container-aura py-20 lg:py-24">
        <SectionHeading
          eyebrow="Services & Treatments"
          title="Every treatment, planned and priced upfront"
          description="Filter by category, then open any card for the full step-by-step breakdown and starting price."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
                  : 'border-white/15 text-porcelain-100/65 hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} onOpen={setActiveService} />
          ))}
        </div>
      </section>

      <section className="bg-ink-900/40 py-24">
        <div className="container-aura max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <div className="mt-10">
            <Accordion items={FAQS} renderContent={(item) => (
              <p className="text-sm leading-relaxed text-porcelain-100/65">{item.answer}</p>
            )} />
          </div>
        </div>
      </section>

      <Modal
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        title={activeService?.name}
        labelledBy="service-detail-title"
      >
        {activeService && (
          <div>
            <p className="text-sm leading-relaxed text-porcelain-100/65">{activeService.summary}</p>
            <ol className="mt-5 space-y-3">
              {activeService.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-porcelain-100/70">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-xs font-semibold text-cyan-300">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-sm text-porcelain-100/60">Starting price</span>
              <span className="font-display text-lg font-bold text-cyan-300">
                ${activeService.price.toLocaleString()} <span className="text-xs font-normal text-porcelain-100/45">/ {activeService.duration}</span>
              </span>
            </div>
            <Link to="/contact" className="btn-primary mt-6 w-full" onClick={() => setActiveService(null)}>
              Book this treatment <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </Modal>
    </div>
  )
}
