import { useEffect, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'

export default function StatCounter({ value, suffix = '', label, duration = 1400 }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.4 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let frame
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isVisible, value, duration])

  return (
    <div ref={ref} className="text-center sm:text-left">
      <p className="font-display text-4xl font-extrabold text-porcelain-50 sm:text-5xl">
        {display.toLocaleString()}
        <span className="text-cyan-400">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-porcelain-100/60">{label}</p>
    </div>
  )
}
