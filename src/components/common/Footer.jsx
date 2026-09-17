import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react'

const SITEMAP = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

const HOURS = [
  ['Mon – Thu', '8:00 AM – 6:00 PM'],
  ['Friday', '8:00 AM – 4:00 PM'],
  ['Saturday', '9:00 AM – 2:00 PM'],
  ['Sunday', 'Closed'],
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-900/60">
      <div className="container-aura grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/15 ring-1 ring-cyan-400/40">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
            </span>
            <span className="font-display text-lg font-bold">AURA DENTAL</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-porcelain-100/60">
            A calmer kind of dental visit — 3D-planned treatments, transparent pricing, and a studio that doesn't feel clinical.
          </p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="AURA DENTAL on social media"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-porcelain-100/70 transition-colors hover:border-cyan-400 hover:text-cyan-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-porcelain-50">Sitemap</h3>
          <ul className="mt-4 space-y-3">
            {SITEMAP.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-porcelain-100/65 hover:text-cyan-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-porcelain-50">Operating Hours</h3>
          <ul className="mt-4 space-y-3">
            {HOURS.map(([day, time]) => (
              <li key={day} className="flex justify-between gap-4 text-sm text-porcelain-100/65">
                <span>{day}</span>
                <span className="text-porcelain-100/85">{time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-porcelain-50">Visit or Call</h3>
          <ul className="mt-4 space-y-3 text-sm text-porcelain-100/65">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-cyan-400" />
              214 Meridian Avenue, Suite 4, Austin, TX
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-cyan-400" />
              <a href="tel:+15125550142" className="hover:text-cyan-300">+1 (512) 555-0142</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-cyan-400" />
              <a href="mailto:hello@auradental.com" className="hover:text-cyan-300">hello@auradental.com</a>
            </li>
          </ul>
        </div>
      </div>

    <div className="border-t border-white/10 py-6">
        <div className="container-aura flex justify-center text-xs text-porcelain-100/45">
          <p>© {new Date().getFullYear()} AURA DENTAL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
