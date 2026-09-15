import { Link } from 'react-router-dom'

/**
 * Shared button/link. Renders an <a> via react-router Link when `to` is
 * given, otherwise a native <button>, so it works for both navigation
 * CTAs and in-page actions (form submit, opening modals, etc).
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  className = '',
  children,
  ...rest
}) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-ghost'
  const classes = `${base} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
