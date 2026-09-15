import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ScanLine, ShieldCheck, Sparkles } from 'lucide-react'
import ToothCanvas from '../components/3d/ToothCanvas.jsx'
import StatCounter from '../components/ui/StatCounter.jsx'
import ServiceCard from '../components/ui/ServiceCard.jsx'
import TestimonialCarousel from '../components/ui/TestimonialCarousel.jsx'
import NewsletterSignup from '../components/ui/NewsletterSignup.jsx'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Modal from '../components/common/Modal.jsx'
import { services } from '../data/servicesData.js'
import { testimonials } from '../data/testimonialsData.js'
import { galleryItems } from '../data/galleryData.js'

const FEATURES = [
  {
    icon: ScanLine,
    title: '3D Intraoral Scanning',
    detail: 'Every plan starts with a full digital scan — no putty impressions, no guesswork.',
  },
  {
    icon: Sparkles,
    title: 'Designed Before It\u2019s Done',
    detail: 'Preview veneers, whitening shade, and aligner movement before treatment begins.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Pricing',
    detail: 'Every estimate is shown upfront — what you see at booking is what you pay.',
  },
]

export default function Home() {
  const [activeService, setActiveService] = useState(null)

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-radial-glow">
        <div className="pointer-events-none absolute inset-0 bg-aura-grid bg-[length:44px_44px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="container-aura relative grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="eyebrow">Cosmetic & Restorative Dentistry</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
              A smile plan you can actually see, before it's real.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-porcelain-100/65">
              AURA maps every treatment on a 3D scan of your own teeth — so your veneers, aligners, or whitening plan is never a surprise on the day.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn-primary">
                Book Consultation <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn-ghost">Explore Treatments</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="relative"
          >
            <ToothCanvas className="h-[340px] sm:h-[420px] lg:h-[480px]" />
            <p className="pointer-events-none text-center text-xs text-porcelain-100/35">Drag to rotate</p>
          </motion.div>
        </div>

        <div className="border-y border-white/10 bg-ink-900/50">
          <div className="container-aura grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
            <StatCounter value={15200} suffix="+" label="Smiles crafted" />
            <StatCounter value={99} suffix=".4%" label="Patient satisfaction" />
            <StatCounter value={1} suffix="%" label="Top Invisalign provider" />
            <StatCounter value={12} label="Years in practice" />
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE */}
      <section className="container-aura py-24">
        <SectionHeading
          eyebrow="Why AURA feels different"
          title="Dentistry planned in 3D, explained in plain language"
          description="Every feature below exists to remove a specific kind of dental-visit anxiety — not knowing what's coming, or what it costs."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, detail }) => (
            <div
              key={title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-cyan-400/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
                <Icon size={20} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-porcelain-50">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-porcelain-100/60">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICE PREVIEW GRID */}
      <section className="bg-ink-900/40 py-24">
        <div className="container-aura">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Treatments"
              title="A quick look at what we do"
              description="Full pricing, timelines, and step-by-step breakdowns live on the Services page."
            />
            <Link to="/services" className="btn-ghost">View all services <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} onOpen={setActiveService} />
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER TEASER */}
      <section className="container-aura py-24">
        <SectionHeading
          eyebrow="Real Results"
          title="Drag to compare a few transformations"
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {galleryItems.slice(0, 2).map((item) => (
            <BeforeAfterSlider key={item.id} before={item.before} after={item.after} title={item.title} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/gallery" className="btn-ghost">See the full gallery <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-ink-900/40 py-24">
        <div className="container-aura">
          <SectionHeading eyebrow="Patient Voices" title="What it feels like to be a patient here" align="center" />
          <div className="mt-12">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-aura py-24">
        <NewsletterSignup />
      </section>

      <Modal
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        title={activeService?.name}
        labelledBy="service-preview-title"
      >
        {activeService && (
          <div>
            <p className="text-sm leading-relaxed text-porcelain-100/65">{activeService.summary}</p>
            <p className="mt-4 text-sm text-porcelain-100/50">
              From <span className="font-semibold text-porcelain-50">${activeService.price.toLocaleString()}</span> / {activeService.duration}
            </p>
            <Link to="/contact" className="btn-primary mt-6 w-full" onClick={() => setActiveService(null)}>
              Book this treatment
            </Link>
          </div>
        )}
      </Modal>
    </div>
  )
}
