export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && <p className="text-base leading-relaxed text-porcelain-100/65">{description}</p>}
    </div>
  )
}
