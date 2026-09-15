import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/common/Navbar.jsx'
import Footer from './components/common/Footer.jsx'

// Lazy-loaded routes. Home ships eagerly since it's the most likely
// landing page and keeps first paint predictable; the rest split into
// their own chunks per the TRD's code-splitting directive.
import Home from './pages/Home.jsx'
const About = lazy(() => import('./pages/About.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const Gallery = lazy(() => import('./pages/Gallery.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-950">
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
