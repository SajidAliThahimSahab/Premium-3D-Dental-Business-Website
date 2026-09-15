import { GraduationCap } from 'lucide-react'

export default function DoctorCard({ doctor }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-cyan-400/40">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/25 to-mint-500/20 font-display text-lg font-bold text-cyan-300 ring-1 ring-white/10">
          {doctor.initials}
        </div>
        <div>
          <h3 className="font-bold text-porcelain-50">{doctor.name}</h3>
          <p className="text-sm text-cyan-400">{doctor.role}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-porcelain-100/60">{doctor.bio}</p>

      <div className="mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
        <ul className="space-y-2 border-t border-white/10 pt-4">
          {doctor.credentials.map((c) => (
            <li key={c} className="flex items-start gap-2 text-xs text-porcelain-100/65">
              <GraduationCap size={14} className="mt-0.5 shrink-0 text-mint-400" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
