import { InvoiceWithClient } from '@remio/database/schema/invoices'
import { DashboardData } from '@remio/design-system/components/dashboard/overview/overview-types'
import { addDays, startOfDay, endOfDay } from 'date-fns'
import { atom } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'
import { DateRange } from 'react-day-picker'
import { fetchMediations } from '@remio/design-system/actions/mediations/fetch-mediations'
import { Client, MediationWithData } from '@remio/database'

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

export const recentPaymentsAtom = atom<InvoiceWithClient[]>([])

export const dashboardDataAtom = atom<DashboardData>({
  clientData: [],
  invoiceData: [],
})

export const overviewCompareDataAtom = atom<DashboardData>({
  clientData: [],
  invoiceData: [],
})

export const overviewScheduleClientAtom = atom<Client | undefined>(undefined)

export const overviewScheduleDateAtom = atom<Date>(new Date())

export const overviewScheduleMediationsAtom = atomWithQuery<
  MediationWithData[]
>((get) => ({
  queryKey: [
    'schedule-mediations',
    get(overviewScheduleDateAtom).toISOString(),
    get(overviewScheduleClientAtom),
  ],
  queryFn: async () => {
    const date = get(overviewScheduleDateAtom)
    let client = get(overviewScheduleClientAtom)
    if (client?.id === 'all') {
      client = undefined
    }
    return fetchMediations(startOfDay(date), endOfDay(date), client?.id)
  },
}))
