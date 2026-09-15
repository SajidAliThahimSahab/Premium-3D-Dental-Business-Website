export default function ToothFallback({ className = '' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 220" className="h-full w-full max-w-sm animate-float" aria-hidden="true">
        <defs>
          <radialGradient id="toothGlow" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="55%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0E7490" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="190" rx="70" ry="14" fill="#06B6D4" opacity="0.12" />
        <path
          d="M100 12c-30 0-48 18-48 44 0 20 7 33 12 51 5 18 8 43 17 61 5 10 10 16 17 16 9 0 12-11 15-27 3-16 5-33 11-33s8 17 11 33c3 16 6 27 15 27 7 0 12-6 17-16 9-18 12-43 17-61 5-18 12-31 12-51 0-26-18-44-48-44z"
          fill="url(#toothGlow)"
        />
      </svg>
    </div>
  )
}
