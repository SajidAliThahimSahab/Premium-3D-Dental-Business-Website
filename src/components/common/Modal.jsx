import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children, labelledBy }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, onClose])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
        >
          <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="glass-panel relative z-10 w-full max-w-lg rounded-3xl p-7 shadow-card sm:p-9"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-porcelain-100/70 hover:text-cyan-300"
            >
              <X size={16} />
            </button>
            {title && (
              <h3 id={labelledBy} className="pr-8 text-xl font-bold sm:text-2xl">
                {title}
              </h3>
            )}
            <div className={title ? 'mt-4' : ''}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
