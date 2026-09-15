import { useEffect, useState } from 'react'

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Renders `children` (a WebGL/R3F canvas) only when the browser can
 * actually initialise WebGL. Otherwise renders `fallback`, per the
 * TRD's "auto-detect WebGL support" requirement.
 */
export default function WebGLGuard({ children, fallback }) {
  const [supported, setSupported] = useState(null)

  useEffect(() => {
    setSupported(detectWebGL())
  }, [])

  if (supported === null) {
    return <div className="h-full w-full animate-pulse rounded-3xl bg-white/[0.03]" />
  }

  return supported ? children : fallback
}
