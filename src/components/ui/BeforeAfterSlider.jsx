import { useRef, useState, useCallback } from 'react'

export default function BeforeAfterSlider({ before, after, title }) {
  const trackRef = useRef(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const updateFromClientX = useCallback((clientX) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e) => {
    dragging.current = true
    updateFromClientX(e.clientX)
  }
  const onPointerMove = (e) => {
    if (dragging.current) updateFromClientX(e.clientX)
  }
  const stopDragging = () => { dragging.current = false }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5))
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5))
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerLeave={stopDragging}
      >
        <div className="absolute inset-0">
          <img src={before} alt={`${title} — before`} className="h-full w-full object-cover" draggable={false} />
          <span className="absolute left-4 top-4 rounded-full bg-ink-950/60 px-3 py-1 text-xs font-semibold text-porcelain-100/80">
            Before
          </span>
        </div>
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <img src={after} alt={`${title} — after`} className="h-full w-full object-cover" draggable={false} />
          <span className="absolute right-4 top-4 rounded-full bg-ink-950/60 px-3 py-1 text-xs font-semibold text-porcelain-100/80">
            After
          </span>
        </div>

        <div
          className="absolute inset-y-0 flex w-0.5 -translate-x-1/2 items-center bg-white/80"
          style={{ left: `${position}%` }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label={`Comparison slider for ${title}`}
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={onKeyDown}
            className="flex h-9 w-9 -translate-x-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-ink-950 shadow-card"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 6L2 12L8 18M16 6L22 12L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-porcelain-100/75">{title}</p>
    </div>
  )
}