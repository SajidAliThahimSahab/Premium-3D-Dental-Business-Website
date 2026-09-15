import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { bookingSchema, TIME_SLOTS, generateBookingReference } from '../../utils/bookingSchema.js'
import { services } from '../../data/servicesData.js'
import Modal from '../common/Modal.jsx'

const STEP_FIELDS = [
  ['service', 'date', 'timeSlot'],
  ['name', 'email', 'phone', 'notes'],
]

const STEP_LABELS = ['Service & Time', 'Your Details']

function todayPlusOneISO() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function BookingForm() {
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [reference, setReference] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    mode: 'onBlur',
    defaultValues: {
      service: '', date: '', timeSlot: '', name: '', email: '', phone: '', notes: '',
    },
  })

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step])
    if (valid) setStep((s) => Math.min(s + 1, STEP_FIELDS.length - 1))
  }
  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const onSubmit = async () => {
    setSubmitting(true)
    // Mock submission — simulates a network round trip with zero backend.
    await new Promise((resolve) => setTimeout(resolve, 900))
    setReference(generateBookingReference())
    setSubmitting(false)
    setShowSuccess(true)
    reset()
    setStep(0)
  }

  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-porcelain-50 placeholder:text-porcelain-100/35 focus:outline-none ${
      hasError ? 'border-red-500/60 focus:border-red-500' : 'border-white/15 focus:border-cyan-400'
    }`

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8">
      <div className="mb-7 flex items-center gap-3">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-3">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                i <= step ? 'bg-cyan-500 text-ink-950' : 'bg-white/10 text-porcelain-100/50'
              }`}
            >
              {i + 1}
            </div>
            <span className={`hidden text-sm sm:block ${i <= step ? 'text-porcelain-50' : 'text-porcelain-100/45'}`}>
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && <div className="h-px flex-1 bg-white/10" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div>
                <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-porcelain-100/80">
                  Treatment
                </label>
                <select id="service" {...register('service')} className={inputClass(errors.service)}>
                  <option value="">Select a treatment</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
                {errors.service && <p className="mt-1.5 text-xs text-red-400">{errors.service.message}</p>}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-porcelain-100/80">
                    Preferred date
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={todayPlusOneISO()}
                    {...register('date')}
                    className={inputClass(errors.date)}
                  />
                  {errors.date && <p className="mt-1.5 text-xs text-red-400">{errors.date.message}</p>}
                </div>

                <div>
                  <label htmlFor="timeSlot" className="mb-1.5 block text-sm font-medium text-porcelain-100/80">
                    Time slot
                  </label>
                  <select id="timeSlot" {...register('timeSlot')} className={inputClass(errors.timeSlot)}>
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.timeSlot && <p className="mt-1.5 text-xs text-red-400">{errors.timeSlot.message}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-porcelain-100/80">
                  Full name
                </label>
                <input id="name" type="text" placeholder="Jordan Lee" {...register('name')} className={inputClass(errors.name)} />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-porcelain-100/80">
                    Email
                  </label>
                  <input id="email" type="email" placeholder="jordan@email.com" {...register('email')} className={inputClass(errors.email)} />
                  {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-porcelain-100/80">
                    Phone
                  </label>
                  <input id="phone" type="tel" placeholder="+1 512 555 0142" {...register('phone')} className={inputClass(errors.phone)} />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-porcelain-100/80">
                  Notes for the team <span className="text-porcelain-100/40">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Anything we should know before your visit?"
                  {...register('notes')}
                  className={inputClass(errors.notes)}
                />
                {errors.notes && <p className="mt-1.5 text-xs text-red-400">{errors.notes.message}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="btn-ghost disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={16} /> Back
          </button>

          {step < STEP_FIELDS.length - 1 ? (
            <button type="button" onClick={goNext} className="btn-primary">
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Booking…
                </>
              ) : (
                <>
                  <CalendarCheck size={16} /> Confirm Appointment
                </>
              )}
            </button>
          )}
        </div>
      </form>

      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Appointment requested"
        labelledBy="booking-success-title"
      >
        <p className="text-sm leading-relaxed text-porcelain-100/70">
          We've held your slot. A confirmation text and email are on the way — please arrive 10 minutes early for your 3D scan.
        </p>
        <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <span className="text-xs uppercase tracking-wide text-porcelain-100/50">Reference ID</span>
          <span className="font-display text-sm font-bold text-cyan-300">{reference}</span>
        </div>
        <button type="button" onClick={() => setShowSuccess(false)} className="btn-primary mt-6 w-full">
          Done
        </button>
      </Modal>
    </div>
  )
}
