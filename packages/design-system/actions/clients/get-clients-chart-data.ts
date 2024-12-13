'use server'

import client from '@remio/design-system/lib/client'
import { ClientsChart } from '@remio/design-system/components/dashboard/clients/client-types'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
import { eachDayOfInterval, format } from 'date-fns'

export async function getClientsChartData(
  startDate: Date,
  endDate: Date
): Promise<ClientsChart> {
  const response = await client.clients.chart.$post(
    {
      json: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch clients')
  }
  const clientsResults = await response.json()

  // Create a map of dates to client counts from the results
  const clientCountMap = new Map<string, number>()
  clientsResults.forEach((result: { date: string; clients: number }) => {
    clientCountMap.set(result.date, result.clients)
  })

  // Get all dates in the range
  const dates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  })

  // Create array with all dates, using 0 for dates with no clients
  return dates.map((date) => {
    const formattedDate = format(date, 'yyyy-MM-dd')
    return {
      date: formattedDate,
      clients: clientCountMap.get(formattedDate) ?? 0,
    }
  })
}
