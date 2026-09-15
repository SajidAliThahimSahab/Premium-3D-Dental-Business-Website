import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

export default function TestimonialCarousel({ testimonials }) {
  const [[index, direction], setIndex] = useState([0, 0])
  const active = testimonials[index]

  const go = (dir) => {
    setIndex(([current]) => {
      const next = (current + dir + testimonials.length) % testimonials.length
      return [next, dir]
    })
  }

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="relative min-h-[240px] overflow-hidden">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.figure
            key={active.id}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-panel rounded-3xl p-8 text-center sm:p-10"
          >
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < active.rating ? 'fill-cyan-400 text-cyan-400' : 'text-white/15'}
                />
              ))}
            </div>
            <blockquote className="mt-5 text-lg leading-relaxed text-porcelain-50 sm:text-xl">
              “{active.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm text-porcelain-100/60">
              <span className="font-semibold text-porcelain-50">{active.name}</span> — {active.treatment}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-porcelain-100/70 hover:border-cyan-400 hover:text-cyan-300"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-1.5">
          {testimonials.map((t, i) => (
            <span
              key={t.id}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-porcelain-100/70 hover:border-cyan-400 hover:text-cyan-300"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
