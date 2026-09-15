import { useScrollReveal } from '../../hooks/useScrollReveal.js'

function TimelineRow({ milestone, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 })
  return (
    <li
      ref={ref}
      className={`relative pl-10 transition-all duration-700 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-cyan-400 bg-ink-950">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
      </span>
      <p className="font-display text-sm font-bold text-cyan-400">{milestone.year}</p>
      <h3 className="mt-1 text-lg font-bold text-porcelain-50">{milestone.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-porcelain-100/60">{milestone.detail}</p>
    </li>
  )
}

export default function Timeline({ milestones }) {
  return (
    <ol className="relative space-y-9 border-l border-white/10">
      {milestones.map((m, i) => (
        <TimelineRow key={m.year} milestone={m} index={i} />
      ))}
    </ol>
  )
}
