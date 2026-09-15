import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function AccordionItem({ id, title, subtitle, children, openId, setOpenId }) {
  const isOpen = openId === id
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpenId(isOpen ? null : id)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span>
          <span className="block font-semibold text-porcelain-50">{title}</span>
          {subtitle && <span className="mt-0.5 block text-sm text-porcelain-100/55">{subtitle}</span>}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Accordion({ items, renderContent }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null)
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          subtitle={item.subtitle}
          openId={openId}
          setOpenId={setOpenId}
        >
          {renderContent(item)}
        </AccordionItem>
      ))}
    </div>
  )
}
