import { useState } from 'react'
import { Mail, CheckCircle2 } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      setStatus('idle')
      return
    }
    setError('')
    setStatus('success')
  }

  return (
    <div className="glass-panel rounded-3xl p-8 sm:p-10">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-bold text-porcelain-50">Smile care tips, monthly</h3>
          <p className="mt-1 max-w-sm text-sm text-porcelain-100/60">
            Aftercare guides and early access to seasonal whitening offers. No spam, unsubscribe anytime.
          </p>
        </div>

        {status === 'success' ? (
          <p className="flex items-center gap-2 rounded-full bg-mint-500/15 px-5 py-3 text-sm font-medium text-mint-400">
            <CheckCircle2 size={18} /> You're on the list.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-2 sm:flex-row sm:gap-3">
            <div className="relative flex-1">
              <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-porcelain-100/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full rounded-full border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-porcelain-50 placeholder:text-porcelain-100/35 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <button type="submit" className="btn-primary shrink-0">Subscribe</button>
          </form>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  )
}
