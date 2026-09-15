import { ScanLine, Zap, HeartHandshake } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import DoctorCard from '../components/ui/DoctorCard.jsx'
import Timeline from '../components/ui/Timeline.jsx'
import { doctors, milestones } from '../data/doctorsData.js'

const TECHNOLOGY = [
  {
    icon: ScanLine,
    title: '3D Intraoral Scanning',
    detail: 'Every case starts with a digital scan accurate to microns, replacing traditional putty impressions entirely.',
  },
  {
    icon: Zap,
    title: 'Laser Dentistry',
    detail: 'Soft-tissue laser treatment for gum reshaping and minor procedures, with shorter healing time than a scalpel.',
  },
  {
    icon: HeartHandshake,
    title: 'Guided Implant Planning',
    detail: 'CBCT imaging plans implant angle and depth before surgery, so placement is precise on the first try.',
  },
]

export default function About() {
  return (
    <div>
      <section className="container-aura py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Our Story</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              We started AURA because dental visits shouldn't run on guesswork.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-porcelain-100/65">
              AURA opened in 2014 with a simple premise: patients deserve to see their treatment before it happens, and know the cost before they sit down. Every scan, every quote, and every aligner stage is shown on screen — nothing is estimated after the fact.
            </p>
            <p className="mt-4 text-base leading-relaxed text-porcelain-100/65">
              Today the studio runs on an entirely digital workflow, from first scan to final crown, built around one goal: make dentistry feel less like a waiting room and more like a design studio.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['12', 'Years in practice'],
              ['15.2k', 'Smiles crafted'],
              ['4', 'Specialist dentists'],
              ['99.4%', 'Patient satisfaction'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="font-display text-3xl font-extrabold text-cyan-400">{value}</p>
                <p className="mt-1 text-sm text-porcelain-100/55">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-900/40 py-24">
        <div className="container-aura">
          <SectionHeading
            eyebrow="Practice Philosophy"
            title="The technology behind a calmer visit"
            description="Every tool in the studio exists to make outcomes visible and predictable, not just faster."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TECHNOLOGY.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-porcelain-50">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-porcelain-100/60">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-aura py-24">
        <SectionHeading eyebrow="Meet the Team" title="Specialists behind every treatment plan" />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      <section className="bg-ink-900/40 py-24">
        <div className="container-aura max-w-3xl">
          <SectionHeading eyebrow="Milestones" title="Twelve years of clinic achievements" />
          <div className="mt-12">
            <Timeline milestones={milestones} />
          </div>
        </div>
      </section>
    </div>
  )
}
