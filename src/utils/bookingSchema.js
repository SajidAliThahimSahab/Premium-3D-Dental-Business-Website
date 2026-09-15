import { z } from 'zod'

const PHONE_REGEX = /^\+?[1-9]\d{7,14}$/
const NAME_REGEX = /^[a-zA-Z\s'-]{3,50}$/

function tomorrow() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 1)
  return d
}

export const bookingSchema = z.object({
  service: z.string().min(1, 'Choose a treatment to continue.'),
  date: z
    .string()
    .min(1, 'Pick a preferred date.')
    .refine((val) => {
      const chosen = new Date(val)
      return chosen >= tomorrow()
    }, 'Please choose a date from tomorrow onward.'),
  timeSlot: z.string().min(1, 'Select a time slot.'),
  name: z
    .string()
    .min(3, 'Enter your full name (at least 3 characters).')
    .max(50, 'Name is too long.')
    .regex(NAME_REGEX, 'Names can only contain letters, spaces, and hyphens.'),
  email: z.string().email('Enter a valid email address, e.g. name@example.com.'),
  phone: z
    .string()
    .min(1, 'Enter a phone number.')
    .regex(PHONE_REGEX, 'Enter a valid phone number (10+ digits, optional +country code).'),
  notes: z.string().max(400, 'Keep notes under 400 characters.').optional(),
})

export const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
]

export function generateBookingReference() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5)
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5)
  return `AURA-${stamp}${rand}`
}
