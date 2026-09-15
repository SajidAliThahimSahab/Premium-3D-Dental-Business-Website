import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref to attach to an element and a boolean that flips to true
 * once the element scrolls into view. Used to trigger one-time reveal
 * animations instead of re-triggering on every scroll pass.
 */
export function useScrollReveal({ threshold = 0.2, rootMargin = '0px 0px -80px 0px' } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, isVisible]
}
