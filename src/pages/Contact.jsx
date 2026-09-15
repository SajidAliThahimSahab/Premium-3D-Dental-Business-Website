import { useEffect, useState } from 'react'
import { MapPin, Phone, Clock, PhoneCall } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import BookingForm from '../components/booking/BookingForm.jsx'

// Mon–Thu 8–18, Fri 8–16, Sat 9–14, Sun closed.
function getOpenStatus() {
  const now = new Date()
  const day = now.getDay() // 0 = Sunday
  const hour = now.getHours() + now.getMinutes() / 60

  const hoursForDay = {
    0: null,
    1: [8, 18], 2: [8, 18], 3: [8, 18], 4: [8, 18],
    5: [8, 16],
    6: [9, 14],
  }[day]

  if (!hoursForDay) return { open: false, label: 'Closed today' }
  const [start, end] = hoursForDay
  const open = hour >= start && hour < end
  return {
    open,
    label: open ? `Open now · closes ${formatHour(end)}` : `Closed · opens ${formatHour(start)}`,
  }
}

function formatHour(h) {
  const period = h >= 12 ? 'PM' : 'AM'
  const display = h % 12 === 0 ? 12 : h % 12
  return `${display}:00 ${period}`
}

export default function Contact() {
  const [status, setStatus] = useState(getOpenStatus())

  useEffect(() => {
    const interval = setInterval(() => setStatus(getOpenStatus()), 60_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <section className="container-aura py-20 lg:py-24">
        <SectionHeading
          eyebrow="Contact & Booking"
          title="Book your consultation in under two minutes"
          description="Pick a treatment and time, and we'll confirm your slot with a reference ID instantly."
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <BookingForm />

          <div className="space-y-6">
            <div
              className={`flex items-center gap-3 rounded-2xl border px-5 py-4 ${
                status.open ? 'border-mint-500/40 bg-mint-500/10' : 'border-white/15 bg-white/[0.03]'
              }`}
            >
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${status.open ? 'bg-mint-400' : 'bg-porcelain-100/40'}`} />
              <div>
                <p className={`text-sm font-semibold ${status.open ? 'text-mint-400' : 'text-porcelain-100/70'}`}>
                  {status.label}
                </p>
                <p className="text-xs text-porcelain-100/45">Mon–Thu 8–6 · Fri 8–4 · Sat 9–2 · Sun closed</p>
              </div>
            </div>

            <a
              href="tel:+15125559111"
              className="flex items-center justify-between rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 transition-colors hover:border-red-400/50"
            >
              <span className="flex items-center gap-3">
                <PhoneCall size={18} className="text-red-400" />
                <span>
                  <span className="block text-sm font-semibold text-red-300">Dental emergency?</span>
                  <span className="block text-xs text-red-200/60">Tap to call our helpline now</span>
                </span>
              </span>
              <span className="font-display text-sm font-bold text-red-300">+1 (512) 555-9111</span>
            </a>

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <div className="relative aspect-[4/3] w-full bg-ink-800">
                <div className="absolute inset-0 bg-aura-grid bg-[length:28px_28px] opacity-30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <MapPin size={26} className="text-cyan-400" />
                  <p className="text-sm font-semibold text-porcelain-50">214 Meridian Avenue, Suite 4</p>
                  <p className="text-xs text-porcelain-100/50">Austin, TX 78701</p>
                  <span className="mt-2 rounded-full border border-white/15 px-3 py-1 text-xs text-porcelain-100/55">
                    Map preview — embed a live map in production
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="flex items-center gap-2.5 text-sm text-porcelain-100/70">
                <Phone size={15} className="text-cyan-400" /> +1 (512) 555-0142
              </p>
              <p className="flex items-center gap-2.5 text-sm text-porcelain-100/70">
                <Clock size={15} className="text-cyan-400" /> Free parking validated for all appointments
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
