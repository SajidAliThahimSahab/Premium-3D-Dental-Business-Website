import { ArrowUpRight } from 'lucide-react'

export default function ServiceCard({ service, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(service)}
      className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06]"
    >
      <div>
        <span className="eyebrow">{service.category}</span>
        <h3 className="mt-2 text-lg font-bold text-porcelain-50">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-porcelain-100/60">{service.summary}</p>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <p className="text-sm text-porcelain-100/70">
          From <span className="font-semibold text-porcelain-50">${service.price.toLocaleString()}</span>{' '}
          <span className="text-porcelain-100/45">/ {service.duration}</span>
        </p>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-porcelain-100/70 transition-colors group-hover:border-cyan-400 group-hover:text-cyan-300">
          <ArrowUpRight size={15} />
        </span>
      </div>
    </button>
  )
}
