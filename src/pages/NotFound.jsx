import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-aura flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl font-extrabold">This page didn't make the appointment</h1>
      <p className="mt-4 max-w-md text-porcelain-100/60">
        The page you're looking for doesn't exist, or may have moved. Let's get you back on track.
      </p>
      <Link to="/" className="btn-primary mt-8">Back to Home</Link>
    </div>
  )
}
