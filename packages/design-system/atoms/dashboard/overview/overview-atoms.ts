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

export const averageInvoiceAtom = atom((get) => {
  const dateRange = get(overviewDateRange)
  const dashboardData = get(dashboardDataAtom)

  if (!dateRange?.from || !dateRange?.to) {
    return [
      {
        month: new Date().toLocaleString('en-US', { month: 'short' }),
        average: 0,
      },
    ]
  }

  const invoiceData = dashboardData.invoiceData.filter(
    (invoice) => Number(invoice.amount) > 0
  )

  // Create a map of all months in the date range
  const monthsMap: Record<
    string,
    { month: string; total: number; count: number; timestamp: number }
  > = {}
  let currentDate = new Date(dateRange.from)

  while (currentDate <= dateRange.to) {
    const yearMonth = `${currentDate.getFullYear()}-${currentDate.getMonth()}`
    const monthKey = currentDate.toLocaleString('en-US', { month: 'short' })

    monthsMap[yearMonth] = {
      month: monthKey,
      total: 0,
      count: 0,
      timestamp: currentDate.getTime(),
    }

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    )
  }

  // Aggregate invoice data
  invoiceData.forEach((invoice) => {
    const date = new Date(invoice.date)
    const yearMonth = `${date.getFullYear()}-${date.getMonth()}`

    if (monthsMap[yearMonth]) {
      monthsMap[yearMonth].total += Number(invoice.amount)
      monthsMap[yearMonth].count += 1
    }
  })

  return Object.entries(monthsMap)
    .map(([yearMonth, data]) => ({
      month: data.month,
      average: data.count > 0 ? data.total / data.count : 0,
      timestamp: data.timestamp,
    }))
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(({ month, average }) => ({
      month,
      average,
    }))
})

export const clientsPerMonthAtom = atom((get) => {
  const dateRange = get(overviewDateRange)
  const dashboardData = get(dashboardDataAtom)

  if (!dateRange?.from || !dateRange?.to) {
    return [
      {
        month: new Date().toLocaleString('en-US', { month: 'short' }),
        clients: 0,
      },
    ]
  }

  const clientData = dashboardData.clientData

  // Create a map of all months in the date range
  const monthsMap: Record<
    string,
    { month: string; clients: number; timestamp: number }
  > = {}
  let currentDate = new Date(dateRange.from)

  while (currentDate <= dateRange.to) {
    const yearMonth = `${currentDate.getFullYear()}-${currentDate.getMonth()}`
    const monthKey = currentDate.toLocaleString('en-US', { month: 'short' })

    monthsMap[yearMonth] = {
      month: monthKey,
      clients: 0,
      timestamp: currentDate.getTime(),
    }

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    )
  }

  // Aggregate client data
  clientData.forEach((client) => {
    const date = new Date(client.date)
    const yearMonth = `${date.getFullYear()}-${date.getMonth()}`

    if (monthsMap[yearMonth]) {
      monthsMap[yearMonth].clients += Number(client.clients)
    }
  })

  return Object.entries(monthsMap)
    .map(([yearMonth, data]) => ({
      month: data.month,
      clients: data.clients,
      timestamp: data.timestamp,
    }))
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(({ month, clients }) => ({
      month,
      clients,
    }))
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
