import {
  Automation,
  Click,
  ClientWithReviewMatches,
  Review,
} from '@rabbit/database'
import { addDays, startOfDay, endOfDay } from 'date-fns'
import { atom } from 'jotai'
import { DateRange } from 'react-day-picker'

export const overviewDateRange = atom<DateRange | undefined>({
  from: addDays(new Date(), -30),
  to: new Date(),
})

export const overviewCompareDateRange = atom<DateRange | undefined>((get) => {
  const dateRange = get(overviewDateRange)
  if (!dateRange?.from || !dateRange?.to) return undefined

  const daysDiff = Math.ceil(
    (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)
  )

  return {
    from: addDays(dateRange.from, -(daysDiff + 1)),
    to: addDays(dateRange.from, -1),
  }
})

// Clients
export const overviewClientsAtom = atom<ClientWithReviewMatches[]>([])
export const overviewClientsPrevAtom = atom<ClientWithReviewMatches[]>([])

export const overviewClientsQuantityAtom = atom<number>(
  (get) => get(overviewClientsAtom).length
)
export const overviewClientsQuantityPrevAtom = atom<number>(
  (get) => get(overviewClientsPrevAtom).length
)

// Reviews
export const overviewReviewsAtom = atom<Review[]>([])
export const overviewReviewsPrevAtom = atom<Review[]>([])

export const overviewReviewsQuantityAtom = atom<number>(
  (get) => get(overviewReviewsAtom).length
)
export const overviewReviewsQuantityPrevAtom = atom<number>(
  (get) => get(overviewReviewsPrevAtom).length
)

// Clicks
export const overviewClicksAtom = atom<Click[]>([])
export const overviewClicksPrevAtom = atom<Click[]>([])

export const overviewClicksQuantityAtom = atom<number>(
  (get) => get(overviewClicksAtom).length
)
export const overviewClicksQuantityPrevAtom = atom<number>(
  (get) => get(overviewClicksPrevAtom).length
)

// Automations
export const overviewAutomationsAtom = atom<Automation[]>([])
export const overviewAutomationsPrevAtom = atom<Automation[]>([])

export const overviewAutomationsQuantityAtom = atom<number>(
  (get) => get(overviewAutomationsAtom).length
)
export const overviewAutomationsQuantityPrevAtom = atom<number>(
  (get) => get(overviewAutomationsPrevAtom).length
)
