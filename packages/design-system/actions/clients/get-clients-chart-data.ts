'use server'

import client from '@remio/design-system/lib/client'
import { ClientsChart } from 'components/dashboard/clients/client-types'
import { headersWithCookies } from '@remio/design-system/lib/header-with-cookies'
export async function getClientsChartData(): Promise<ClientsChart> {
  const response = await client.clients.chart.$get(
    {},
    await headersWithCookies()
  )
  if (!response.ok) {
    throw new Error('Failed to fetch clients')
  }
  const clientsResults = await response.json()

  return clientsResults
}
