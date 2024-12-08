import { InvoiceWithClient } from '@remio/database/schema/invoices'
import { addDays } from 'date-fns'
import { atom } from 'jotai'
import { DateRange } from 'react-day-picker'

export const overviewDateRange = atom<DateRange>({
  from: new Date(),
  to: addDays(new Date(), 7),
})

export const recentPaymentsAtom = atom<InvoiceWithClient[]>([])
