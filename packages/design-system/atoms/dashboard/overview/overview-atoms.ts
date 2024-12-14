import { InvoiceWithClient } from '@remio/database/schema/invoices'
import { DashboardData } from '@remio/design-system/components/dashboard/overview/overview-types'
import { addDays } from 'date-fns'
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

export const recentPaymentsAtom = atom<InvoiceWithClient[]>([])

export const dashboardDataAtom = atom<DashboardData>({
  clientData: [],
  invoiceData: [],
})

export const overviewCompareDataAtom = atom<DashboardData>({
  clientData: [],
  invoiceData: [],
})
