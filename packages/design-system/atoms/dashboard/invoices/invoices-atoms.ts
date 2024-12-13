import { atom } from 'jotai'
import { InvoiceWithClient } from '@remio/database'
import { InvoicesChart } from '@remio/design-system/components/dashboard/invoices/invoice-types'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'

export const invoicesSearchAtom = atom<string>('')
export const invoicesAtoms = atom<InvoiceWithClient[]>([])
export const invoicesChartData = atom<InvoicesChart>([])
export const invoicesDateRange = atom<DateRange | undefined>({
  from: new Date(addDays(new Date(), -30)),
  to: new Date(),
})
