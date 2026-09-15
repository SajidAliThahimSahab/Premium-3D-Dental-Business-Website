import { useEffect, useState } from 'react'

const BREAKPOINTS = { mobile: 640, tablet: 1024 }

/**
 * Tracks window width and derives the active responsive tier.
 * Used to simplify 3D canvas complexity on smaller / touch devices.
 */
export function useViewport() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )

  useEffect(() => {
    let frame
    const handleResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setWidth(window.innerWidth))
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frame)
    }
  }, [])

  const isMobile = width < BREAKPOINTS.mobile
  const isTablet = width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet
  const isDesktop = width >= BREAKPOINTS.tablet

  return { width, isMobile, isTablet, isDesktop }
}
